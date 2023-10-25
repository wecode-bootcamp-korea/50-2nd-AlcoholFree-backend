const express = require("express");
const router = express.Router();
const userController = require("../controlles/userController");
const verfiyToken = require("../middlewares/verfiyToken")




module.exports = {
    router
}