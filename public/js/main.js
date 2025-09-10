// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  // const input = document.querySelector( "#yourname" ),
  //       json = { "yourname": input.value },
  //       body = JSON.stringify( json )

  const name = document.querySelector( "#name").value;
  const task = document.querySelector("#task").value;
  const priority = document.querySelector("input[name='priority']:checked")?.value;
  const createdDate = document.querySelector("#date").value;

  const json = {"name": name, "task": task, "priority": priority, "createdDate": createdDate}
  const body = JSON.stringify(json);

  const response = await fetch( "/submit", {
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body
  })

  const text = await response.text()

  console.log( "text:", text )

  displayData();
}

const displayData = async function() {
  
  const response = await fetch("/data");
  const data = await response.json()
  
  let tasks = document.getElementById("result");
  if (!tasks) {
    tasks = document.createElement("div");
    tasks.id = "result"
    document.body.appendChild(tasks);
  }

  let html = 
  `
  <div>
  <table>
    <thead>
      <tr>
        <th class="header">Name</th>
        <th class="header">Task</th>
        <th class="header">Priority</th>
        <th class="header">Created Date</th>
        <th class="header">Due Date</th>
        <th class="header">Edit</th>
        <th class="header">Delete</th>
      </tr>
    </thead>
    <tbody>
            ${data.map((element, index) => `
          <tr class="row">
            <td>${element.name}</td>
            <td>${element.task}</td>
            <td>${element.priority}</td>
            <td>${element.createdDate}</td>
            <td>${element.dueDate}</th>
            <td><button class="update-btn" data-index="${index}">🔧
            <td><button class="delete-btn" data-index="${index}">❌</button></td>
          </tr>
        `).join("")}
  </tbody>
  </table>
  </div>
  `
  tasks.innerHTML = html;

  document.querySelectorAll(".update-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const index = e.target.dataset.index;

      const name = prompt("Enter new name:");
      const task = prompt("Enter new task:");
      const priority = prompt("Enter new priority (high, medium, low):");
      const createdDate = prompt("Enter new created date (YYYY-MM-DD):");
  
      if (!name || !task || !priority || !createdDate) return;
  
      const updatedData = { name, task, priority, createdDate };

      await updateTask(index,updatedData);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const index = e.target.dataset.index;
      await deleteTask(index);
    });
  });
};

const deleteTask = async function(index) {
  await fetch( `/delete/${index}`, {
    method:"DELETE"
  });
  displayData();
}

const updateTask = async function(index, updatedData) {
  const response = await fetch(`/update/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
  })
  const data = await response.json()
  displayData()
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
  displayData();
}