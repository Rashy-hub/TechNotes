const mongoose = require ('mongoose')
const userModel = require ('../models/Users')
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
//Also change the way to create controllers async functions
const asyncHandler = require ('express-async-handler')
const bcrypt= require ('bcrypt')



// @desc Get all users
// @route GET /users
// @access Private 
const getAllUsers = asyncHandler(async(req,res)=>{
    //exclude password field and This makes queries faster and less memory intensive, but the result documents are plain old JavaScript
    const users=await userModel.find().select('-password').lean() 
    if(!users)
    {
        //must be a return statement to quit this controller func
        return res.status(400).json({message:'No users found'})
    }
      
    res.status(200).json(users) // set status to ok and send back data as json
})

// @desc Create new user
// @route POST /users
// @access Private 
const createNewUser = asyncHandler(async(req,res)=>{

    const {username,password,roles}=req.validatedData // added by validator middleware
  
    

    res.status(200).json({message:"user POST",username:username,password:password,roles:roles})
})

// @desc Update a user
// @route PATCH /users
// @access Private 
const updateUser = asyncHandler(async(req,res)=>{
    console.log("user PATCH")
    res.json({message:"user PATCH"})
})
// @desc Delete a user
// @route DELETE /users
// @access Private 
const deleteUser = asyncHandler(async(req,res)=>{
    console.log("user DELETE")
    res.json({message:"user DELETE"})
})

module.exports={
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser}

