const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const verfiyToken = require("../middlewares/verfiyToken");


router.get("/cart", verfiyToken.verfiyToken,  productController.shoppingItems);
router.patch("/cart/:id",verfiyToken.verfiyToken, productController.itemUpdate);
router.delete("/cart/:id",verfiyToken.verfiyToken, productController.deleteItems);

// router.get("/detail", productController.detailProduct);
// router.post("/detail", productController.setShoppingItems);
// router.get("/detail/payment", productController.payments);
// router.post("/detail/payment", productController.payments);

router.post("/costUser", verfiyToken.verfiyToken, productController.selectUserInfo);
router.post("/costPay", verfiyToken.verfiyToken, productController.cost);

module.exports ={
    router
}