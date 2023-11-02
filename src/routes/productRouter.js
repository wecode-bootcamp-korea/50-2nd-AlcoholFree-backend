const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const authorization = require("../middlewares/verfiyToken");

router.get('/main', authorization.verfiyToken, productController.selectProduct);

module.exports ={
    router
}