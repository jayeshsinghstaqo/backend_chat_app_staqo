
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const generateOtpAndRegisterMobile = async (req, res) => {
    try {
        let { mobile_number } = req.body;
        if (!mobile_number) {
            return res.status(400).json({ error: "mobile_number not provided" });
        }
		mobile_number = String(mobile_number); 
        let OTP = mobile_number.slice(-4);
        let existingRecord = await User.findOne({ mobile_number });
        if (!existingRecord) {
            await User.create({
                mobile_number,
                otp: OTP
            });
        }
        return res.status(201).json({ message: 'One Time Password sent successfully.', otp: OTP });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const verifyOtpAndVerifyUser = async (req, res) => {
    try {
        const { mobile_number, otp } = req.body;
        if (!mobile_number || !otp) {
            return res.status(400).json({ message: 'Mobile number or OTP not provided!' });
        }
        const user = await User.findOne({ mobile_number });
        if (!user) {
            return res.status(404).json({ message: 'Invalid mobile number!' });
        }
        if (otp != user.otp) {
            return res.status(404).json({ message: 'Invalid OTP!' });
        }
        if (!user.is_profile_complete) {
            user.is_profile_complete = false;
            await user.save();
        }
        return res.status(200).json({ message: 'OTP verified successfully', user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const signup = async (req, res) => {
    try {
        const { full_name, mobile_number, otp, gender } = req.body;
        const user = await User.findOne({ mobile_number });

        if (!user || user.otp != otp) {
            return res.status(400).json({ error: "Invalid mobile_number or OTP" });
        }

        if (user.is_profile_complete === true) {
            return res.status(400).json({ error: "Profile already completed" });
        }

        user.full_name = full_name;
        user.gender = gender;
        user.profilePic = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${mobile_number}` : `https://avatar.iran.liara.run/public/girl?username=${mobile_number}`;
        user.is_profile_complete = true;

        await user.save();

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            full_name: user.full_name,
            is_profile_complete: user.is_profile_complete,
            mobile_number: user.mobile_number,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { mobile_number, otp } = req.body;
        const user = await User.findOne({ mobile_number });

        if (!user || user.otp != otp) {
            return res.status(400).json({ error: "Invalid mobile_number or OTP" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            full_name: user.full_name,
            is_profile_complete: user.is_profile_complete,
            mobile_number: user.mobile_number,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
