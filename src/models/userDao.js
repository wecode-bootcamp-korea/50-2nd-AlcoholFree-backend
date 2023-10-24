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


// 회원가입
const signup = async (email, password, name, phoneNumber, birthDay, address) => {
	try {
		const result = myDataSource.query(
            `
            insert into users(
              email,
              password,
              name,
              phoneNumber,
              birthDay,
              address
            ) values (?, ?, ?, ?, ?, ?)
            `,[email, password, name, phoneNumber, birthDay, address]
        )
        return result;

	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

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

const login = async(email, password) => {

}


module.exports = {
    signup, select
}