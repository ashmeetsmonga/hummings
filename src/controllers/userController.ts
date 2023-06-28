import { Request, Response } from "express";
import { registerUserService } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	try {
		const user = await registerUserService(username, email, password);
		return res.status(201).json(user);
	} catch {
		return res.status(404).json({ message: "Error occured while registering user" });
	}
};
