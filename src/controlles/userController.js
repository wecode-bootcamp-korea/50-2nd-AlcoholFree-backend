const userService = require("../services/userService");


// 회원가입
const signup = async(req, res) => {
    
    const {email, password, name, phoneNumber, birthDay, address} = req.body

    try { 
        // 요청 정보 확인
        if(!email || !password || !name || !phoneNumber || !birthDay || !address){
            return res.json({message : "Key_error"});
         }
        const result = await userService.signup(email, password, name, phoneNumber, birthDay, address);


        if(result === false){
            return res.json({message : "email이 중복 됩니다."});
        }
        return res.json({message : "created_success", result});
        
    }catch(err){
        return res.json({massage : err})
    }
}


//로그인
const login = async(req, res) => {

    const {email, password} = req.body;
    try{
        const result = await userService.login(email, password);
        const token = ""

        if(result === false){
            return res.json({message : "USER_NOT_FOUND"})
        }else{
            const token = result;
            return res.json({accsessToken : result, message : "LOGIN_SUCCESS"});
        }
        return res.json({accsessToken : result});
    }catch(err){
        return res.json({message : err})
    }

}

module.exports = {
     
     signup ,login
}

