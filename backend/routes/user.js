const express = require("express");
const router = express.Router();
//controllers
const { signupUser, loginUser } = require("../controllers/userController");

//Login Route
router.post("/login", loginUser);
//Sign Up Route
router.post("/signup", signupUser);

module.exports = router;
