require('dotenv-flow').config(); // as soon as possible load env data
const express = require("express");
const app = express();
const path= require("path");

// Get env variable
const { PORT, NODE_ENV } = process.env;

//static ressources or public files middleware access > optionnal
app.use('/',express.static(path.join(__dirname,'/public')))

// Add Routing
const router = require('./routes');
app.use('/api', router);

// Start Web API
app.listen(PORT, (err) => {
    if(err)
         console.log('error  : '+ err)
    console.log(`Web API up on port ${PORT}  [${NODE_ENV}]`);
   
});