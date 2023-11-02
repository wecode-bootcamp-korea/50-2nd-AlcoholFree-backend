const userService = require("../services/userService");

//로그인
const login = async(req, res) => {

    const {email, password} = req.body;
    try{
        const result = await userService.login(email, password);
        console.log(result)
        // const token = ""

        if(result === false){
            return res.json({message : "user_not_found"})
        }else{
            // token = result;
            return res.json({accsessToken : result, message : "login_success"});
        }

    }catch(err){
        console.log(err)
        return res.json({message : "login_fail"})
    }
}

module.exports = {
     login
}