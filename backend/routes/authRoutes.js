const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

//CREATE A USER
router.post("/register", register);
//SIGN IN  A USER
router.post("/login", login);
//GOOGLE AUTH
router.post("/google");

module.exports = router;
