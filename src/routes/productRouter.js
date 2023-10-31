const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const token = require("../middlewares/verfiyToken");


router.get("/cart", token.verfiyToken,  productController.shoppingItems);
router.patch("/cart/:id",token.verfiyToken, productController.itemUpdate);
router.delete("/cart/:id",token.verfiyToken, productController.deleteItems);

// router.get("/detail", productController.detailProduct);
// router.post("/detail", productController.setShoppingItems);
// router.get("/detail/payment", productController.payments);
// router.post("/detail/payment", productController.payments);

router.post("/costUser", verfiyToken.verfiyToken, productController.selectUserInfo);
router.post("/costPay", verfiyToken.verfiyToken, productController.cost);

module.exports ={
    router
}