const productDao = require('../models/productDao');



//메인
const selectProduct = async () => {
    try {
        //Dao에서 제품 목록 가져오기
        const productL = await productDao.selectProduct();
        //제품 목록 반환하기
        return productL;
    } catch (err) {//에러 캐치하고 메세지 보여주지
        //console.error('제품 목록을 불러오는 중 에러가 발생했습니다:', err);
        throw err;//에러 던지기
    }
};

module.exports = { selectProduct };