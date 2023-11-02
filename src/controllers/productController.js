const productService = require("../services/productService")

const detailPage = async(req,res) =>{
    const userId = req.user;
    const { id } = req.params;
    const products = await productService.getProducts(id, userId)

    return res.status(200).json({products});
};

const createShoppingItem = async(req, res)=>{

    const user = req.user.id;
    const {productId, price, status, count, totalPrice} = req.body;

        await productService.createShoppingItem(user, productId, price, status, count, totalPrice);
        res.status(201).json({message: "succeeded"});
};

module.exports = { 
    detailPage, createShoppingItem
} 