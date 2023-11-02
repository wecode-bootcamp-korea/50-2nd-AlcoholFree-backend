const productDao = require("../models/productDao");
const { SimpleConsoleLogger } = require("typeorm");
const { json } = require("body-parser");
const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");

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

module.exports = {
    shoppingCart,
    updateQuantity,
    deleteShoppingItems,
    
};