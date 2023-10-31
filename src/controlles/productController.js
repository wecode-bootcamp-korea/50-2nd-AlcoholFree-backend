const { join } = require("path");
const productService = require("../services/productService");
const { json } = require("express");
// 장바구니 상품 목록 호출
const shoppingItems = async (req, res) => {
    try {
        const userInfo = req.user
        const result = await productService.shoppingCart(userInfo);
        return res.status(202).json({message: result});
    } catch(error) {
        return res.status(400).json({ message: "SHOPPINGITEMS ERROR", error });
    }
};
// 상품 개수 적용 시키는 
const itemUpdate = async (req, res) => {
    try {
        const userInfo = req.user
        const id = req.params.id;
        const { count } = req.body;
        console.log( "COUNT : ", count, "  PRODUCT ID : ", id);
        const result = await productService.updateQuantity(id, count, userInfo);
        if(result === "상품 재고가 부족 합니다.") {
            return res.status(202).json({ message: "상품 재고가 부족 합니다." });
        }
        return res.status(202).json({ message: "Update successful", data: result });
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
// // 장바구니에 데이터 넣기
// const setShoppingItems = async(req, res) => {
//     try {
//         const {userId, productId} = req.body;
//         const product = await productService.inserBaskets(userId, productId);
//         return res.status(202).json({message: "SUCCESS INSERT PRODUCT", product});
//     } catch(error) {
//         return res.status(400).json({ message: "SHOPPINGITEMS ERROR", error});
//     }
// };
// // 상세 보기
// const detailProduct = async(req, res) => {
//     try {
//         // const userInfo = req.user
//         const {productId} = req.body;
//         const products = await productService.detailProduct(productId);
//         return res.status(200).json({message: "SUCCESS SHOW PRODUCT DETAIL", products});
//     } catch (error) {
//         return res.status(500).json({ message : "SHOW PRODUCT ERROR", error});
//     }
// };
// // 결제
// const payments = async (req, res) => {
//     try{
//         const { userId } = req.body;
//         const result = await productService.paymentItems(userId);
//         return res.status(200).json({message: result});
//     } catch(error) {
//         console.log(error);
//         return res.status(400).json({ message: "Error Payments items", error });
//     }
// }
// const setPayment = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const result = await productService.showUserPaymentList(userId);
//         return res.status(202).json({message: result});
//     } catch (error) {
//         return res.status(500).json({ message: "SIRVER ERROR", error });
//     }
// };

module.exports = {
    shoppingItems,
    itemUpdate,
    deleteItems,
    // setShoppingItems,
    // detailProduct,
    // payments,
    // setPayment
};