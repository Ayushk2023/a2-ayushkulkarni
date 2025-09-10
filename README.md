Ayush Kulkarni
Assignment A2
a2-ayushkulkarni.onrender.com

## To-Do List
This application is designed for tracking tasks. To use the application, enter the respective fields on the left and click submit. The task will appear on the right. To delete a task, click the "X" icon for the respective row. To edit a task, click the wrench icon for that respective row and enter the new values for all the fields as prompted. Priority can be "low", "medium" or "high". Dates are entered in the format YYYY-MM-DD. 
The CSS positing technique used in this application was the grid display. This was used to display the form on the left side of the page and the tasks on the right side.

## Technical Achievements
- **Tech Achievement 1**: Create a single page app
I created a single page application that always displays the state of the server data. Immediately when the submit button is clicked, the task is shown on the right side of the page with the calculated "Due Date" field. When the form is edited or deleted, those changes are also immediately visible to the user on the page.

- **Tech Achievement 2**: Modify existing data
The application provides functionality for modifying existing data. To edit the data, click on the wrench icon next to the row being edited. The application will prompt the user to enter in new details for each of the fields in the order they are shown in the table. In order to successfully edit the table, fields must not be black and dates must be entered in the format YYYY-MM-DD

### Design/Evaluation Achievements
- **Design Achievement 1**: Conducted a user study where the user was prompted to create a task, edit the task, and delete a task using the application.
1. Provide the last name of each student you conduct the evaluation with.
    Shia
2. What problems did the user have with your design?
    The user encountered problems with the interface to edit a task. When the user tried to cancel the edit, they were prompted to click through each of the fields regardless. I also noticed that the user entered the task description in the "Assigned To:" field multiple times, so I had to instruct the user that the purpose of the field was for the name of the person that the task is assigned to. 
3. What comments did they make that surprised you?
    The user asked how the "due date" column was calculated. This surprised me because I had not thought about how a user might respond to the lack of ability to edit that column, and I had to explain during the study that the calculation was based on the "created date" and "priority" in detail. The user also mentioned some way to sort the list of tasks by the different columns. 
4. What would you change about the interface based on their feedback?
    I would change the text "Assigned To" to something more descriptive. I would also change the interface from prompting the user through each of the fields to having dropdowns for each field separately and making an editable textbox for the name and task columns. I think this will be more intuitive and easy to use. 

- **Design Achievement 2**: Conducted a user study where the user was prompted to create a task multiple tasks in the application with a variety of values for the fields
1. Provide the last name of each student you conduct the evaluation with.
    Garg
2. What problems did the user have with your design?
    One problem mentioned by the user was that the task list is not sorted. The user suggested sorting the table by due date or priority. The user also mentioned how the fields in the form do not clear when a task is submitted.
3. What comments did they make that surprised you?
    The user mentioned that the "Assigned To" column of the application does not serve a purpose. This surprised me because I was thinking about a senario where teams are using the application which makes it necessary to track which group member is assigned to which task. After the study, I informed the user about my thought process, and the user seemed to agree with my reasoning.
4. What would you change about the interface based on their feedback?
    I would add functionality to clear the form after the submit button has been pressed. I could also allow functionality to omit the "Assigned To" field of the form if the application is being used by a single user. One way to accomplish this may be to use a toggle for whether the to-do list is for a "single user" or
