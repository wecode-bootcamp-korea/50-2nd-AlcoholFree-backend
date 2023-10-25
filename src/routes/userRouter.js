const express = require("express");
const router = express.Router();
const userController = require("../controlles/userController");
const verfiyToken = require("../middlewares/verfiyToken")

//로그인
router.post("/login", userController.login);


//회원가입
router.post("/signup", userController.signup);


module.exports = {
    router
}