const prisma = require('./../../utils/prismaClient/prismaClient');

const { validateRegister, validateUpdate } = require('./../../validator/validator');




const getAllUsers = async (req, res) => {    
    try {


if (req.user.id !== req.params.id) {
    res.status(403).json({message : "yu are not allowed , you can only see your profile "})
    
}
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.log("error", error.errors);
        res.json(error);
    }
}


const getUserById = async (req, res) => {
    try {

        if (req.user.id !== req.params.id) {
            res.status(403).json({message : "yu are not allowed , you can only see your profile "})
            
        }
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(user);
    } catch (error) {
        console.log("error", error.errors);
        res.json(error);
    }
}

const createUser = async (req, res) => {
    try {

        if (req.user.id !== req.params.id) {
            res.status(403).json({message : "yu are not allowed , you can only see your profile "})
            
        }

        const createSchema = validateRegister();
        const { error } = createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                email,
                phoneNumber,
                password
            }
        });
        res.json(user);
    } catch (error) {
        console.log("error", error.errors);
        res.json(error);
    }
}
//updateUser

const updateUser = async (req, res) => {
    try {

        if (req.user.id !== req.params.id) {
            res.status(403).json({message : "yu are not allowed , you can only update your profile "})
            
        }
        const updateSchema = validateUpdate();
        const { error } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                email,
                phoneNumber,
                password
            }
        });
        res.status(200).json(true);
    } catch (error) {
        console.log("error", error.errors);

        res.json(error);
    }
}



//deleteUser 

const deleteUser = async (req, res) => {
try {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    
    res.status(200).json(true);

} catch (error) {
    console.log("error", error.errors);
    res.json(error);
}

}



module.exports = { getAllUsers, getUserById, createUser , updateUser, deleteUser };