const productService = require("../services/productService")

const detailPage = async(req,res) =>{
    
        const {productId} = req.query;
        const userInfo = req.user;
        console.log(productId);

        const products = await productService.getProducts(productId,userInfo)

    
        console.log("resulte 값:",products);
        return res.status(200).json({products});

    }

module.exports = { 
    detailPage 
} 



// 1.프론트에서 req,query, req.params로 해서 제품의 아이디를 받아온다

// 4. 유저가 회원이 맞으면 제품의 아이디를 데이터베이스에서 조회
