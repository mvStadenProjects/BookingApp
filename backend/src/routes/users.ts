import express, { Request, Response } from "express";
import User from "../models/user";
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    //Gets a user by email
    let user = await User.findOne({
      email: req.body.email,
    });
    //  Check if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User(req.body);
    await user.save();
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});
