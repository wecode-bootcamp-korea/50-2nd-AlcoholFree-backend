const productDao = require("../models/productDao");
const { SimpleConsoleLogger } = require("typeorm");
const { json } = require("body-parser");
const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");



const selectProduct = async (customerInformation) => {
    try {

        const customerId = customerInformation.id;
        const customerEm = customerInformation.email;

        const customerCheck = await productDao.realUser(customerId, customerEm);
        const saveUser = customerCheck[0].id;
        const saveEmail = customerCheck[0].email;

        if (customerId !== saveUser || customerEm !== saveEmail) {
            return "No information found."
        }

        const productL = await productDao.selectProduct();

        return productL;
    } catch (err) {
        throw err;
    }
};
const shoppingCart = async (userInfo) => {
    try {
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const checkUser = await productDao.foundUsers(userId, userEmail);
        const dbuserId = checkUser[0].id;
        const dbuserEmail = checkUser[0].email;
        if (userId !== dbuserId || userEmail !== dbuserEmail) {
            return "사용자를 찾을 수 없습니다.";
        }
        const userCart = await productDao.getUserCart(userId);

        return userCart;
    } catch (error) {
        throw error;
    }
};
const updateQuantity = async (productId, count, userInfo) => {
    try {
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const checkUser = await productDao.foundUsers(userId, userEmail);
        const dbuserId = checkUser[0].id;
        const dbuserEmail = checkUser[0].email;
        if (userId !== dbuserId && userEmail !== dbuserEmail) {
            return "사용자를 찾을 수 없습니다.";
        }
        const productQuantity = await productDao.getItemsQuantity(productId);
        if(productQuantity[0].quantity > 0) {
            const updateItemCount = await productDao.updateItemCount(productId, userId, count);
            console.log(updateItemCount);
            return { productQuantity, updateItemCount };
        }
        return "상품 재고가 부족 합니다.";
    } catch (error) {
        throw error;
    }
};
const deleteShoppingItems = async (productId, userInfo) => {
    try {
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const checkUser = await productDao.foundUsers(userId, userEmail);
        const dbuserId = checkUser[0].id;
        const dbuserEmail = checkUser[0].email;
        if (userId !== dbuserId && userEmail !== dbuserEmail) {
            return "사용자를 찾을 수 없습니다.";
        }
        console.log("HERE");
        const result = await productDao.deleteItem(productId, userId);
        console.log("HI")
        return result;
    } catch (error) {
        throw error;
    }
};
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

module.exports = {
    shoppingCart,
    updateQuantity,
    deleteShoppingItems,
    getProducts, 
    createShoppingItem,
    selectProduct
};


