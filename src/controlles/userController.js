const userService = require("../services/userService");

// 회원가입
const signup = async(req, res) => {
    
    const {email, password, name, phoneNumber, birthDay, address} = req.body

    try { 
        // 요청 정보 확인
        if(!email || !password || !name || !phoneNumber || !birthDay || !address){
            return res.json({message : "Key_error"})
         }
        const result = await userService.signup(email, password, name, phoneNumber, birthDay, address);
        
        return res.json({message : "created_success"});

    }catch(err){
       return res.json({message : "created_fail"});
    }
}

module.exports = {
    signup
}