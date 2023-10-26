const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const token = require("../middlewares/verfiyToken");


//게사글 등록,
router.get("/detail",token.verfiyToken ,productController.detailProduct);
router.post("/detail", productController.shoppingBaskets);
module.exports ={
    router
}