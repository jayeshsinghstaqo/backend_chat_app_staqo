// const express = require("express")
// const { createAccount, loginAccount } = require("./controller")
// const { body } = require("express-validator")
// const { validateErrors } = require("../utils/helpers/express_validator")
// const authRoutes = express.Router()

// authRoutes.post("/create", [
//     body("user_name", "Please enter user name.").not().isEmpty().trim(),
//     body("company_name", "Please enter company name.").not().isEmpty().trim(),
//     body("email", "Please enter company email.").not().isEmpty().trim(),
//     body("password", "Please enter password of atleast 8 length.").not().isEmpty().trim().isLength({ min: 8, max: 40 }),
// ], validateErrors, createAccount)

// authRoutes.post("/login",[
//     body("user_name", "Please enter company name.").not().isEmpty().trim(),
//     body("password", "Please enter password of atleast 8 length.").not().isEmpty().trim().isLength({ min: 8, max: 40 }),
// ], validateErrors,  loginAccount)

// module.exports = { authRoutes }

const express = require("express")
const { generateOtpAndRegisterMobile, verifyOtpAndVerifyUser } = require("./controller")
const { body } = require("express-validator")
const { validateErrors } = require("../utils/helpers/express_validator")
const authRoutes = express.Router()

authRoutes.post("/generate-otp", [
    body("mobile_number", "Please enter mobile number.").not().isEmpty().trim(),
], validateErrors, generateOtpAndRegisterMobile)

authRoutes.post("/verify-otp-and-login", [
    body("mobile_number", "Please enter mobile number.").not().isEmpty().trim(),
    body("otp", "Please enter otp of atleast 4 length.").not().isEmpty().trim().isLength({ min: 4, max: 4 }),
], validateErrors, verifyOtpAndVerifyUser)

module.exports = { authRoutes }