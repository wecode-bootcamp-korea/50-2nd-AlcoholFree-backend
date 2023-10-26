const productService = require("../services/productService");
const jwtTokent = require("../middlewares/verfiyToken");

// 상세 보기
const detailProduct = async(req, res) => {
    try {
        const userInfo = req.user
        return res.status(200).json({message: "NOT FOUND TOKEN", products});
    } catch (error) {
        return res.status(500).json({ message : "SHOW PRODUCT ERROR", error});
    }
};
// 장바구니
const shoppingBaskets = async(req, res) => {
    try {
        const {id} = req.body;
        const product = await productService.baskets(id);
        return  res.status(202).json({message: "SUCCESS INSERT PRODUCT", product});
    } catch(error) {
        return res.status(400).json({ message: "SHOPPINGITEMS ERROR", error});
    }
};

module.exports = {
    detailProduct,
    shoppingBaskets
}