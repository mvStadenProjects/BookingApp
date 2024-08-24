import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

//Creates a new express app
const app = express();

app.use(cookieParser());

//Helps convert the body of api requests into json automatically
app.use(express.json());

//Helps us parse the url
app.use(express.urlencoded({ extended: true }));

//Cors is a security measure it will prevent requests from certain urls if it doesnt agree with it.
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//Dummy end point
// app.get("/api/test", async (req: Request, res: Response) => {
//   res.json({ message: "Hello from express endpoint" });
// });
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//start the server
/* 7000 -> port number */
app.listen(7000, () => {
  console.log("Server is ruuning on localhost:7000");
});
