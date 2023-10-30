const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const token = require("../middlewares/verfiyToken");


router.get("/cart", token.verfiyToken,  productController.shoppingItems);
router.patch("/cart/:id",token.verfiyToken, productController.itemUpdate);
router.delete("/cart/:id",token.verfiyToken, productController.deleteItems);

module.exports ={
    router
}