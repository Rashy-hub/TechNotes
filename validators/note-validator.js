// check if assignedTO correspond to a real user ? 

const yup = require('yup');

//const  {assignedTo,title,text,isCompleted}

const createNoteValidator = yup.object().shape({
    
  assignedTo: yup.string().trim().min(24).max(25).default(null).nullable(),  
  title: yup.string().min(3).max(16).required(),
  text: yup.string().required().min(8).max(255),
  isCompleted: yup.boolean().default(false)
});

const updateNoteValidator = yup.object().shape({
   
  ticket:yup.number().required().min(524), 
  assignedTo: yup.string().trim().min(24).max(25).default(null).nullable(),  
  title: yup.string().min(3).max(16).required(),
  text: yup.string().required().min(8).max(255),
  isCompleted: yup.boolean().default(false)
});

const deleteNoteValidator=yup.object().shape({
  ticket:yup.number().required().min(524)
})

module.exports = { deleteNoteValidator,updateNoteValidator,createNoteValidator };