import express from "express";
import { registerUser } from "../controllers/userController";
import { Schemas, validateSchema } from "../middlewares/ValidateSchema";

const userRouter = express.Router();

userRouter.route("/register").post(validateSchema(Schemas.user.register), registerUser);

export default userRouter;
