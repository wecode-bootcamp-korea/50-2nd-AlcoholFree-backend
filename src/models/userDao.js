const database = require("../utils/database")


  // 요청 이메일 존재 여부 확인
const select = async(email) => {
  try{
    const result = await database.appDataSource.query(
      `
      select * from users
      where email = ?
      `, [email]
    )
      return result;
  }catch(err){
    console.log(err);
    const error = new Error();
    error.statusCode = 500;
    throw error;
  }
}

// 로그인
const login = async(email) => {
  try{
    const result = await myDataSource.query(
      `
        select * from users
        where email = ?
      
      `, [email]
    );
    
    return result
  }catch(err){
    console.log(err);
    const error = new Error();
    error.message = "로그인 도중 에러가 발생하였습니다"
    error.statusCode = 500;
    throw error;
  }

}


module.exports = {
    select, login
}