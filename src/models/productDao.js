const {appDataSource} = require("./db");

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
    }catch{
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


const scrap = async(user, productId,  price, status, count, totalPrice)=>{
    try{
        await appDataSource.query(
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
        [user, productId,  price, status, count, totalPrice]
    );
    }catch(error){
        throw error;
    }
}

module.exports= {
    getProducts, getUsers, scrap
}
