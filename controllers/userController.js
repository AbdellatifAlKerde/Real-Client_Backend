import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users";

export const signup_user = async (req, res, next) => {
  try {
    const users = await User.find({ email: req.body.email }).exec();
    if (users.length >= 1) {
      return res.status(409).json({
        message: "Mail exists",
      });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });
      await user.save();
      console.log(result);
      res.status(201).json({
        message: "User Created",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const user_login = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email }).exec();
    console.log("user", user);
    if (user.length < 1) {
      res.status(401).json({
        message: "Auth Failed",
      });
    }
    const result = await bcrypt.compare(req.body.password, user[0].password);
    if (result) {
      const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0]._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        message: "Auth Successful",
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Auth Failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export const delete_user = async (req, res, next) => {
  try {
    const result = await User.remove({ _id: req.params.userId }).exec();
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
