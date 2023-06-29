import { string } from "joi";
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser {
	username: string;
	password: string;
	email: string;
}

interface IUserMethods {
	createJWT(): string;
}

export interface IUserModel extends IUser, IUserMethods, Document {}

const UserSchema: Schema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (this: IUserModel) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, {
		expiresIn: "30d",
	});
	return token;
};

export default mongoose.model<IUserModel>("User", UserSchema);
