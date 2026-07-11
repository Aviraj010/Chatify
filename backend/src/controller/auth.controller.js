
import { generateToken } from "../lib/utils.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
   if(!fullName || !email || !password){
    return res.status(400).json({
        message: "Please fill all the fields",
    });
   }
    try {
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullName,
            email,
            password: hashedPassword,
        });

        generateToken(newUser._id, res);

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields",
        });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
            message: "logged in successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const logout = async(req, res) => {
    
  try{
    res.cookie("jwt", "", {maxAge: 0,});
    res.status(200).json({
        message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Internal server error",
    });
  }
}  

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({
        message: "Please provide a profile picture",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
      width: 150,
      height: 150,
      crop: "fill",
    });

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { profilePic: uploadedImage.secure_url },
      { new: true }
    );

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log("Error in updateProfile controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
     res.status(200).json({
        _id: req.user._id,
        fullName: req.user.fullName
     });
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
