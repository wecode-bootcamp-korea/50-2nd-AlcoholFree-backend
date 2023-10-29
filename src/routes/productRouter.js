const express = require("express");
const router = express.Router();
const productController = require("../controlles/productController");


router.post("/cost", productController.cost);


module.exports = {
    router
}