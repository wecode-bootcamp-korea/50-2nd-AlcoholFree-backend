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
const selectUserInfo = async() => {
    try{
        const result = await appDataSoure.query(
            `
            `,[]
        )
    }catch(err){

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

// 결제
const cost = async(cartId) => {
    const result = await appDataSoure.query(
        `
        
        
        `,[]
    )
}


module.exports = {
    cost, selectCart, selectUserInfo
}