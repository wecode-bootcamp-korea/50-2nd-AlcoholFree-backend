const productDao = require("../models/productDao")

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
        const quantity = await productDao.getItemsQuantity(productId);
        if(quantity[0].quantity > 0) {
            const updateItemCount = await productDao.updateItemCount(productId, userId, count);
            console.log(updateItemCount);
            return { quantity, updateItemCount };
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

        const result = await productDao.deleteItem(productId, userId);
        return result;
    } catch (error) {
        throw error;
    }
};
// // 장바구니에 데이터 삽입
// const inserBaskets = async (userInfo, productId, count) => {
//     try {
//         const userId = userInfo.id;
//         const userEmail = userInfo.email;
//         const checkUser = await productDao.foundUsers(userId, userEmail);
//         const dbuserId = checkUser[0].id;
//         const dbuserEmail = checkUser[0].email;
//         console.log("dbuserId :", dbuserId);
//         console.log("email :", dbuserEmail);
//         const quantity = count;
//         if (userId !== dbuserId || userEmail !== dbuserEmail) {
//             return "사용자를 찾을 수 없습니다.";
//         }
//         console.log("insert Server1.5");
//         // 해당 유저의 장바구니에 같은 상품이 있는지 확인
//         const counts = await productDao.checkItemCart(userId, productId);
//         console.log("insert Server2");

//         // 해당 상품 정보 및 해당 상품을 갖고 있는 매장들 데이터 호출
//         const productInfo = await productDao.getProductInfo(productId);
//         console.log("insert Server3");
//         // 해당 상품의 매장을 제외한 모든 정보 저장
//         const pInfo = productInfo.product;
//         // count 변수에 저장된 값 변수에 저장
//         const temp = counts[0]['COUNT(productId)'];
//         // temp가 0 보다 클 경우 해당 상품 장바구니에 이미 있다는 것. 
//         // 즉 Count컬럼만 +1 해주면 됨.
//         if (temp > 0) {
//             // ShoppingItems 테이블 내 Count 컬럼 값 ++ 
//             const plusCount = await productDao.plusItemCount(quantity, userId, productId);
//             console.log("insert Server4");
//             return plusCount;
//         } else {
//             // 기존에 없는 상품 모든 정보 삽입
//             const insertItems = await productDao.insertProducts(userId, pInfo);
//             return insertItems;
//         }
//     } catch (error) {
//         throw error;
//     }
// };
// // 상품 자세히 보기
// const deleteItems = async (userInfo, productId) => {
//     try {
//         const userId = userInfo.id;
//         const userEmail = userInfo.email;
//         const checkUser = await productDao.foundUsers(userId, userEmail);
//         const dbuserId = checkUser[0].id;
//         const dbuserEmail = checkUser[0].email;
//         if (userId !== dbuserId || userEmail !== dbuserEmail) {
//             return "사용자를 찾을 수 없습니다.";
//         }
//         const result = await productDao.getProductInfo(productId);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };
// // 결제 버튼 누를 시 
// const paymentItems = async (userId) => {
//     try {
//         // 해당 유저의 상품 전체 값 구하기
//         const totalPrice = await productDao.getTotalPrice(userId);
//         // 해당 유저 Point 값 구하기
//         const userPoint = await productDao.getUserPoint(userId);
//         // 값 차감 후 변수에 저장
//         const result = userPoint[0]['point'] - totalPrice[0]['SUM(totalPrice)'];
//         if (result < 0) {
//             return "ERROR";
//         } else {
//             // 유저 point 차감
//             await productDao.userPointDeduction(result, userId);
//             // 한번에 결제하기 위해 PaymentLine에 데이터 삽입
//             await productDao.setPaymentLine(userId);
//             // 상품 상태 바꿔줌
//             await productDao.updateItemStatus(userId);
//             // PaymentLine에 있는 데이터 삭제
//             await productDao.deletePaymentLine(userId);
//             // Payment에 데이터 삽입
//             await productDao.setPayment(userId);
//             return "SUCCESS INSERT PAYMENT DATA";
//         }
//     } catch (error) {
//         throw error;
//     }
// };
// // 결제 내역 확인
// const showUserPaymentList = async (userId) => {
//     try {
//         const result = await productDao.getPayment(userId);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

module.exports = {
    shoppingCart,
    updateQuantity,
    deleteShoppingItems,
    // inserBaskets,
    // deleteItems
    // paymentItems,
    // showUserPaymentList
};