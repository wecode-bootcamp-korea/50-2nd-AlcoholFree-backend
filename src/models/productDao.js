const {DataSource} = require("typeorm");
const path = require("path");
const envPath = path.join(__dirname, "../utils","env")
const dotenv = require("dotenv");
const { json } = require("body-parser");
dotenv.config({path: envPath});

const appDataSoure = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
})

appDataSoure.initialize()
.then(() => {
    console.log("Data Source has been initialize");
}).catch((err) => {
    console.err("Error occurred during Data Source initialization", err)
})


// 유저 정보 조회
const selectUserInfo = async(userId, email) => {
    try{
        const result = await appDataSoure.query(
            `
            select * from users
            where id =? and email =?
            `,[userId, email]
        )
        return result;
    }catch(err){
        console.log(err)
        const error = new Error();
        error.message = "유저 정보 조회 에러";
        throw error;
    }

}

// 장바구니에 담긴 데이터 확인
const selectCart = async(cartId) => {
    const result = await appDataSoure.query(
        `
        select * from ShoppingItems
        where = ?
        `,[cartId]
    )
    console.log(result);
    return result;
}

// 유저의 point 변경
const cost = async(userPoint, userId) => {
    try{
        const result = await appDataSoure.query(
            `
            update users set point = ?
            where id = ?;
            
            `,[userPoint, userId]
        )
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

// 결제 정보를 담기 위한 cart 정보 불러오기
const cartList = async(userId) => {
    try{
        const result = appDataSoure.query(
            `
            select * from ShoppingItems
            where userId = ?
            order by id desc

            `,[userId]
        );
        return result;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}


// 결제 정보 담기
const payment = async(cartId, totalPrice) => {
    try{
        const result = await appDataSoure.query(
            `
            insert into Payments (shoppingItemsId, totalPrice)
            values (?, ?)
            
            `,[cartId, totalPrice] 
        );

       return result;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

// 결제 상태 업데이트
const updateStatus = async(payStatus, userId) => {
    try{
        const result = await appDataSoure.query(
            `
            update ShoppingItems
            set status = ?
            where userId = ?
            
            `,[payStatus, userId] 
        );

       return result;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

module.exports = {
    cost, selectCart, selectUserInfo, payment, cartList, updateStatus
}