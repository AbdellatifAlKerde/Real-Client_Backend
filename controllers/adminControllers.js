import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import validator from "email-validator";
import jwt from "jsonwebtoken";
// get all admins
export async function getAll(req, res, next) {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Paginate items using mongoose-paginate-v2
    const options = {
      page: pageNumber || 1,
      limit: limitNumber || 10,
    };

    const items = await Admin.paginate({}, options);

    // const admins = await Admin.find({});
    // res.status(200).json(admins);
    // Return paginated items as response
    return res.status(200).json({
      items: items.docs,
      totalPages: items.totalPages,
      currentPage: items.page,
      limit: items.limit,
      totalItems: items.totalDocs,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAdminById(req, res) {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(`Error getting user by ID: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}

//add admin
export async function post(req, res, next) {
  try {
    const { full_name, email, password } = req.body;

    // check if admin already exists
    const oldAdmin = await Admin.findOne({ email });

    if (oldAdmin) {
      return res.status(409).send("Admin already exists, please login");
    }

    // Create the admin
    const admin = await Admin.create({
      fullName: full_name,
      email: email,
      password: password,
    });
    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ admin, token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

export async function put(req, res, next) {
  let { id } = req.params;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const response = await Admin.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, response });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

//delete admin
export async function deleteOne(req, res, next) {
  let { id } = req.params;
  try {
    const oldAdmin = await Admin.findById(req.params.id);
    if (!oldAdmin) {
      return res.status(409).send({ message: "Admin does not exists" });
    }
    const response = await Admin.findOneAndDelete({ _id: id }, req.body, {
      new: true,
    });
    res
      .status(200)
      .send({ success: true, response, message: "Admin deleted successfully" });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    // Check if email and password are provided
    const { email, password } = req.body;
    // if (!email || !password) {
    //   return res
    //     .status(400)
    //     .json({ message: "Email and password are required" });
    // }

    // Check if email exists in database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isValidPassword = await admin.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // save admin token
    res.cookie("jwt", token);

    // Return response with token
    return res
      .status(200)
      .send({ message: "Login successfully", admin, token });
  } catch (error) {
    next(error);
  }
}

export function logOut(req, res) {
  res.clearCookie("jwt");
  return res.send("Log out successfully");
}

const controller = {
  getAll,
  post,
  getAdminById,
  put,
  deleteOne,
  login,
  logOut,
};

export default controller;
