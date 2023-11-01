const express = require("express");
const router = express.Router();
const userController = require("../controlles/userController");


//회원가입
router.post("/signup", userController.signup)

//로그인

module.exports = {
    router
}