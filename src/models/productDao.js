const { DataSource } = require('typeorm');


const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()//데이터베이스 연결 초기화 시도
    .then(() => { //초기화가 성공 되었을 때
        console.log("Data Source has been initialized!")
    })
    .catch(error => { //초기화 중에 오류가 발생 하였을 때
        console.error("Data Source initialization error:", error)
    })

    //유저검증
    const realUser = async (id, email) => {
        try {
            const userCheck = await myDataSource.query(
                "SELECT id, email FROM users WHERE id = ? AND email = ?",
                [id, email]
            );
            return userCheck;
        } catch (err) {
            throw err;
        }
    };
    



//메인
const selectProduct = async () => {
    try {//db에서 제품 정보 조회하는 쿼리 실행
        const productMain = await myDataSource.query(`
            SELECT 
            id, 
            price, 
            name, 
            content, 
            origin, 
            productImg,
            categoryId
            FROM Products
            ORDER BY id
        `);

        //console.log("typeorm return data: ", productMain)
        //조회된 제품 정보 반환
        return productMain
    } catch (err) {//에러 발생하면 에러 던지기
        throw err;
    }
}

module.exports = { selectProduct, realUser }