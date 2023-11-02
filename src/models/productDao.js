const database = require("../utils/database")

// 유저 정보 조회
const selectUserInfo = async(userId, email) => {
    try{
        const result = await database.appDataSoure.query(
            `
            select * from users
            where id =? and email =?
            `,[userId, email]
        )
        return result;
    }catch(err){
        console.log(err)
        const error = new Error();
        error.message = "유저 정보 조회 에러";
        throw error;
    }

}

// 장바구니에 담긴 데이터 확인
const selectCart = async(cartId) => {
    const result = await database.appDataSoure.query(
        `
        select * from ShoppingItems
        where = ?
        `,[cartId]
    )
    console.log(result);
    return result;
}

// 유저의 point 변경
const cost = async(userPoint, userId) => {
    try{
        const result = await database.appDataSoure.query(
            `
            update users set point = ?
            where id = ?;
            
            `,[userPoint, userId]
        )
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

// 결제 정보를 담기 위한 cart 정보 불러오기
const cartList = async(userId) => {
    try{
        const result = database.appDataSoure.query(
            `
            select * from ShoppingItems
            where userId = ?
            order by id desc

            `,[userId]
        );
        return result;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

// 결제 정보 담기
const payment = async(cartId, totalPrice) => {
    try{
        const result = await database.appDataSoure.query(
            `
            insert into Payments (shoppingItemsId, totalPrice)
            values (?, ?)
            
            `,[cartId, totalPrice] 
        );

       return result;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

// 결제 상태 업데이트
const updateStatus = async(payStatus, userId) => {
    try{
        const result = await database.appDataSoure.query(
            `
            update ShoppingItems
            set status = ?
            where userId = ?
            
            `,[payStatus, userId] 
        );

       return result;

    }catch(err){
        console.log(err);
        const error = new Error();
        error.message = "DB 에러"
        throw error;
    }
}

const { SimpleConsoleLogger } = require("typeorm");
// const database = require("../utils/database");
const {appDataSource} = require("./db");

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
const getProducts = async(productId) => {
  try{
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

const getUsers = async (userId,userEmail) => {
  try{ 
      const sql = await appDataSource.query(`
          SELECT 
          id,
          email
          FROM
          users
          WHERE 
          id = ?
          AND email = ?
      `, [userId,userEmail]);
      return sql;
  } catch(err) {
      throw err;
  }
};

const createShoppingItem = async (user, productId, count) => {
  try {
      const existingItem = await appDataSource.query(
      `
      SELECT
      count,
      price
      FROM ShoppingItems
      WHERE userId = ?
      AND productId = ?;
      `,
      [user, productId]
      );
      if (existingItem.length > 0) {
      const updatedCount = parseInt(existingItem[0].count) + parseInt(count);
      const updatedTotalPrice = existingItem[0].price * updatedCount;
      await appDataSource.query(
      `
      UPDATE ShoppingItems
      SET count = ?,
      totalPrice = ?
      WHERE userId = ?
      AND productId = ?;`,
      [updatedCount, updatedTotalPrice, user, productId]
      );
      return { message: "Item count updated" };
      } else {
      const productInfo = await appDataSource.query(
      `
      SELECT
      price
      FROM Products
      WHERE id = ?;`,
      [productId]
      );
      if (productInfo.length === 0) {
          throw new Error('Product not found');
      }
      const price = productInfo[0].price;
      await appDataSource.query(
      `
      INSERT INTO ShoppingItems (
          userId,
          productId,
          price,
          status,
          count
          )
          VALUES (?, ?, ?, ?, ?);
          `,
          [user, productId, price, "미결제", count]
      );
      return { message: "New item added to shopping cart" };
      }
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
  cost, 
  selectCart, 
  selectUserInfo, 
  payment, 
  cartList, 
  updateStatus
}

