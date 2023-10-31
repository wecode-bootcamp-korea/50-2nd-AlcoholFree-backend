const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const verfiyToken = require("../middlewares/verfiyToken");


router.post("/cost", verfiyToken.verfiyToken, productController.selectUserInfo);




module.exports = {
    router
}