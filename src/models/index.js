const { Sequelize } = require("sequelize");
const { bookModel } = require("./book.model");
const { userModel } = require("./user.model");
const { roleModel } = require("./role.model");
const { sessionModel } = require("./session.model");
const { DB_HOST,DB_USER,DB_PORT, DB_DATABASE, DB_PASSWORD } = require("../config/env.config");


const db = new Sequelize ({
    host: DB_HOST,
    port: DB_PORT,
    password: DB_PASSWORD,
    username: DB_USER,
    database: DB_DATABASE,
    dialect: "mysql"
})

const Book = bookModel(db);
const User = userModel(db);
const Role = roleModel(db);
const Session = sessionModel(db);

module.exports = {db, Book, User, Role,Session}