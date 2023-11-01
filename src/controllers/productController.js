const productService = require("../services/productService")

const detailPage = async(req,res) =>{
    
        const {productId} = req.query;

        const products = await productService.getProducts(productId, userInfo, productsInfo)

        console.log("resulte 값:",products);
        return res.status(200).json({products});
    };

    const addProducts = async(req, res)=>{
        
        const user = req.user.id;
        const {productId, price, status, count, totalPrice} = req.body;

        await productService.addProducts(user, productId, price, status, count, totalPrice);
        res.status(201).json({message: "succeeded"});
    };

module.exports = { 
    detailPage, addProducts
} 



// 1.프론트에서 req,query, req.params로 해서 제품의 아이디를 받아온다

// 4. 유저가 회원이 맞으면 제품의 아이디를 데이터베이스에서 조회
