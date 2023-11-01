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





module.exports= {
    getProducts, getUsers
}
