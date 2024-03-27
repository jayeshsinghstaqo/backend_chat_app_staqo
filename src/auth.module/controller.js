// const { UserModel } = require("../models/app/User")
// const { generateAccountSecretKey, compareBcryptHash, generateJwtToken } = require("../utils/helpers/jwt")
// const { _auth_module } = require("../utils/helpers/messages")
// const { serviceResponse } = require("../utils/services/service_response")

// exports.createAccount = async (req, res) => {
//     try {
//         const { email, company_name, user_name, password } = req.body

//         let accounts = await UserModel.find({}).select("_id user_name")

//         if (UserModel.some((item) => item.user_name === user_name)) {// check company_name 
//             return res.json(new serviceResponse({ status: 400, error: _auth_module.allReadyExist("user name") }))
//         }

//         // Generate secret key for the organization
//         let secret_key = true, is_valid_key = false;
//         while (!is_valid_key) { // Ensure unique key
//             secret_key = generateAccountSecretKey()
//             if (!UserModel.some((item) => item.secret_key === secret_key)) {
//                 is_valid_key = true
//             }
//         }

//         let account = Accounts({ email, company_name, user_name, password, secret_key })
//         account.createdBy = account._id
//         await account.save()

//         let respConfig = {
//             email,
//             password,
//             user_name,
//             company_name,
//             secret_key
//         }

//         return res.json(new serviceResponse({ status: 200, message: _auth_module.created("Account"), data: respConfig }))
//     } catch (error) {
//         return res.json(new serviceResponse({ status: 500, error: error.message }))
//     }
// }

// exports.loginAccount = async (req, res) => {
//     try {
//         const { user_name, password } = req.body

//         const account = await UserModel.findOne({ user_name, deleteAt: null })
//         if (!account) {
//             return res.status(200).send(new serviceResponse({ status: 400, error: _auth_module.unAuth }))
//         }

//         const checkPassword = compareBcryptHash(password, account.password)
//         if (!checkPassword) {
//             return res.status(200).send(new serviceResponse({ status: 400, error: _auth_module.unAuth }))
//         }

//         const token = generateJwtToken({
//             email: account.email,
//             account_id: account._id,
//             company_name: account.company_name
//         })

//         let respConfig = {
//             token,
//             user_name: account.user_name,
//             company_name: account.company_name
//         }

//         return res.json(new serviceResponse({ status: 200, message: _auth_module.login, data: respConfig }))
//     } catch (error) {
//         return res.json(new serviceResponse({ status: 500, error: error.message }))
//     }
// }