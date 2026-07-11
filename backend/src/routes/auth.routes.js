import express from "express";
import {signup, login, logout, updateProfile,checkAuth} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

//protected route

router.post("/updateprofile",protectRoute,updateProfile);
router.get("/check",protectRoute,checkAuth);

export default router;
