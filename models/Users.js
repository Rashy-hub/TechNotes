const mongoose= require('mongoose')
const userSchema=new mongoose.Schema({
    // checks userStories to find out what are keys objects for this model
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    roles:[{
        type:String,
        default:"Employee"
    }],
    active:{
        type:Boolean,
        default:true
    }   

})

module.exports=mongoose.model('User',userSchema)