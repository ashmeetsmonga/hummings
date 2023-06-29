import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { IUser } from "../models/User";

export const validateSchema = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			return res.status(422).json({ message: error });
		}
	};
};

export const Schemas = {
	user: {
		register: Joi.object<IUser>({
			email: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},
};
