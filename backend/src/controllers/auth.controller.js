import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!password || !username || !email) {
      return res.status(400).json({ msg: "Fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        msg: "User created successfully",
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ msg: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!password || !email) {
      return res.status(400).json({ msg: "Fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      msg: "Logged in successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({msg: "Profile pic is required"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url},{new: true})
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile: ",error)
        res.status(500).json({msg: "Internal server error"})
    }
};

export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ",error.message);
        res.status(500).json({msg: "Internal server error"})
    }
}