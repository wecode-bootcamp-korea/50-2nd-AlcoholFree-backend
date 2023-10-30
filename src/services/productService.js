const productDao = require("../models/productDao")



// 장바구니 페이지로 넘어 왔을때, 유저의 배송주소(이름, 주소, 연락처, 포인트 보내주기)
const selectUserInfo = async(userInfo) =>{
    try{

        //토큰의 유저 정보와 DB 정보 유저정보 비교
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const selectUserInfo = await productDao.selectUserInfo(userId, userEmail); //유저 정보 조회

        const dbUserId = selectUserInfo[0].id
        const dbUserEmail = selectUserInfo[0].email
        
        if(userId !== dbUserId || userEmail !== dbUserEmail){
            return false;
        }


        console.log(selectUserInfo);

        return selectUserInfo;
        
       

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