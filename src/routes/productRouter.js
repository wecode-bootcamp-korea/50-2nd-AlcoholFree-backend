const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const token = require("../middlewares/verfiyToken");
// 장바구니 보기
router.get("/cart", token.verfiyToken,  productController.shoppingItems);
// 장바구니 상품 갯수 수정
router.patch("/cart/:id",token.verfiyToken, productController.itemUpdate);
// 장바구니 상품 삭제
router.delete("/cart/:id",token.verfiyToken, productController.deleteItems);
// // 상품 상세 보기
// router.get("/detail", token.verfiyToken, productController.detailProduct);
// // 상품 장바구니 추가
// router.post("/detail", token.verfiyToken, productController.setShoppingItems);
// router.get("/detail/payment", productController.payments);
// router.post("/detail/payment", productController.payments);
module.exports ={
    router
}


