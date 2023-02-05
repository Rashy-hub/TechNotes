const {logEvents}=require ('./logger')


// we can overwrite the express error system simply by creating a middleware with those (err,req,res,next) args
const errorHandler = (err,req,res,next)=>{
// we call log events here  by including err and changing the file to erroLog file
logEvents(`${err.name}:${err.message}\t${req.method}\t${req.url}\t${req.headers.origin},'errLog.log`)
//also console log the stack
console.log(err.stack)
//check status code and set
const status= res.statusCode ? res.statusCode : 500 // server error code
res.status(status)
//send json error
res.json({message:err.message})
//No need to call next() because we already sent res.json and also because we will call thi handler at the end

//next()
}


module.exports={errorHandler}