const userRouter = require('express').Router();
const userController=require('../controllers/user-controller')


userRouter.route('/')
            .get(userController.getAllUsers)
            .post(userController.createNewUser)
            .patch(userController.updateUser)
            .delete(userController.deleteUser)

            
module.exports=userRouter;