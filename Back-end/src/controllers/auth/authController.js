const prisma = require('./../../utils/prismaClient/prismaClient');
require('dotenv').config()


const { validateRegister, validateLogin } = require('./../../validator/validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => { 
    try {
       
        const registerSchema = validateRegister();
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Correct syntax for prisma.user.findUnique
        let user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        }); 
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newuser = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: new Date(req.body.dateOfBirth),
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashPassword
            }
        });
        
        // res.json(newuser);

        res.json({
            id: newuser.id,
            firstName: newuser.firstName,
            lastName: newuser.lastName,
            dateOfBirth: newuser.dateOfBirth,
            email: newuser.email,
            phoneNumber: newuser.phoneNumber,
            isVerified: newuser.isVerified ,
            isAdmin :newuser.isAdmin
        });



    } catch (error) {
        console.log("error", error.message || error.stack);
        res.status(500).json({ error: error.message });
    }
};


// loginUser 

const loginUser = async (req, res) => {
    try {



        const loginSchema =  validateLogin()
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }


        let user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }


        const token = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRATION_TIME }
        );
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified ,
            token : token
        });

        
    } catch (error) {
        console.log("error", error.message || error.stack);
        res.json(error);
    }
}


module.exports = {registerUser,loginUser};