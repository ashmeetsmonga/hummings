import { Request, Response } from "express";
import { registerUserService } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	try {
		const user = await registerUserService(username, email, password);
		return res.status(201).json(user);
	} catch (error: any) {
		return res.status(400).json({ message: error.message });
	}
};
