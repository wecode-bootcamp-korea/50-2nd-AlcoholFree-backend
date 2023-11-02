const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const userController = require("../controlles/userController");


//회원가입
router.post("/signup", userController.signup)


=======
const userController = require("../controllers/userController");

router.post("/signup", userController.signup)

>>>>>>> main
module.exports = {
    router
}