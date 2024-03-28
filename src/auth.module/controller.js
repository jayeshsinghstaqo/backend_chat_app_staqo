const { UserModel } = require("../models/app/User")
const { generateAccountSecretKey, compareBcryptHash, generateJwtToken } = require("../utils/helpers/jwt")
const { _auth_module } = require("../utils/helpers/messages")
const { otpGenerator } = require("otp-generator");
const { serviceResponse } = require("../utils/services/service_response")

exports.generateOtpAndRegisterMobile = async (req, res) => {
    try {
        let { mobile_number } = req.body;
        if (!mobile_number) {
            return res.json(new serviceResponse({ status: 404, message: 'Mobile number not provided!' }))
        }
        //    let OTP = otpGenerator.generate(4, {digits: true, alphabets: false, upperCase: false, specialChars: false});
        let OTP = mobile_number.slice(-4);
        let existingRecord = UserModel.findOne({ mobile_number });
        if (!existingRecord) {
            let record = UserModel({
                mobile_number,
                otp: OTP
            })
            await new record.save()
        }
        return res.json(new serviceResponse({ status: 201, data: { otp: OTP }, message: 'One Time Password sent successfully.' }))
    } catch (error) {
        return res.json(new serviceResponse({ status: 500, error: error.message }))
    }
}

exports.verifyOtpAndVerifyUser = async (req, res) => {
    try {
        const { mobile_number, otp } = req.body;
        if (!mobile_number || !otp) {
            return res.json(new serviceResponse({ status: 400, message: 'Mobile number or OTP not provided!' }));
        }
        const user = await UserModel.findOne({ mobile_number });
        if (!user) {
            return res.json(new serviceResponse({ status: 404, message: 'Invalid mobile number!' }));
        }
        if (otp !== user.otp) {
            return res.json(new serviceResponse({ status: 404, message: 'Invalid OTP!' }));
        }
        return res.json(new serviceResponse({ status: 201, data: user, message: 'OTP verified successfully' }));
    } catch (error) {
        return res.json(new serviceResponse({ status: 500, error: error.message }))
    }
}

exports.completeProfile = async (req, res) => {

}