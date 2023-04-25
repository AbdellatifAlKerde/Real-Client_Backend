import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../controllers/authController.js";
import jwt from "jsonwebtoken";

//get all users
export const getAllUsers = (req, res, next) => {
  User.find()
    .then((response) => {
      console.log(response);
      res.status(200).send({ success: true, response });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//get an user by id
export const getUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//User Registration
export const signup_user = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(409).json({
        message: "Mail exists",
      });

    if (!req.body.password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });
    await newUser
      .save()
      .then((response) => {
        res
          .status(201)
          .json({ success: true, response, message: "User Created" });
      })
      .catch((err) => {
        res.status(400).json({ success: false, err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

//User login
export const user_login = async (req, res, next) => {
  try {
    // Check if email and password are provided
    const { email, password } = req.body;

    // Check if email exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    // const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    const role = "user";

    // Generate and send authentication token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: role,
    }); // Customize token payload as needed
    res.cookie("userToken", token); // Set the token as a cookie, or send it in the response body as needed
    res.json({ id: user._id, email: user.email, role, token });
  } catch (error) {
    next(error);
  }
};

//update a user by id
export const editUser = (req, res, next) => {
  let { id } = req.params;
  let body = req.body;
  User.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then((response) => {
      res.status(200).send({
        success: true,
        response,
        message: "User updated successfully!",
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//delete user
export const delete_user = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      result,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
