const token = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY;
const { decode } = require("punycode");


const verfiyToken = async (req, res, next) => {
    const jwtToken = req.headers.authorization;

    if (!jwtToken) {
        res.status(403).json({ message: "권한이 없습니다" })
    } else {
        try {
            const decoded = await tokenDecode(jwtToken, secretkey);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).json({ message: "권한이 없습니다." })
        }
    }
};



const tokenDecode = async (jwtToken, secretkey) => {
    return token.verify(jwtToken, secretkey);
};

const createToken = async (id, email) => {
    const payload = { id, email };
    return token.sign(payload, secretkey);
};

module.exports = {
    verfiyToken, tokenDecode, createToken
};