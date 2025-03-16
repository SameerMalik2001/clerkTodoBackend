import mongoose from "mongoose";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const getUserById = async (id) => {
	const isPresent = await User.findOne({ clerkUserId: id });
	if (isPresent) {
		return isPresent;
	}
	throw new Error("User not found");
};

export const addUser = async (username, firstName, lastName, phoneNumber, email, imageUrl, clerkUserId) => {
	try {
		let objectUser = {
			username,
			imageUrl,
			email,
			phoneNumber,
			clerkUserId,
		};

		if (![undefined, null, ""].includes(firstName)) {
			objectUser.firstName = firstName;
		}
		if (![undefined, null, ""].includes(lastName)) {
			objectUser.lastName = lastName;
		}

		const user = new User(objectUser);

		await user.save();
		return user;
	} catch (error) {
		throw new Error("Error adding user: " + error.message);
	}
};

export const updateUser = async (id, firstName, lastName, phoneNumber, email, imageUrl, username) => {
	try {
		let objectUser = {
			phoneNumber,
			email,
			imageUrl,
			username,
		};

		if (![undefined, null, ""].includes(firstName)) {
			objectUser.firstName = firstName;
		}
		if (![undefined, null, ""].includes(lastName)) {
			objectUser.lastName = lastName;
		}

		// update existing user with id
		const updatedUser = await User.findOneAndUpdate({ clerkUserId: id }, objectUser, { new: true });
		if (updatedUser) {
			return true;
		}
		return false;
	} catch (error) {
		throw new Error("Error adding user: " + error.message);
	}
};

export const deleteUser = async (id) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// find user with associated clearkuserId
		const U = await User.findOne({ clerkUserId: id });
		if (!U) {
			await session.abortTransaction();
			session.endSession();
			return false;
		}

		const objectId = new mongoose.Types.ObjectId(U._id);

		// Delete user
		const user = await User.findByIdAndDelete(objectId, { session });
		if (!user) {
			await session.abortTransaction();
			session.endSession();
			return false;
		}

		// Delete todos associated with the user
		await Todo.deleteMany({ UserId: objectId }, { session });

		// Commit transaction
		await session.commitTransaction();
		session.endSession();

		return true;
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error("Error deleting user:", error);
		return false;
	}
};
