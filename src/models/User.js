import mongoose from "mongoose";



const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		firstName: { type: String },
		lastName: { type: String },
		email: { type: [String], lowercase: true, required: true},
		phoneNumber: { type: [String], unique: true, required: true},
		imageUrl: { type: String },
		clerkUserId: { type: String, required:true}
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;