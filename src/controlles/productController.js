const { join } = require("path");
const productService = require("../services/productService");
const { json } = require("express");

const shoppingItems = async (req, res) => {
    try {
        const userInfo = req.user
        const result = await productService.shoppingCart(userInfo);
        return res.status(202).json({message: result});
    } catch(error) {
        return res.status(400).json({ message: "SHOPPINGITEMS ERROR", error });
    }
};
// 상품 개수 적용 시키는 Mathod
const itemUpdate = async (req, res) => {
    try {
        const userInfo = req.user
        const id = req.params.id;
        const { count } = req.body;
        const result = await productService.updateQuantity(id, count, userInfo);
        return res.status(200).json({ message: "Update successful", data: result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error updating shopping items", error });
    }
};
// 상품 삭제
const deleteItems = async (req, res) => {
    try {
        const userInfo = req.user;
        const id = req.params.id;
        const result = await productService.deleteShoppingItems(id, userInfo);
        return res.status(200).json({ message: "SUCCESS DELETE", result});
    } catch (error) {
        return res.status(400).json({ message: "ERROR DELETE ITEMS", error});
    }
};
module.exports = {
    shoppingItems,
    itemUpdate,
    deleteItems
};