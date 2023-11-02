const { SimpleConsoleLogger } = require("typeorm");
const database = require("../utils/database");

// 유저 검증
const foundUsers = async (id, email) => {
  try {
    const sql = await database.appDataSoure.query(
      `
        SELECT id, email FROM users WHERE id = ? AND email = ?
      `,[id, email]
    );
    return sql;
  } catch (error) {
    throw error;
  }
};
// 해당 User의 장바구니 정보 호출
const getUserCart= async (userid) => {
  try {
    const sql = await database.appDataSoure.query( `
      SELECT 
        Products.id, 
        Products.productImg, 
        Products.name, 
        Products.price, 
        ShoppingItems.status, 
        ShoppingItems.count, 
        Products.quantity, 
        Products.origin, 
        Products.avm
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
const updateItemCount = async (productId, userId, count) => {
  try {
    const sql = await database.appDataSoure.query(
      `
        UPDATE ShoppingItems 
          SET count = ?, totalPrice = totalPrice + price
        WHERE productId = ? AND userId = ?
      `, [count, productId, userId]
    );
    return sql;
  } catch (error) {
    throw error
  }
};
// 상품 삭제
const deleteItem = async (productId, userId) => {
  console.log(productId, userId)
  try {
    const sql = await database.appDataSoure.query(

      `
        DELETE FROM ShoppingItems
        WHERE productId =? AND userId = ?

      `,[productId, userId]
    );

    return sql;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// 상품 갯수를 파악 함
const getItemsQuantity = async (id) => {
  try {
    const sql = await database.appDataSoure.query(
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

module.exports = {
  foundUsers,
  getUserCart,
  getItemsQuantity,
  deleteItem,
  updateItemCount,
  
}