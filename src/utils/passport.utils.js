const Passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const { findOneUser, findUserById } = require("../services/user.service");


const initPassport = (passport) => {
    const authenticate = async (email,password,cb) => {
        const user = await findOneUser ({email}).catch((err) => {throw new Error(err)});
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return cb(null, user);
        } else {
            return cb(null, false, {message: "invalid credentials"});
        }

        
    }

    passport.use(new Strategy({usernameField: "email"}, authenticate));

    passport.serializeUser((user, cb) => cb(null, user.id));

    passport.deserializeUser((id, cb) => {
        const user = findUserById(id);
        return null,user
    })
}

module.exports = initPassport