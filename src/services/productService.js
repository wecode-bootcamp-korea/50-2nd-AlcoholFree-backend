const productDao = require("../models/productDao")


// 장바구니에 담긴 상품을 정하고 결제 버튼을 눌렀을때
const cost = async(cartId, name, avm, orgin, price, count, totalPrice) => {

    try{
        const result = await productDao.cost(cartId, name, avm, orgin, price, count, totalPrice);
        return result;
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "서비스 에러";
        throw error;
    }
}


module.exports = {
    cost
}