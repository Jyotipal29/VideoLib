const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");

//CREATE A USER
router.post("/signup", signup);
//SIGN IN  A USER
router.post("/signin", signin);
//GOOGLE AUTH
router.post("/google");

module.exports = router;
