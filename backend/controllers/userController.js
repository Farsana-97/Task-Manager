import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
  const { username,email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res.json({ error: "Username already registered" });
    }

    const mail = await userModel.findOne({ email });
    if (mail) {
      return res.json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ message: "User created successfully", newUser });
  } catch (error) {
    res.json({ error });
  }
};



export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({ error: "No user found" });
    }

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id,},
      process.env.SECRET
    );
    res.json({ message: "User Logged In Successfully", token});
  } catch (error) {
    res.json({ error });
  }
};
