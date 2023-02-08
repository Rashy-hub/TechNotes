const allowedOrigins=require('./allowedOrigins')


// check cors docs third-party middleware 
const corsOptions={
        origin: (origin,callback)=>{
            if(allowedOrigins.indexOf(origin)!==-1 || ! origin) // allows postman also
            {
                callback(null,true)
            }
            else 
            {
                callback(new Error ('Not allowed by CORS'))
            }
               
        },
        credentials:true,
        optionSuccessStatus : 200
}

module.exports=corsOptions