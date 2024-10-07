//CRUD

const {User} = require("../models")

const createNewUser = (body) => {
    return User.create({...body});
}

const findManyUsers = (searchParam) => {
    return User.findAll({ where: { ...searchParam } });
}

const findUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('user not found');
    return user;

}

const findOneUser = (searchParam) => {
    return User.findOne({ where: { ...searchParam } });
}

const findUserByIdAndUpdate = async (id,body) => {
    const user = await findUserById(id);
    if (!user) throw new Error('user not found');

    for (const key of Object.keys(body)) {
        user[key] = body[key] ?? user[key];
    }
    await user.save();
    return user;
}

const deleteUserById = async (id) => {
    const user = await findUserById(id);
    if (!user) throw new Error('user not found');
    await user.destroy();
    return user;
}

module.exports = {
    createNewUser,
    findManyUsers,
    findUserById,
    findOneUser,
    findUserByIdAndUpdate,
    deleteUserById
}