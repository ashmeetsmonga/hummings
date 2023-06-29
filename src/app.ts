import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { connectDB } from "./config/config";
import userRouter from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";

dotenv.config();
const app = express();

app.use(express.json());

//routes
app.use("/api", userRouter);

// Health Check
app.get("/ping", (req, res) => res.status(200).json({ message: "API working..." }));

//Error handling
app.use(errorMiddleware);

// Not found
app.use((req, res, next) => {
	res.status(404).json({ message: "Not found..." });
});

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		app.listen(port, () => console.log(`Server is listening on port ${port}...`));
		await connectDB(process.env.MONGO_URI as string);
		console.log("DB Connected");
	} catch (error) {
		console.log(error);
	}
};

start();
