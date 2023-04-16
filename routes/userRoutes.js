import express from "express";
import router from express.Router();
import { signup_user, user_login, delete_user } from "../controllers/UserController.js";
import checkUser from "../middleware/check-user.js";

router.post("/signup", signup_user);

router.post("/login", user_login);

router.delete("/:userId", checkUser, delete_user);

export default router;
