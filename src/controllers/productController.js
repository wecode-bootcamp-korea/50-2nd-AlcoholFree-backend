const productService = require("../services/productService");
// 장바구니 상품 목록 호출
const shoppingItems = async (req, res) => {
    try {
        const userInfo = req.user
        const result = await productService.shoppingCart(userInfo);
        return res.status(202).json({result}); // 이 부분 수정
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
        console.log("userInfo : ", userInfo , "Param ID : ", id);

        const result = await productService.deleteShoppingItems(id, userInfo);
        return res.status(200).json({ message: "SUCCESS DELETE", result});
    } catch (error) {
        return res.status(400).json({ message: "ERROR DELETE ITEMS", error});
    }
};

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
    shoppingItems,
    itemUpdate,
    deleteItems,
    detailPage, 
    createShoppingItem
};
