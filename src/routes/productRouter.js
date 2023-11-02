const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const token = require("../middlewares/verfiyToken");
// 장바구니 보기
router.get("/cart", token.verfiyToken,  productController.shoppingItems);
// 장바구니 상품 갯수 수정
router.patch("/cart/:id", token.verfiyToken, productController.itemUpdate);
// 장바구니 상품 삭제
router.delete("/cart/:id", token.verfiyToken, productController.deleteItems);
router.get("/detail/:id", token.verfiyToken, productController.detailPage)
router.post("/", token.verfiyToken, productController.createShoppingItem);

module.exports ={
    router
}


