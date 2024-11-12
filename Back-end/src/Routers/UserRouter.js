const userRouter = require('express').Router();
const { getAllUsers, getUserById, createUser , updateUser ,deleteUser}  =require('./../controllers/user/userController');

const  {verifyToken , verifyTokenAndAuthorization ,verifyTokenAdmin }= require('./../constants/veryfiytoken')

userRouter.get('/allUsers',verifyTokenAdmin,getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/create', verifyTokenAdmin,createUser);
userRouter.put('updateProfile/:id',verifyToken, updateUser);
userRouter.delete('deleteAccount/:id',verifyTokenAndAuthorization, deleteUser);

module.exports = userRouter;