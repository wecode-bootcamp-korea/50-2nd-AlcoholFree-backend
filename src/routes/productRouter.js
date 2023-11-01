const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const token = require("../middlewares/verfiyToken")

router.get("/detail", token.verfiyToken, productController.detailPage)
router.post("/addProducts", token.verfiyToken, productController.addProducts);

module.exports ={
    router
}