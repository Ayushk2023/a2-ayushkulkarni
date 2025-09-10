const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "name": "testing", "task": "to do list", "priority": "High", "createdDate": "2025-09-06", "dueDate": "2025-09-07"}
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  } else if (request.method === "DELETE") {
    handleDelete(request, response)
  } else if( request.method === "POST" ){
    handlePost( request, response ) 
  } else if (request.method === "PUT") {
    handleUpdate(request, response)
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  
  } else if (request.url === "/data") {
    response.writeHead( 200, "OK", {"Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )
    
    const parse = JSON.parse(dataString);
  
    let dueDate = new Date(parse.createdDate);
    let numDays = 0;
    if (parse.priority == "high") {
      numDays = 1;
    } else if (parse.priority == "medium") {
      numDays = 3;
    } else if (parse.priority == "low") {
      numDays = 7;
    }
    dueDate.setDate(dueDate.getDate() + numDays)
    dueDate = dueDate.toISOString().substring(0, 10)

    parse.dueDate = dueDate
    appdata.push(parse)

    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

const handleDelete = function (request, response) {
  const parts = request.url.split("/");
  const index = parseInt(parts[2]);

  appdata.splice(index, 1);
  response.writeHead(200, "OK", {"Content-Type": "application/json" });
  response.end(JSON.stringify(appdata))
}

const handleUpdate = function (request, response) {
  const parts = request.url.split("/");
  const index = parseInt(parts[2]);

  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )
    
    const parse = JSON.parse(dataString);
    
    appdata[index].name = parse.name || appdata[index].name
    appdata[index].task = parse.task || appdata[index].task
    appdata[index].priority = parse.priority || appdata[index].priority
    appdata[index].createdDate = parse.createdDate || appdata[index].createdDate

    let dueDate = new Date(appdata[index].createdDate);
    let numDays = 0;
    const priority = appdata[index].priority
    if (priority == "high") {
      numDays = 1;
    } else if (priority == "medium") {
      numDays = 3;
    } else if (priority == "low") {
      numDays = 7;
    }
    dueDate.setDate(dueDate.getDate() + numDays)
    appdata[index].dueDate = dueDate.toISOString().substring(0, 10)

    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end(JSON.stringify(appdata))
})
}

server.listen( process.env.PORT || port )
