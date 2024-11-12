const Router = require('express').Router();
const {registerUser ,loginUser }  =require('../controllers/auth/authController');



Router.post('/register', registerUser);
Router.post('/login', loginUser);



module.exports = Router;