const token = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET;
// // const productService = require("../services/productService")

// // const token = async(req, res, next) => {
// //     const accessToken = req.headers.authorization;

// //     try{
// //         const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
// //         req.user = await productService.getProducts();
// //         next()
// //     }catch {
// //         res.status(401).json({message:"INVALID_ACCESS_TOKEN"});
// //     }
// // };

// // module.exports = {
// //     token
// // }

const verfiyToken = async(req,res,next) => {
    const jwtToken = req.headers.authorization;

    if(!jwtToken) {
        res.status(403).json({message:"권한이 없습니다"})
    } else {
        try {
            const decoded = await tokenDecode(jwtToken,secretkey) ;
            req.user = decoded;
            next();
        } catch(err){
            return res.status(403).json({message:"권한이 없습니다", err})
        }
    }
};

const tokenDecode = async(jwtToken, secretkey) => {
        return token.verify(jwtToken, secretkey);
};

const createToken = async(id,email) => {
    const payload = {id, email};
    return token.sign(payload, secretkey);
};

module.exports = {
    verfiyToken, tokenDecode, createToken
}