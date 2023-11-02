const database = require("../utils/database")

// 유저 정보 조회
const selectUserInfo = async(userId, email) => {
    try{
        const result = await database.appDataSource.query(
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
    const result = await database.appDataSource.query(
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
        const result = await database.appDataSource.query(
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
        const result = database.appDataSource.query(
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
        const result = await database.appDataSource.query(
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
        const result = await database.appDataSource.query(
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
// 유저 검증
const foundUsers = async (id, email) => {
  try {
    const sql = await database.appDataSource.query(
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
    const sql = await database.appDataSource.query(`
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
    const sql = await database.appDataSource.query(
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
    const storesQuery = await database.appDataSource.query(
      `
      SELECT Stores.storeName, Stores.storeAddress 
        FROM Stores 
          JOIN ConnectLine 
            ON Stores.productId = ConnectLine.productId
              WHERE Stores.productId = ?
        `,
      [productId]
    );
    const productQuery = await database.appDataSource.query(
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
    const result = await database.appDataSource.query(
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
    const sql = await database.appDataSource.query(
      `
      SELECT SUM(totalPrice) FROM ShoppingItems WHERE userid = ?
      `
      , [userId]);
    return sql;
  } catch (error) {
    throw error;
  }
};
const realUser = async (id, email) => {
  try {
      const userCheck = await database.appDataSource.query(
          "SELECT id, email FROM users WHERE id = ? AND email = ?",
          [id, email]
      );
      return userCheck;
  } catch (err) {
      throw err;
  }
};
const selectProduct = async () => {
  try {
      const productMain = await database.appDataSource.query(`
          SELECT
          Products.id,
          Products.price,
          Products.name,
          Products.content,
          Products.origin,
          Products.productImg,
          Products.categoryId,
          Categories.categoryName
          FROM Products
          INNER JOIN Categories
          ON Categories.id = Products.categoryId
          ORDER BY Products.categoryId ASC
      `);
      return productMain;
  } catch (err) {
      throw err;
  }
}

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
  getTotalPrice,
  getProducts, 
  getUsers, 
  createShoppingItem,
  cost, 
  selectCart, 
  selectUserInfo, 
  payment, 
  cartList, 
  updateStatus,
  realUser,
  selectProduct
}
