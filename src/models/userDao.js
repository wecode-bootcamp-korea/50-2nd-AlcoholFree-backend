const database = require("../utils/database")

// 요청 이메일 존재 여부 확인
const select = async(email) => {
  try{
    const result = await database.appDataSource.query(
      `
      SELECT 
        id,
        email,
        password
      FROM users
      WHERE email = ?
      `, [email]
    )
      return result;
  }catch(err){
    const error = new Error();
    error.message = "데이터 조회에 실패 하였습니다."
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
    select, login
}