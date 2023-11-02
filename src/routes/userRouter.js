const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const userController = require("../controlles/userController");


//회원가입
router.post("/signup", userController.signup)


=======
const userController = require("../controllers/userController");
// const token = require("../middlewares/verfiyToken");

//회원가입
// router.post("/signup", userController.signup)

//로그인

//장바구니

>>>>>>> main
module.exports = {
    router
};
