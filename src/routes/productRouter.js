const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");


//게사글 등록

//메인 화면
router.get('/main', productController.selectProduct);



module.exports ={
    router
}