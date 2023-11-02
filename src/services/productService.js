const productDao = require('../models/productDao');

const getProducts = async(productId,userInfo)=>{
    // 토큰 값 꺼내 저장
    const userId = userInfo.id;
    const userEmail = userInfo.email;

    // DB에 토큰에 꺼낸 값들을 넣어 비교 
    const checkUser = await productDao.getUsers(userId,userEmail);
    // DB에 꺼낸 id와 email을 변수에 따로 저장 (이유 : 해당 사항이 없다면 조건문에 걸려 return 하기 위해)
    const dbUserId = checkUser[0].id;
    const dbUserEmail = checkUser[0].email;

    const products = await productDao.getProducts(productId);

    if(userId !== dbUserId || userEmail !== dbUserEmail) {
        return "해당 유저가 없습니다.";
    }
    return products;
};

const createShoppingItem = async(user, productId, price, status, count, totalPrice) => {
    return await productDao.createShoppingItem(user, productId, price, status, count, totalPrice);
};

module.exports ={
    getProducts, createShoppingItem
};