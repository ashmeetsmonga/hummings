import { Document } from "mongoose";
import User, { IUserModel } from "../models/User";

export const registerUserService = async (
	username: string,
	email: string,
	password: string
): Promise<Document<IUserModel>> => {
	const user = await User.create({ username, email, password });
	return user;
};
