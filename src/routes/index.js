const express = require("express");
const router = express.Router();


const userRouter = require("./userRouter");
router.use("/users", userRouter.router);

const productRouter = require("./productRouter");
router.use("/product", productRouter.router)


module.exports = router;