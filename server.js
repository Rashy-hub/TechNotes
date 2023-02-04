require('dotenv-flow').config(); // as soon as possible load env data
const express = require("express");
const app = express();

// Get env variable
const { PORT, NODE_ENV } = process.env;

// Start Web API
app.listen(PORT, (err) => {
    if(err)
         console.log('error  : '+ err)
    console.log(`Web API up on port ${PORT}  [${NODE_ENV}]`);
   
});