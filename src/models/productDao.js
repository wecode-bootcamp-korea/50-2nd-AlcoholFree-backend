const { SimpleConsoleLogger } = require("typeorm");
const database = require("../utils/database");
const { appDataSource } = require("./db");

// 유저 검증
const foundUsers = async (id, email) => {
  try {
    const sql = await database.appDataSoure.query(
      `
        SELECT id, email FROM users WHERE id = ? AND email = ?
      `, [id, email]
    );
    return sql;
  } catch (error) {
    throw error;
  }
};
// 해당 User의 장바구니 정보 호출
const getUserCart = async (userid) => {
  try {
    const sql = await database.appDataSoure.query(`
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
  } catch (error) {
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

      `, [productId, userId]
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
const getProducts = async (productId) => {
  try {
    const result = appDataSource.query(
      `
      SELECT
      Products.id,
      Products.price,
      Products.name,
      Products.avm,
      Products.content,
      Products.origin,
      Products.productImg,
      Products.quantity,
      Products.categoryId,
      Products.brandName,
      Categories.categoryName
      from Products join Categories on Products.categoryId = Categories.id
      where Products.id = ?
      `,
      [productId]
    );
    return result
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

const getUsers = async (userId, userEmail) => {
  try {
    const sql = await appDataSource.query(`
          SELECT 
          id,
          email
          FROM
          users
          WHERE 
          id = ?
          AND email = ?
      `, [userId, userEmail]);
    return sql;
  } catch (err) {
    throw err;
  }
};

const createShoppingItem = async (user, productId, price, status, count, totalPrice) => {
  try {
    const add = await appDataSource.query(
      `
      INSERT INTO ShoppingItems (
          userId,
          productId,
          price,
          status,
          count,
          totalPrice
          )
          VALUES (?, ?, ?, ?, ?, ?);
      `,
      [user, productId, price, status, count, totalPrice]
    );
    return add
  } catch (error) {
    throw error;
  }
}
// Update SopphinItems Count
// 장바구니에 상품 중복 id 체크
const checkItemCart = async (userId, productId) => {
  try {
    const sql = await myDataSource.query(
      `
        SELECT COUNT(productId) 
        FROM ShoppingItems
        WHERE userId = ? AND productId = ?
      `, [userId, productId]
    );
    return sql;
  } catch (error) {
    throw error;
  }
};
// 장바구니에 기존 상품 있을 시, Count만 +1 시킨다.
const plusItemCount = async (count, userId, productId) => {
  try {
    const sql = await myDataSource.query(
      `
        UPDATE ShoppingItems 
          SET count = count + ?
            WHERE userId = ? AND productId = ?
      `, [count, userId, productId]
    );
    return sql;
  } catch (error) {
    throw error;
  }
};
// 상품 상세보기 (매장 정보 및 상품 정보)
const getProductInfo = async (productId) => {
  try {
    const storesQuery = await myDataSource.query(
      `
      SELECT Stores.storeName, Stores.storeAddress 
        FROM Stores 
          JOIN ConnectLine 
            ON Stores.productId = ConnectLine.productId
              WHERE Stores.productId = ?
        `,
      [productId]
    );
    const productQuery = await myDataSource.query(
      `
      SELECT * FROM 
        Products
      WHERE id = ?
      `,
      [productId]
    );
    const storesInfo = storesQuery;
    const productInfo = productQuery[0];
    return { stores: storesInfo, product: productInfo };
  } catch (error) {
    throw error;
  }
};
// 장바구니에 추가 
const insertProducts = async (userId, productInfo) => {
  try {
    const result = await myDataSource.query(
      `
      INSERT INTO ShoppingItems (userId, productId, price, count, totalPrice)
      VALUES (?, ?, ?, ?, ?);
      `,
      [userId, productInfo.id, productInfo.price, 1, productInfo.price]
    );
    const sql = await myDataSource.query(
      `
        UPDATE ShoppingItems
          SET status = "미결제"
          WHERE userId = ?
      `
      , [userId]);
    return result;
  } catch (error) {
    throw error;
  }
};
// 전체 상품 가격 
const getTotalPrice = async (userId) => {
  try {
    const sql = await myDataSource.query(
      `
      SELECT SUM(totalPrice) FROM ShoppingItems WHERE userid = ?
      `
      , [userId]);
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
  getProducts,
  getUsers,
  createShoppingItem,
  checkItemCart,
  plusItemCount,
  getProductInfo,
  insertProducts,
  getTotalPrice
}
