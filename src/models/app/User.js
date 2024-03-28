const mongoose = require('mongoose');
const { _app_collections } = require('../../utils/constants/model');

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    mobile_number: {
        type: String,
        required: true
    },
    is_profile_complete: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'transgender']
    },
    deletedAt: {
        type: Date,
        default: null
    },
}, { timestamps: true })

const UserModel = mongoose.model(_app_collections.user, UserSchema)

module.exports = { UserModel }
