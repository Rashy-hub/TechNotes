const noteRouter = require('express').Router();
const noteController=require('../controllers/note-controller')
const bodyValidation = require('../middleware/bodyValidation');
const{deleteNoteValidator,updateNoteValidator,createNoteValidator}=require('../validators/note-validator')


noteRouter.route('/')
            .get(noteController.getAllNotes)//only for get use or query params for filtering result 
            .post(bodyValidation(createNoteValidator),noteController.createNote)
            .patch(bodyValidation(updateNoteValidator),noteController.updateNote)
            .delete(bodyValidation(deleteNoteValidator),noteController.deleteNote)

            
module.exports=noteRouter;