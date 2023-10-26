const productDao = require("../models/productDao");
const { SimpleConsoleLogger } = require("typeorm");
const { json } = require("body-parser");
const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");

const detailProduct = async (id) => {
    try {
        const productDetail = await productDao.getProduct(id);
        return productDetail;
    } catch (error) {
        
        throw error;
    }
};

const baskets = async (id) => {
    console.log("***baskets***");
    try {
       
        // 상품 개수 파악
        const productDetail = await productDao.getProduct(id);
        const productInfo = {
            "userId" : 1, 
            "productId" : id,
            "price" : productDetail.product.price,
            "quantity" : productDetail.product.quantity,
            "status" : "미결제"
        }
        // 삼품 제고 수가 0일 경우 에러 메시지 리턴
        if(productDetail.product.quantity <= 0 ) {
            return res.jsoun({message : "Quantity NOT ENOUGH!", quantity});
        } 
        const insertShoppingItems = await productDao.insertProducts(productInfo);

        return insertShoppingItems;
        
    } catch(error) {
        throw error;
    }
};

module.exports = {
    detailProduct,
    baskets
}