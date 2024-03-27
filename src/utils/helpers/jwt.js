const { compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../../config');
const crypto = require("crypto");

exports.compareBcryptHash = (inputHash, savedHash) => {
    try {
        return compareSync(inputHash, savedHash);
    } catch (error) {
        return false
    }
}

exports.generateJwtToken = (data) => {
    console.log(data)
    const token = jwt.sign({ ...data }, JWT_SECRET_KEY)
    return token
}

exports.generateAccountSecretKey = () => {
    const id = crypto.randomBytes(16).toString("hex");
    return id
}