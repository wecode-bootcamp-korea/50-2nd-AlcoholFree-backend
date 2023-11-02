const { DataSource } = require('typeorm');
const path = require("path");
const envFilePaht = path.resolve(__dirname, "../utils", ".env");
const dotenv = require("dotenv");
const { error } = require('console');
dotenv.config({path :envFilePaht });

const appDataSource = new DataSource({
	  type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})



appDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
  });



  module.exports = {
    appDataSource
  }