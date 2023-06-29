import { Document } from "mongoose";
import User, { IUserModel } from "../models/User";

export const registerUserService = async (
	email: string,
	password: string
): Promise<Document<IUserModel>> => {
	let user = await User.findOne({ email });
	if (user) throw new Error("Email already exists");

	const username = email.split("@")[0];
	user = await User.create({ username, email, password });
	return user;
};
