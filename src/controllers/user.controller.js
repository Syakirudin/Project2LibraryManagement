const asyncHandler = require ("express-async-handler");
const {createNewUser, findManyUsers, findUserById,findUserByIdAndUpdate,deleteUserById} = require("../services/user.service");

const signUpHandler = asyncHandler(async (req, res) => {
    const {username,email,password} = req.body;
    if(!username && !email && !password) throw new Error("required fields missing");
    //if(!validator.isEmail(email)) throw new Error("invalid email format");
    
    const user = await createNewUser({username,email,password});
    res.status(201).json(user);
})

const getManyUsersHandler = asyncHandler(async (req, res) => {
    const users = await findManyUsers({...req.query});
    res.json(users);
})

const deleteUserHandler = asyncHandler(async (req, res) => {
    const user = await deleteUserById(req.params.id);
    res.status(202).json(user);
})

const updateUserHandler = asyncHandler(async (req, res) => {
    const {username,email,password} = req.body;
    const user = await findUserByIdAndUpdate(req.params.id, {username,email,password});
    res.status(202).json(user);
})

module.exports = { 
    signUpHandler,  
    getManyUsersHandler,
    deleteUserHandler,
    updateUserHandler
}