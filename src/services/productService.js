const productDao = require("../models/productDao")




const selectUserInfo = async() =>{

    try{

    }catch(err){
        
    }
}





// 장바구니에 담긴 상품을 정하고 결제 버튼을 눌렀을때
const cost = async(cartId) => {
    try{

        // // 장바구니 조회
        // const selectCart = await productDao.cost(cartId);


    }catch(err){
        console.log(err);s
        const error = new Error();
        error.message = "서비스 에러";
        throw error;
    }
}


module.exports = {
    cost, selectUserInfo
}