const mongoose = require('mongoose')
const noteModel = require('../models/Notes')
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
//Also change the way to create controllers async functions
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



// @desc Get all notes
// @route GET /notes
// @access Private 
const getAllNotes = asyncHandler(async (req, res) => {
    // This makes queries faster and less memory intensive, but the result documents are plain old JavaScript
    const notes = await noteModel.find().lean()
    if (!notes?.length) {
        //must be a return statement to quit this controller func
        return res.status(400).json({ message: 'No notes found' })
    }

    res.status(200).json(notes) // set status to ok and send back data as json
})

// @desc Create new note
// @route POST /notes
// @access Private 
const createNote = asyncHandler(async (req, res) => {

    // added by validator middleware
    const  {assignedTo,title,text,isCompleted} = req.validatedData
    // Create an object note
    const noteObject = {assignedTo,title,text,isCompleted};
    //create method do every steps as pre-check required fields , create instance of schema and save it
    const newnote = await noteModel.create(noteObject)
    if (newnote) {
        //no need of return statement cause its the end 
        res.status(201).json({ message: `new note title:  ${newnote.title} id : ${newnote.ticket} created` })
    }
    else {
        res.status(400).json({ message: `invalid note data` })
    }

})

// @desc Update a note
// @route PATCH /notes
// @access Private 
const updateNote = asyncHandler(async (req, res) => {

    // added by validator middleware
    const  {assignedTo,title,text,isCompleted} = req.validatedData
    // this time we don't use lean() because we will need mongoose document to use save() correctly
    const note = await userModel.findById(id).exec();
    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }
    
    //modify fields of the user we find by id , its a mongoose document we can save
    note.assignedTo = assignedTo;
    note.title = title;
    note.text = text;
    note.isCompleted= isCompleted;
  

    const updatedNote = await note.save() // no need of try catch thanks to asyncHandler
    res.status(201).json({ message: `${updatedNote.title} with id :${updateNote._id} updated succesfuly` })

})
// @desc Delete a note
// @route DELETE /notes
// @access Private 
const deleteNote = asyncHandler(async (req, res) => {
   const{id}=req.validatedData
   const deletednotecount = await userModel.deleteOne({_id:id})  
   if(deletednotecount.deletedCount<1)
   {
    return res.status(400).json({message:'cannot delete : note not found '})
   }
      
   res.status(201).json({message:`Note with id : ${id} and title : ${deletednotecount.title} has been deleted`})     
   

})

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}

