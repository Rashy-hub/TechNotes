const userRouter = require('express').Router();
const userController=require('../controllers/user-controller')
const bodyValidation = require('../middleware/bodyValidation');
const{createNewUserValidator}=require('../validators/user-validator')


userRouter.route('/')
            .get(userController.getAllUsers)
            .post(bodyValidation(createNewUserValidator),userController.createNewUser)
            .patch(userController.updateUser)
            .delete(userController.deleteUser)

            
module.exports=userRouter;