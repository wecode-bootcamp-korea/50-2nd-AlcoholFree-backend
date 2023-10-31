const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");
const verfiyToken = require("../middlewares/verfiyToken");


router.post("/costUser", verfiyToken.verfiyToken, productController.selectUserInfo);

router.post("/costPay", verfiyToken.verfiyToken, productController.cost);



module.exports = {
    router
}