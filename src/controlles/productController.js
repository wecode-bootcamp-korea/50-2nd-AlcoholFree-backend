const productService = require("../services/productService");



// 장바구니 페이지로 넘어 왔을때, 유저의 배송주소(이름, 주소, 연락처, 포인트 보내주기)
const selectUserInfo = async (req, res) => {
    try{
        const userInfo = req.user;
        const result = await productService.selectUserInfo(userInfo);
        console.log(result)
        return res.json({message : result});

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "컨트롤러 에러";
        throw error;
    }
}

// 장바구니에 담긴 상품을 정하고 결제 버튼을 눌렀을때 
const cost = async(req, res) => {
    const totalPrice = req.body;
    const userInfo = req.user;

    try{
        // key 검증
        if(!totalPrice){
            return res.json({message : "key_error"})
        }
         const result = await productService.cost(totalPrice, userInfo);
        
         //result의 return 값이 true, false 경우
         if(result === true){
            return res.json({message : "order_success"});
         }
            return res.json({message : "order_fail"});
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "컨트롤러 에러";
        throw error;
    }
}

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
    cost, 
    selectUserInfo
    // setShoppingItems,
    // detailProduct,
    // payments,
    // setPayment
};