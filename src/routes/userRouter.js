const express = require("express");
const router = express.Router();
const userController = require("../controlles/userController");
const verfiyToken = require("../middlewares/verfiyToken")


//회원가입
router.post("/signup", userController.signup)

//로그인

module.exports = {
    router
}