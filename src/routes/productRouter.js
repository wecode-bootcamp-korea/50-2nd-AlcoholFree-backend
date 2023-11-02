const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verfiyToken = require("../middlewares/verfiyToken");

router.get('/main', verfiyToken.verfiyToken, productController.selectProduct);

router.post("/costUser", verfiyToken.verfiyToken, productController.selectUserInfo);

router.post("/costPay", verfiyToken.verfiyToken, productController.cost);
// 장바구니 보기
router.get("/cart", verfiyToken.verfiyToken,  productController.shoppingItems);
// 장바구니 상품 갯수 수정
router.patch("/cart/:id", verfiyToken.verfiyToken, productController.itemUpdate);
// 장바구니 상품 삭제
router.delete("/cart/:id", verfiyToken.verfiyToken, productController.deleteItems);
// 상품 상세 보기
router.get("/detail", verfiyToken.verfiyToken, productController.detailProduct);
// 상품 장바구니 추가
router.post("/detail", verfiyToken.verfiyToken, productController.setShoppingItems);
module.exports ={
    router
}

