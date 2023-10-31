const { DataSource, IsNull } = require('typeorm');
const path = require("path")
const envFilePaht = path.resolve(__dirname, "../utils", ".env");
const dotenv = require("dotenv");
const { error } = require('console');
dotenv.config({path :envFilePaht });

const myDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	//   myDataSource.destroy();
  });



// 요청 이메일 존재 여부 확인
const select = async(email) => {
  try{
    const result = await myDataSource.query(
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


const signup = async(email, password, name, phoneNumber, birthDay, address) => {
    try{
        const result = myDataSource.query(
            `
            insert into users (email, password, name, phoneNumber, birthDay, address) 
            values
            (? ,? ,? ,? ,? ,?)
            `,[email, password, name, phoneNumber, birthDay, address]
        )
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
    select, login, signup
}