import { Document } from "mongoose";
import User, { IUserModel } from "../models/User";

export const registerUserService = async (
	email: string,
	password: string
): Promise<{ user: string; token: string }> => {
	let user = await User.findOne({ email });
	if (user) throw new Error("Email already exists");

	const username = email.split("@")[0];
	user = await User.create({ username, email, password });
	const token = user.createJWT();
	return { user: user.username, token };
};

export const loginUserService = async (
	email: string,
	password: string
): Promise<{ user: string; token: string }> => {
	let user = await User.findOne({ email });
	if (!user) throw new Error("Invalid email");

	const isPasswordCorrect = user.checkPassword(password);
	if (!isPasswordCorrect) throw new Error("Invalid password");

	const token = user.createJWT();
	return { user: user.username, token };
};
