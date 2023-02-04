require('dotenv-flow').config(); // as soon as possible load env data
const express = require("express");
const app = express();
const path= require("path");
const {eventLogger}=require('./middleware/logger')

// Get env variable
const { PORT, NODE_ENV } = process.env;
//custom middleware event logger used here 
app.use (eventLogger)
//built in middleware that allows receiving/parsing JSON data
app.use(express.json()); 

//static ressources or public files middleware access > optionnal
app.use('/',express.static(path.join(__dirname,'/public')))

// Add Routing
const router = require('./routes');
// adding api to the base url
app.use('/api', router); 

// At the end of the waterfall app.use , adding 404 not found redirection
app.all('*',(req,res)=>{
    // already set status to 404
  res.status(404) 
   //Then check if request accepts html or another type
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname,'views','404.html'))    
  } 
  else if (req.accepts('json'))
  {
    res.json({message:'404 Not Found'})
  }
  else {
    // if req accepts is not set , respond text type with 404 Not Found
    res.type('txt').send('404 Not Found')
  }

})

// Start Web API
app.listen(PORT, (err) => {
    if(err)
         console.log('error  : '+ err)
    console.log(`Web API up on port ${PORT}  [${NODE_ENV}]`);
   
});