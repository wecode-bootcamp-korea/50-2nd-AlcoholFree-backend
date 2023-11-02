const { DataSource } = require('typeorm');


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
        console.log("Data Source has been initialized!")
    })
    .catch(error => { 
        console.error("Data Source initialization error:", error)
    })


const realUser = async (id, email) => {
    try {
        const userCheck = await myDataSource.query(
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
        const productMain = await myDataSource.query(`
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

        return productMain
    } catch (err) {
        throw err;
    }
}

module.exports = { selectProduct, realUser }