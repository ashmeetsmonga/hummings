import { string } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
	username: string;
	password: string;
	email: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
	{
		username: {
			type: string,
			required: true,
		},
		password: {
			type: string,
			required: true,
		},
		email: {
			type: string,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IUserModel>("User", UserSchema);
