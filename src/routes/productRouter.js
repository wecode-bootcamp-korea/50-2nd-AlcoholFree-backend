const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const token = require("../middlewares/verfiyToken")

router.get("/detail/:id", token.verfiyToken, productController.detailPage)
router.post("/", token.verfiyToken, productController.createShoppingItem);

module.exports ={
    router
}