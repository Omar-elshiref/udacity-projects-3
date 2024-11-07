// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// / *Dependencies* /
const bodyParser = require("body-parser");

// / *Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// install the main project folder
app.use(express.static("website"));


// Setup Server

const port = 3000;

const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// Get method route
app.get("/all", function (req, res) {
    res.send(projectData);
  });


  // POST method route
app.post("/add", function (req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(req.body)
    res.send({ message: "Data received successfully" });

  });