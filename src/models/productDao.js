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

  
// 유저 검증
const foundUsers = async (id, email) => {
  try {
    const sql = await myDataSource.query(
      `
        SELECT id, email FROM users WHERE id = ? AND email = ?
      `,[id, email]
    );
    return sql;
  } catch (error) {
    throw error;
  }
};
// // 장바구니에 상품 중복 id 체크
// const checkItemCart = async (userId, productId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         SELECT COUNT(productId) 
//         FROM ShoppingItems
//         WHERE userId = ? AND productId = ?
//       `, [userId, productId]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// 해당 유저의 Email에 해당하는 id를 호출
// const getUserId = async (email) => {
//   try {
//     const sql = myDataSource.query( `
//       SELECT id FROM users WHERE email = ?
//     `, [email]);
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// 해당 User의 장바구니 정보 호출
const getUserCart= async (userid) => {
  try {
    const sql = await myDataSource.query( `
      SELECT Products.id, Products.productImg, Products.name, Products.price, ShoppingItems.status, ShoppingItems.count, Products.quantity
      FROM 
        ShoppingItems 
      JOIN 
        Products ON ShoppingItems.productId = Products.id
      WHERE ShoppingItems.userId = ?
    `, [userid]);
    return sql;
  } catch(error) {
    throw error;
  }
};
// 상품 갯수를 파악 함
const getItemsQuantity = async (id) => {
  try {
    const sql = await myDataSource.query(
      `
        SELECT quantity 
          FROM  Products
        WHERE id = ?
      `, [id]
    );
    return sql;
  } catch (error) {
    throw error;
  }
};
// Update SopphinItems Count
const updateItemCount = async (productId, userId, count) => {
  try {
    const sql = await myDataSource.query(
      `
        UPDATE ShoppingItems 
          SET count = count + ?, totalPrice = totalPrice + price
        WHERE productId = ? AND userId = ?
      `, [count, productId, userId]
    );
    return sql;
  } catch (error) {
    throw eorr
  }
};
// 상품 삭제
const deleteItem = async (productId, userId) => {
  try {
    const sql = await myDataSource.query(
      `
      DELETE 
        FROM ShoppingItems
      WHERE productId = ? AND userId = ?
      `, [productId, userId]
    );
    return sql;
  } catch (error) {
    return error;
  }
};




module.exports = {
  foundUsers,
  // checkItemCart,
  // getUserId,
  getUserCart,
  getItemsQuantity,
  deleteItem,
  updateItemCount
}