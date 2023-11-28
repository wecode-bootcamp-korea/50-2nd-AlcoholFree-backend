const productDao = require("../models/productDao")

// 장바구니 페이지로 넘어 왔을때, 유저의 배송주소(이름, 주소, 연락처, 포인트 보내주기)
const selectUserInfo = async (userInfo) => {
    try {
        //토큰의 유저 정보와 DB 정보 유저정보 비교
        const userId = userInfo.id;
        const userEmail = userInfo.email;

        const selectUserInfo = await productDao.selectUserInfo(userId, userEmail); //유저 정보 조회

        const dbUserId = selectUserInfo[0].id
        const dbUserEmail = selectUserInfo[0].email

        if (userId !== dbUserId || userEmail !== dbUserEmail) {
            return false;
        }
        return selectUserInfo;

    } catch (err) {

    }
}

// 장바구니에 담긴 상품을 정하고 결제 버튼을 눌렀을때
const cost = async (totalPrice, userInfo) => {
    try {

        //유저 검증 및 정보 조회
        const userId = userInfo.id;
        const userEmail = userInfo.email
        const selectUserInfo = await productDao.selectUserInfo(userId, userEmail);

        // 포인트 사용 및 차감 후 남은 포인트 저장
        const userPoint = selectUserInfo[0].point - totalPrice.totalPrice // 유저의 기존 포인트와 유저의 사용 포인트를 차감
        console.log(selectUserInfo[0].point);
        console.log(totalPrice.totalPrice);
        const userUsesdPoint = await productDao.cost(userPoint, userId); // 결제 유저의 금액을 받아 차감 포인트 적립
        const updateCount = await productDao.countUpdate(userId);
        // 유저의 포인트 사용 내용 반영
        const cartList = await productDao.cartList(userId); // 장바구니 데이터 불러오기

        // 장바구니의 id 값과, 총 결재 금액 반영
        let result = "";

        for (let i = 0; i < cartList.length; i++) {
            result = await productDao.payment(cartList[i].id, cartList[i].totalPrice);
        }

        // 결제 상태 업데이트
        let payStatus = "";
        let updatePayStatus = null;

        // payments의 insert 결과가 0일 경우
        if (result.affectedRows === 0) {
            payStatus = "미결제";
            return false;
        }

        payStatus = "결제 완료"
        updatePayStatus = await productDao.updateStatus(payStatus, userId);

        // 결과가 있을 경우 -> 결제 상태를 업데이트 후 true 반환
        return true;

    } catch (err) {
        console.log(err);
        const error = new Error();
        error.message = "서비스 에러";
        throw error;
    }
}

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
        if (productQuantity[0].quantity > 0) {
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

const getProducts = async (productId, userInfo) => {
    // 토큰 값 꺼내 저장
    const userId = userInfo.id;
    const userEmail = userInfo.email;

    // DB에 토큰에 꺼낸 값들을 넣어 비교 
    const checkUser = await productDao.getUsers(userId, userEmail);
    // DB에 꺼낸 id와 email을 변수에 따로 저장 (이유 : 해당 사항이 없다면 조건문에 걸려 return 하기 위해)
    const dbUserId = checkUser[0].id;
    const dbUserEmail = checkUser[0].email;

    const products = await productDao.getProducts(productId);

    if (userId !== dbUserId || userEmail !== dbUserEmail) {
        return "해당 유저가 없습니다.";
    }
    return products;
};
// 장바구니에 데이터 삽입
const inserBaskets = async (userInfo, productId, count) => {
    try {
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const checkUser = await productDao.foundUsers(userId, userEmail);
        const dbuserId = checkUser[0].id;
        const dbuserEmail = checkUser[0].email;
        const quantity = count;
        if (userId !== dbuserId || userEmail !== dbuserEmail) {
            return "사용자를 찾을 수 없습니다.";
        }
        // 해당 유저의 장바구니에 같은 상품이 있는지 확인
        const counts = await productDao.checkItemCart(userId, productId);
        // 해당 상품 정보 및 해당 상품을 갖고 있는 매장들 데이터 호출
        const productInfo = await productDao.getProductInfo(productId);
        // 해당 상품의 매장을 제외한 모든 정보 저장
        const pInfo = productInfo.product;
        // count 변수에 저장된 값 변수에 저장
        const temp = counts[0]['COUNT(productId)'];
        // temp가 0 보다 클 경우 해당 상품 장바구니에 이미 있다는 것. 
        // 즉 Count컬럼만 +1 해주면 됨.
        if (temp > 0) {
            // ShoppingItems 테이블 내 Count 컬럼 값 ++ 
            const plusCount = await productDao.plusItemCount(quantity, userId, productId);
            return plusCount;
        } else {
            // 기존에 없는 상품 모든 정보 삽입
            const insertItems = await productDao.insertProducts(userId, pInfo, quantity);
            return insertItems;
        }
    } catch (error) {
        throw error;
    }
};
// 상품 자세히 보기
const deleteItems = async (userInfo, productId) => {
    try {
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const checkUser = await productDao.foundUsers(userId, userEmail);
        const dbuserId = checkUser[0].id;
        const dbuserEmail = checkUser[0].email;
        if (userId !== dbuserId || userEmail !== dbuserEmail) {
            return "사용자를 찾을 수 없습니다.";
        }
        const result = await productDao.getProductInfo(productId);
        return result;
    } catch (error) {
        throw error;
    }
};
const createShoppingItem = async (user, productId, price, status, count, totalPrice) => {
       try {
        const userId = userInfo.id;
        const userEmail = userInfo.email;
        const checkUser = await productDao.foundUsers(userId, userEmail);
        const dbuserId = checkUser[0].id;
        const dbuserEmail = checkUser[0].email;
        console.log("dbuserId :", dbuserId);
        console.log("email :", dbuserEmail);
        const quantity = count;
        if (userId !== dbuserId || userEmail !== dbuserEmail) {
            return "사용자를 찾을 수 없습니다.";
        }
        console.log("insert Server1.5");
        // 해당 유저의 장바구니에 같은 상품이 있는지 확인
        const counts = await productDao.checkItemCart(userId, productId);
        console.log("insert Server2");

        // 해당 상품 정보 및 해당 상품을 갖고 있는 매장들 데이터 호출
        const productInfo = await productDao.getProductInfo(productId);
        console.log("insert Server3");
        // 해당 상품의 매장을 제외한 모든 정보 저장
        const pInfo = productInfo.product;
        // count 변수에 저장된 값 변수에 저장
        const temp = counts[0]['COUNT(productId)'];
        // temp가 0 보다 클 경우 해당 상품 장바구니에 이미 있다는 것. 
        // 즉 Count컬럼만 +1 해주면 됨.
        if (temp > 0) {
            // ShoppingItems 테이블 내 Count 컬럼 값 ++ 
            const plusCount = await productDao.plusItemCount(quantity, userId, productId);
            console.log("insert Server4");
            return plusCount;
        } else {
            // 기존에 없는 상품 모든 정보 삽입
            const insertItems = await productDao.insertProducts(userId, pInfo);
            return insertItems;
        }
    } catch (error) {
        throw error;
    }
};

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


module.exports = {
    shoppingCart,
    updateQuantity,
    deleteShoppingItems,
    getProducts,
    createShoppingItem,
    inserBaskets,
    deleteItems,
    cost,
    selectUserInfo,
    selectProduct
};

