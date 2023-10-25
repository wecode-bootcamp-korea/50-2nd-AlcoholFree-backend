const userDao = require("../models/userDao");
const { SimpleConsoleLogger } = require("typeorm");
const { json } = require("body-parser");
const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");



//로그인
const login = async(email, password) => {
    try{
    // 유저 가입정보 불러오기
    const dbUserData = await userDao.select(email);

     // email이 존재 할 경우 -> false 반환 -> email 중복
    if(dbUserData.length !== 0){
        return false;
    }
  
    //email 정규식
    const emailValidation = new RegExp("^^[a-zA-Z0-9+-_.]+@{1}[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9-.]+$");
    
    if(!emailValidation.test(email)){
        const error = new Error();
        error.message = "이메일 형식이 올바르지 않습니다."
        error.statusCode = 409;
        throw error;
    }else{
        console.log("이메일 형식이 올바릅니다.")
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

    }catch(err){
        const error = new Error();
        error.message = "패스워드는 대,소문자 및 숫자,특수문자 1자 이상을 이용하여 10~20자리를 만들어 주세요."
        error.statusCode = 409;
        throw error;
    }

    //데이터 저장
    try{
        
        const result = await userDao.signup(email, password, name, phoneNumber, birthDay, address);
        return result

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "로그인중 에러가 발생 하였습니다."
        throw error
    }
}

module.exports = {
    login
}