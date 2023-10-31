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


        // console.log(selectUserInfo);

        return selectUserInfo;
        
       

    }catch(err){
        
    }
}


// 장바구니에 담긴 상품을 정하고 결제 버튼을 눌렀을때
const cost = async(totalPrice, userInfo) => {
    try{

        //유저 검증 및 정보 조회
        const userId = userInfo.id;
        const userEmail = userInfo.email
        const selectUserInfo = await productDao.selectUserInfo(userId, userEmail);

        // 포인트 사용 및 차감 후 남은 포인트 저장
        const userPoint = selectUserInfo[0].point - totalPrice.totalPrice // 유저의 기존 포인트와 유저의 사용 포인트를 차감
        console.log(selectUserInfo[0].point);
        console.log(totalPrice.totalPrice);
        const userUsesdPoint = await productDao.cost(userPoint, userId); // 결제 유저의 금액을 받아 차감 포인트 적립
       
        // 유저의 포인트 사용 내용 반영
        const cartList = await productDao.cartList(userId); // 장바구니 데이터 불러오기

        // 장바구니의 id 값과, 총 결재 금액 반영
        let result = "";

        for(let i = 0; i < cartList.length; i++){
            result = await productDao.payment(cartList[i].id, cartList[i].totalPrice);
        }

        // 결제 상태 업데이트
        let payStatus = "";
        let updatePayStatus = null;

        // payments의 insert 결과가 0일 경우
            if(result.affectedRows === 0){
                payStatus = "미결재";
                return false;
            }

        payStatus = "결제 완료"
        updatePayStatus = await productDao.updateStatus(payStatus, userId);

        // 결과가 있을 경우 -> 결제 상태를 업데이트 후 true 반환
        return true;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "서비스 에러";
        throw error;
    }
}


module.exports = {
    cost, selectUserInfo
}