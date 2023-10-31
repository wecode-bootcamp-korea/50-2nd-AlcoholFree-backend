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
// 해당 User의 장바구니 정보 호출
const getUserCart= async (userid) => {
  try {
    const sql = await myDataSource.query( `
      SELECT Products.id, Products.productImg, Products.name, Products.price, ShoppingItems.status, ShoppingItems.count, Products.quantity, Products.origin, Products.avm
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
          SET count = ?, totalPrice = totalPrice + price
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
// 유저 포인트
// const getUserPoint = async (id) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         SELECT point FROM users WHERE id = ?
//       `
//       , [id]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// // 유저 포인트 차감 
// const userPointDeduction = async (point, id) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         UPDATE users SET point = ? WHERE id = ?
//       `
//       , [point, id]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// }
// // Payment Talbe에 정보 입력
// const setPayment = async (userId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         INSERT INTO Payments (lineId, productId, price, totalPrice)
//           SELECT
//             PaymentLine.shoppingItemsId,
//             ShoppingItems.productId,
//             ShoppingItems.price,
//             ShoppingItems.totalPrice
//           FROM PaymentLine
//            JOIN ShoppingItems ON ShoppingItems.id = PaymentLine.shoppingItemsId
//           WHERE ShoppingItems.userId = ?;
//       `, [userId]);
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// }
// // 장바구니에 기존 상품 있을 시, Count만 +1 시킨다.
// const plusItemCount = async (userId, productId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         UPDATE ShoppingItems 
//           SET count = count + 1
//             WHERE userId = ? AND productId = ?
//       `, [userId, productId]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// // 기존 PaymentLine에 있는 데이터 삭제 ( Test )
// const deletePaymentLine = async (userId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         DELETE pl 
//           FROM PaymentLine pl
//             JOIN ShoppingItems si ON si.id = pl.shoppingItemsId
//               WHERE si.userId = ?
//       `,[userId]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// // 결제 내역 확인 (추가 그냥 한번 해봤음)
// const getPayment = async (userId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         SELECT 
//           Products.name, Products.price, Products.productImg, Payments.paymentAt, Payments.totalPrice
//         FROM Payments 
//           JOIN PaymentLine ON Payments.lineId = PaymentLine.paymentsId
//           JOIN ShoppingItems ON PaymentLine.shoppingItemsId = ShoppingItems.id
//           JOIN Products ON ShoppingItems.productId = Products.id
//         WHERE userId = ?
//       `, [userId]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// }
// // 한 번에 결제하기 위해 PaymentLine에 UserId가 일치하면 다 넣어줌.
// const setPaymentLine = async (userId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         INSERT INTO PaymentLine (shoppingItemsId)
//           SELECT id 
//         FROM ShoppingItems WHERE userid = ?;

//       `, [userId]
//     );
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// // 결제 시 상품 상태 업데이트
// const updateItemStatus = async (userId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//         UPDATE ShoppingItems
//           SET status = "결제 완료"
//           WHERE userId = ?
//       `
//       , [userId]);
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };
// // 상품 상세보기 (매장 정보 및 상품 정보)
// const getProductInfo = async (productId) => {
//   try {
//     const storesQuery = await myDataSource.query(
//       `
//       SELECT Stores.storeName, Stores.storeAddress 
//         FROM Stores 
//           JOIN ConnectLine 
//             ON Stores.productId = ConnectLine.productId
//               WHERE Stores.productId = ?
//         `,
//       [productId]
//     );
//     const productQuery = await myDataSource.query(
//       `
//       SELECT * FROM 
//         Products
//       WHERE id = ?
//       `,
//       [productId]
//     );
//     const storesInfo = storesQuery;
//     const productInfo = productQuery[0];
//     return { stores: storesInfo, product: productInfo };
//   } catch (error) {
//     throw error;
//   }
// };
// // 장바구니에 추가 
// const insertProducts = async (userId, productInfo) => {
//   try {
//     const result = await myDataSource.query(
//       `
//       INSERT INTO ShoppingItems (userId, productId, price, count, totalPrice)
//       VALUES (?, ?, ?, ?, ?);
//       `,
//       [userId, productInfo.id, productInfo.price, 1, productInfo.price]
//     );
//     const sql = await myDataSource.query(
//       `
//         UPDATE ShoppingItems
//           SET status = "미결제"
//           WHERE userId = ?
//       `
//       , [userId]);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };
// // 전체 상품 가격 
// const getTotalPrice = async (userId) => {
//   try {
//     const sql = await myDataSource.query(
//       `
//       SELECT SUM(totalPrice) FROM ShoppingItems WHERE userid = ?
//       `
//       , [userId]);
//     return sql;
//   } catch (error) {
//     throw error;
//   }
// };


module.exports = {
  foundUsers,
  getUserCart,
  getItemsQuantity,
  deleteItem,
  updateItemCount,
  // getUserPoint,
  // checkItemCart,
  // getUserId,
  // setPayment,
  // plusItemCount,
  // deletePaymentLine,
  // getPayment,
  // setPaymentLine,
  // updateItemStatus,
  // getProductInfom,
  // insertProducts,
  // getTotalPrice
}