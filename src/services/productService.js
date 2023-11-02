const productDao = require('../models/productDao');
const bcrypt = require("../middlewares/bcrypt");
const token = require("../middlewares/verfiyToken");



const selectProduct = async (customerInformation) => {
    try {

        const customerId = customerInformation.id;
        const customerEm = customerInformation.email;

        const customerCheck = await productDao.realUser(customerId, customerEm);
        const saveUser = customerCheck[0].id;
        const saveEmail = customerCheck[0].email;

        if (customerId !== saveUser || customerEm !== saveEmail) {
            return "No information found."
        }

        const productL = await productDao.selectProduct();

        return productL;
    } catch (err) {
        throw err;
    }
};


module.exports = { selectProduct };