const { DataSource } = require('typeorm');
const path = require("path")
const envFilePaht = path.resolve(__dirname, "../utils", ".env");
const dotenv = require("dotenv")
dotenv.config({ path: envFilePaht });

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

const getProduct = async (id) => {
  console.log("Show Product");
  try {
    const storesQuery = await myDataSource.query(
      `
      SELECT Stores.storeName, Stores.storeAddress
      FROM ConnectLine
      JOIN Products ON ConnectLine.productId = Products.id
      JOIN Stores ON ConnectLine.storesID = Stores.id
      WHERE Products.id = ?
        `,
      [id]
    );
    const productQuery = await myDataSource.query(
      `
      SELECT * FROM 
        Products
      WHERE id = ?
      `,
      [id]
    );
      const storesInfo = storesQuery[0];
      const productInfo = productQuery[0];
      return { stores : storesInfo, product: productInfo };
  } catch (error) {
    throw error;
  }
};

const insertProducts = async (productInfo) => {
  console.log("add Product");
  try {
    console.log(productInfo);
    const result = await myDataSource.query(
      `
      INSERT INTO ShoppingItems (userId, productId, price, status, count)
      VALUES (?, ?, ?, ?, ?);
      `,
      [productInfo.userId, productInfo.productId, productInfo.price, productInfo.status, productInfo.quantity]
    );
    return result;
  } catch(error) {
    throw error;
  }
};


module.exports = {
  getProduct,
  insertProducts
}
