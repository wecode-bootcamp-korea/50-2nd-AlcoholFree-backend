const express = require("express");
const router = express.Router();
const userController = require("../controlles/userController");


//회원가입
router.post("/signup", userController.signup)



module.exports = {
    router
}