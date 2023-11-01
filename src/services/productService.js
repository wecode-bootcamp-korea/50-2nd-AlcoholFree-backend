const productDao = require('../models/productDao');
const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");


//메인
const selectProduct = async (customerIf) => {
    try {
        
        const customerId = customerIf.id;
        const customerEm = customerIf.email;
        
        const customerCheck = await productDao.realUser(customerId, customerEm);
        const saveUser = customerCheck[0].id;
        const saveEmail = customerCheck[0].email;
        
        if(customerId !== saveUser || customerEm !== saveEmail) {
            return "No information found."
        }

        // Dao에서 제품 목록 가져오기
        const productL = await productDao.selectProduct();

        // 제품 목록 반환
        return productL;
    } catch (err) {
        // 에러 발생 시 에러를 던집니다.
        throw err;
    }
};


module.exports = { selectProduct };