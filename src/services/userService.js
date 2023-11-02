const { SimpleConsoleLogger } = require("typeorm");
const userDao = require("../models/userDao");
const { json } = require("body-parser");
const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");

//로그인
const login = async(email, password) => {
    try{

        // 패스워드 복호화
        const dbdata = await userDao.select(email);
        
        if(dbdata.length === 0){
            return false;
        }

        const dbpassword = dbdata[0].password;
        const decode = await bcrypt.decode(password, dbpassword);

        //복호화된 패스워드와 로그인 요청한 패스 워드를 비교하여 false를 반환 할 경우
        if(decode === false){
            throw error;
        }

        //로그인
        const result = await userDao.login(email);

        if(result.length === 0){
            throw error;
        } 

        // 토근 생성
        const dbId = dbdata[0].id;
        const jwtToken = await verfiyToken.createToken(dbId, email);

        return jwtToken;

    }catch(err){
        const error = new Error();
        throw error;
    }
}

module.exports = {
    login
}