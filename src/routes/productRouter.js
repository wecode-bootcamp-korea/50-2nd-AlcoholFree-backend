const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const token = require("../middlewares/verfiyToken")

//상세페이지
router.get("/detail", token.verfiyToken, productController.detailPage)



module.exports ={
    router
}