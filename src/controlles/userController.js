const userService = require("../services/userService");


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
    login
}