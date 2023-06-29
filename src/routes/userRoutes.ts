import express from "express";
import { loginUser, registerUser } from "../controllers/userController";
import { Schemas, validateSchema } from "../middlewares/ValidateSchema";

const userRouter = express.Router();

userRouter.route("/register").post(validateSchema(Schemas.user.register), registerUser);
userRouter.route("/login").post(validateSchema(Schemas.user.login), loginUser);

export default userRouter;
