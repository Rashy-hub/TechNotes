const userRouter = require('express').Router();
const userController=require('../controllers/user-controller')
const bodyValidation = require('../middleware/bodyValidation');
const{deleteUserValidator,updateUserValidator,createUserValidator}=require('../validators/user-validator')


userRouter.route('/')
            .get(userController.getAllUsers)//only for get use or query params for filtering result 
            .post(bodyValidation(createUserValidator),userController.createUser)
            .patch(bodyValidation(updateUserValidator),userController.updateUser)
            .delete(bodyValidation(deleteUserValidator),userController.deleteUser)

            
module.exports=userRouter;