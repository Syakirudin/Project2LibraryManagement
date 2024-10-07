const { Router } = require("express");
const { signUpHandler } = require("../controllers/user.controller");
const passport = require("passport");


const router =Router();

router.route("/").post(signUpHandler);
router.route("/login").post(passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user); 
});

module.exports = router