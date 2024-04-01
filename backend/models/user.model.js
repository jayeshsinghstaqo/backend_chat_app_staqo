import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
			required: false,
		}, mobile_number: {
			type: String,
			required: true
		}, is_profile_complete: {
			type: Boolean,
			default: false
		},
		otp: {
			type: String,
			required: true
		},
		gender: {
			type: String,
			required: false,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			required: false,
			default: "",
		}
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("staqo_user", userSchema);

export default User;
