const joi = require('joi')


const validateRegister = () => {
    return joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        dateOfBirth: joi.date().required(),
        email: joi.string().email().required(),
        phoneNumber: joi.string().required(),
        password: joi.string().required()
    });
};


const validateLogin = () => {
    return joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
};


const validateUpdate = () => {
    return joi.object({
        firstName: joi.string(),
        lastName: joi.string(),
        dateOfBirth: joi.date(),
        email: joi.string().email(),
        phoneNumber: joi.string(),
        password: joi.string()
    });
};





module.exports = { validateRegister, validateLogin , validateUpdate };
