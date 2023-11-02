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
//로그인
const login = async(req, res) => {

    const {email, password} = req.body;
    try{

        if(!email || !password){
             return res.json({message : "key_error"});
        }

        const result = await userService.login(email, password);

        if(result === false){
            throw error;
        }

        return res.json({accsessToken : result, message : "login_success"});

    }catch(err){
        return res.json({message : "login_fail"})
    }
}

module.exports = {
    signup, login
}