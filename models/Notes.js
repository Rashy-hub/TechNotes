const mongoose= require('mongoose')
const AutoIncrement= require ('mongoose-sequence')(mongoose) // check docs , sequential Id for assets
const notesSchema=new mongoose.Schema({
    // checks userStories to find out what are keys objects for this model
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required:true
    }, 
    text:{
        type:String,
        required:true
    },
    isCompleted :{
        type:Boolean,
        default:false
    } 
   

},
//from here options allows timesstamps created at updated at
{
timestamps:true
})

notesSchema.plugin(AutoIncrement,{
    inc_field:'ticket', //
    id:'ticketNums',
    start_seq:524 // random value to start with
})
module.exports=mongoose.model('Note',notesSchema)