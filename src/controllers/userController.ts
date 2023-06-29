import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const { user, token } = await registerUserService(email, password);
		return res.status(201).json({ user, token });
	} catch (error: any) {
		return res.status(400).json({ message: error.message });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const { user, token } = await loginUserService(email, password);
		return res.status(200).json({ user, token });
	} catch (error: any) {
		return res.status(400).json({ message: error.message });
	}
};
