const database = require("../utils/database")


// 요청 이메일 존재 여부 확인
const selectUserDataByEmail = async(email) => {
  try{
    const result = await database.appDataSource.query(
      `
      SELECT 
        id,
        email
      FROM USERS
      WHERE email = ?
      `, [email]
    )
      return result;
}

// 회원가입
  const signup = async(email, password, name, phoneNumber, birthDay, address) => {
    try{
        const result = await database.appDataSource.query(
            `
            INSERT INTO USERS (email, password, name, phoneNumber, birthDay, address) 
            VALUES
            (? ,? ,? ,? ,? ,?)
            `,[email, password, name, phoneNumber, birthDay, address]
        )
        return result;
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "회원가입중 에러가 발생하였습니다"
        throw error;
    }

}

// 로그인
const login = async(email) => {
  try{
    const result = await database.appDataSource.query(
      `
        SELECT 
        id,
        email
        FROM users 
        WHERE email = ?;
      `, [email]
    );
    return result
  }catch(err){
    const error = new Error();
    error.message = "로그인중 에러가 발생하였습니다"
    throw error;
  }
}

module.exports = {
    selectUserDataByEmail, login, signup
}

