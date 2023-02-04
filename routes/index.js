const router = require('express').Router();
const path = require('path');

// add a default route to sendfile an html splah file, router can use regex to match url

router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
}) 
module.exports=router;