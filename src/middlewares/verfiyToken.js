const token = require("jsonwebtoken");
const secetkey = process.env.SECRET_KEY
const { decode } = require("punycode");

// 토큰 검증
const verfiyToken  = async(req, res, next) => {
    const jwtToken = req.headers.token;

    if(!jwtToken){
        res.status(403).json({message : "권한이 없습니다"})
    }else{
        try{
            const decoded = await tokenDecode(jwtToken, secetkey);
            req.user = decoded;
            next();
        }catch(err){
            return res.status(403).json({message : "권한이 없습니다."})
        }
    }
}

// 토큰 검증
const tokenDecode = async(jwtToken, secetKey) => {
    return jwt.verify(jwtToken, secetKey);
}

const createToken = async(id, email) => {
    const payload = {id, email};
    return token.sign(payload, secetkey)
}

module.exports = {
    verfiyToken, tokenDecode, createToken
}