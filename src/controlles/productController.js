const productService = require("../services/productService");



// 장바구니 페이지로 넘어 왔을때, 유저의 배송주소(이름, 주소, 연락처, 포인트 보내주기)
const selectUserInfo = async (req, res) => {
    try{
        const userInfo = req.user;
        const result = await productService.selectUserInfo(userInfo);
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

    const totalprice = req.body;
    const userInfo = req.user;

    try{
         const result = await productService.cost(totalprice, userInfo);
         return result;
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "컨트롤러 에러";
        throw error;
    }

}



module.exports = {
    cost, selectUserInfo
}