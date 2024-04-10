
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const generateOtpAndRegisterMobile = async (req, res) => {
    try {
        let { mobile_number } = req.body;
        if (!mobile_number) {
            return res.status(400).send({ error: "mobile_number not provided" });
        }
        mobile_number = String(mobile_number);
        let OTP = mobile_number.slice(-4);
        let existingRecord = await User.findOne({ mobile_number });
        if (!existingRecord) {
            let record = await User.create({ mobile_number, otp: OTP });
            if (record) {
                return res.status(201).send({ message: 'One Time Password sent successfully.', otp: OTP });
            } else {
                return res.status(201).send({ message: 'something went wrong' });
            }
        }
        return res.status(201).send({ message: 'One Time Password sent successfully.', otp: OTP });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

export const verifyOtpAndVerifyUser = async (req, res) => {
    try {
        const { mobile_number, otp } = req.body;
        if (!mobile_number || !otp) {
            return res.status(400).send({ message: 'Mobile number or OTP not provided!' });
        }
        const user = await User.findOne({ mobile_number });
        if (!user) {
            return res.status(404).send({ message: 'Invalid mobile number!' });
        }
        if (otp != user.otp) {
            return res.status(404).send({ message: 'Invalid OTP!' });
        }
        await user.save();

        let token = generateTokenAndSetCookie(user._id, res);

        const record = {
            _id: user._id,
            full_name: user.full_name,
            is_profile_complete: user.is_profile_complete,
            mobile_number: user.mobile_number,
            profilePic: user.profilePic,
            token
        };
        return res.status(200).send({ message: 'OTP verified successfully', data: record });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

export const signup = async (req, res) => {
    try {
        const { full_name, mobile_number, gender } = req.body;
        const user = await User.findOne({ mobile_number });

        if (!user) {
            return res.status(400).send({ message: "Invalid mobile_number" });
        }

        if (user.is_profile_complete === true) {
            return res.status(200).send({ message: "Profile already completed" });
        }

        user.full_name = full_name;
        user.gender = gender;
        user.profilePic = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${mobile_number}` : `https://avatar.iran.liara.run/public/girl?username=${mobile_number}`;
        user.is_profile_complete = true;

        await user.save();

        let token = generateTokenAndSetCookie(user._id, res);

        res.status(201).send({
            _id: user._id,
            full_name: user.full_name,
            is_profile_complete: true,
            mobile_number: user.mobile_number,
            profilePic: user.profilePic,
            token
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
/*
export const login = async (req, res) => {
    try {
        const { mobile_number, otp } = req.body;
        const user = await User.findOne({ mobile_number });

        if (!user || user.otp != otp) {
            return res.status(400).send({ error: "Invalid mobile_number or OTP" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).send({
            _id: user._id,
            full_name: user.full_name,
            is_profile_complete: user.is_profile_complete,
            mobile_number: user.mobile_number,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
*/
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};
