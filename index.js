//Import Required Libraries for this .js
const express = require("express");
const path = require('path');
const app = require("./config/app.js");

//Bring in custom error handling
const apiErrorHandler = require('./error/apiErrorHandler');

//Establish the Routes and Static Content
//If in DEV, publish the HTML content in the Public Folder for testing
 app.use('/', express.static(path.join(__dirname, '/public')))
 app.use('/public', express.static(path.join(__dirname, '/public')))

//Register the routes
app.use('/prompts', require('./routes/prompts'));

//Establish a 404 Not Found Custom Response
app.use((req, res,next)=>{
    const error = new Error('This site was not found. Perhaps you want to call login?');
    error.status = 404;
    next(error);
})

//Implement the API Error Handler to catch everything
app.use(apiErrorHandler);
