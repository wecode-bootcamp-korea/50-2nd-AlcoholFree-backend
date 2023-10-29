const productService = require("../services/productService");



// 장바구니에 담긴 상품을 정하고 결제 버튼을 눌렀을때
const cost = async(req, res) => {

    const {totalPrice} = req.body;

    try{
        const result = await productService.cost(totalPrice);
        return result;
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "컨트롤러 에러";
        throw error;
    }

}



module.exports = {
    cost
}