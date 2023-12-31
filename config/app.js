//Create the app object
const express = require("express");
const app = express();
const path = require('path');

//Process JSON and urlencoded parameters
app.use(express.json({ extended: true, limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' })); //The largest incoming payload

//Establish local environment variables
const dotenv = require('dotenv').config()

//Select the default port
const port = process.env.PORT || 3000;

//Implement basic protocols with Helmet and CORS
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: false,
})) //You may need to set parameters such as contentSecurityPolicy: false,

const cors = require('cors');
// var corsOptions = {
//     origin: ['https://somedomain.com'], //restrict to only use this domain for requests
//     optionsSuccessStatus: 200, // For legacy browser support
//     methods: "GET, POST, PUT, DELETE" //allowable methods
// }

console.log("process.env.OPENAI_API_KEY", process.env.OPENAI_API_KEY)
//Implement context-specific CORS responses
// if (process.env.MODE == 'PROD') app.use(cors(corsOptions)); //Restrict CORS
// if (process.env.MODE == 'DEV') 
  
  
  app.use(cors()); //Unrestricted CORS

//Register Custom Global Middleware
const logger = require("../middleware/logger").logger;
app.use(logger)

//Create HTTP Server
const server = require('http').createServer(app);
server.listen(port, () => console.log(`Simple app listening at http://localhost:${port}`))

//Export the app for use on the index.js page
module.exports = app;
