const bcrypt = require("bcrypt");

// 패스워드 암호화
const makehash = async(password, saltRound) => {
    return await bcrypt.hash(password, saltRound);
};

//패스워드 복호화
const decode = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
};

module.exports = {
    makehash, decode
};