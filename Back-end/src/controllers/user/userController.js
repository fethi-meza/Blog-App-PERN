const prisma = require('./../../utils/prismaClient/prismaClient');



const getAllUsers = async (req, res) => {    
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.log("error", error.errors);
        res.json(error);
    }
}


const getUserById = async (req, res) => {
    try {
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
        const { firstName, lastName , dateOfBirth,email ,phoneNumber , password } = req.body;
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


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName , dateOfBirth,email ,phoneNumber , password } = req.body;
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



//

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