const productService = require('../services/productService');
//const bcrypt = require("../middlewares/bcrypt");
const verfiyToken = require("../middlewares/verfiyToken");

//메인


const selectProduct = async (req, res) => {
    try {
        const jwtToken = req.headers.token;
        const secretKey = process.env.SECRET_KEY;
        //console.log(jwtToken);
        if (!jwtToken) {//토큰 확인
            return res.status(401).json({ message: "Permission denied: No token provided" })
        }

        try {//토큰 유효성 검사
            const decode = jwt.verify(jwtToken, secretKey);
            const userEmail = decode.userEmail;

            //유효하면 제품 목록 가져오기
            const mainList = await productService.selectProduct();
            //데이터를 찾으면 상태 코드와 제품 목록을 json형식으로 클라이언트에 응답
            return res.status(200).json(mainList);
        } catch (err) {//에러 캐치하기
            console.error(err);
            //토큰이 유효하지 않을 경우 401상태 코드를 반환하고 클라이언트에 토큰 오류 메세지 응답
            return res.status(401).json({ message: "Token is invalid or expired" });
        }
    } catch (err) {//에러 캐치하기
        console.error(err);
        //에러 발생 시 500상태 코드를 반환하고 클라이언트에 서버 오류 메세지 응답
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { selectProduct };