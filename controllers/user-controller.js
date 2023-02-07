const mongoose = require('mongoose')
const userModel = require('../models/Users')
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
//Also change the way to create controllers async functions
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



// @desc Get all users
// @route GET /users
// @access Private 
const getAllUsers = asyncHandler(async (req, res) => {
    //exclude password field and This makes queries faster and less memory intensive, but the result documents are plain old JavaScript
    const users = await userModel.find().select('-password').lean()
    if (!users) {
        //must be a return statement to quit this controller func
        return res.status(400).json({ message: 'No users found' })
    }

    res.status(200).json(users) // set status to ok and send back data as json
})

// @desc Create new user
// @route POST /users
// @access Private 
const createUser = asyncHandler(async (req, res) => {

    // added by validator middleware
    const { username, password, roles } = req.validatedData
    //check for duplicates 
    // lean cause we don't need extra info and exec() to make it work like a promise 
    const duplicate = await userModel.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'this username already taken' }) // conflict status
    }
    //hash password
    const hashedPwd = await bcrypt.hash(password, 10)
    // Create an object user
    const userObject = { username, password: hashedPwd, roles };
    //create method do every steps as pre-check required fields , create instance of schema and save it
    const newuser = await userModel.create(userObject)
    if (newuser) {
        //no need of return statement cause its the end 
        res.status(201).json({ message: `new user ${username} created` })
    }
    else {
        res.status(400).json({ message: `invalid user data` })
    }


    // res.status(200).json({ message: "user POSTED", username: username, password: password, roles: roles })
})

// @desc Update a user
// @route PATCH /users
// @access Private 
const updateUser = asyncHandler(async (req, res) => {

    // added by validator middleware
    const { id, username, roles, active, password } = req.validatedData
    // this time we don't use lean() because we will need mongoose document to use save() correctly
    const user = await userModel.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    //We still need check for duplicate for username
    // but there is a trick , we have to ignore the current modified user
    const duplicate = await userModel.findOne({ username }).lean().exec()
    // allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'This username is already taken' })
    }
    //modify fields of the user we find by id , its a mongoose document we can save
    user.username = username;
    user.roles = roles;
    user.active = active;
    //only if we have passed password in body we must re-hash it with salt rounds
    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save() // no need of try catch thanks to asyncHandler
    res.status(201).json({ message: `${updatedUser.username} updated succesfuly` })

})
// @desc Delete a user
// @route DELETE /users
// @access Private 
const deleteUser = asyncHandler(async (req, res) => {
   const{id}=req.validatedData
   const deletedusercount = await userModel.deleteOne({_id:id})  
   if(deletedusercount.deletedCount<1)
   {
    return res.status(400).json({message:'cannot delete : user not found '})
   }
      
   res.status(201).json({message:`User with id : ${id} has been deleted`})     
   //should check if there is notes send warnings and confirmation for deleting user 

})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

