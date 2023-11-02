
const { SimpleConsoleLogger, CustomRepositoryCannotInheritRepositoryError } = require("typeorm");
const userDao = require("../models/userDao");
const { json } = require("body-parser");
const verfiyToken = require("../middlewares/verfiyToken")
const bcrypt = require("../middlewares/bcrypt")

// 회원가입
const signup = async(email, password, name, phoneNumber, birthDay, address) => {

    try{
        // 유저 가입정보 불러오기
        const dbUserData = await userDao.selectUserDataByEmail(email);

        // email이 존재 할 경우 -> false 반환 -> email 중복
        if(dbUserData.length !== 0){
            throw error
        }
    }catch(err){
        const error = new Error();
        error.message = "Email이 중복되었습니다.";
        throw error
    }

    //email 정규식
    const emailValidation = new RegExp("^^[a-zA-Z0-9+-_.]+@{1}[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9-.]+$");
    
    if(!emailValidation.test(email)){
        const error = new Error();
        error.message = "이메일 형식이 올바르지 않습니다."
        error.statusCode = 409;
        throw error;
    }

    //password 정규식
    const pwValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,20})"
    );

    if(!pwValidation.test(password)){
        const err = new Error();
        err.message = "패스워드는 대,소문자 및 숫자,특수문자 1자 이상을 이용하여 10~20자리를 만들어 주세요."
        err.statusCode = 409;
        throw err;
    }

    // password 암호화
    try{
        const saltRound = 10;
        const hashedPassword = await bcrypt.makehash(password, saltRound);
        password = hashedPassword; // 암호화된 데이터를 password에 넣기
   
    }catch(err){
        const error = new Error();
        error.message = "password incoding fail"
        throw error;
    }
    
    //데이터 저장
    try{
        const result = await userDao.signup(email, password, name, phoneNumber, birthDay, address);
        return result
    }catch(err){
        const error = new Error();
        error.message = "data_input_fail";
        return error;
    }
};


module.exports = {
    signup
}