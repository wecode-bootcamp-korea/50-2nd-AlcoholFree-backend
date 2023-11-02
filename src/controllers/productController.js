const productService = require('../services/productService');
const bcrypt = require("../middlewares/bcrypt");
const token = require("../middlewares/verfiyToken");


const selectProduct = async (req, res) => {
    try {
        const customerInformation = req.user
        const mainList = await productService.selectProduct(customerInformation);
        return res.status(200).json({ mainList });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { selectProduct };