const { json } = require("express");
const userService = require("../services/userService");

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
     login
}