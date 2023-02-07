const userRouter = require('express').Router();
const userController=require('../controllers/user-controller')
const bodyValidation = require('../middleware/bodyValidation');
const{createUserValidator}=require('../validators/user-validator')


userRouter.route('/')
            .get(userController.getAllUsers)
            .post(bodyValidation(createUserValidator),userController.createUser)
            .patch(userController.updateUser)
            .delete(userController.deleteUser)

            
module.exports=userRouter;