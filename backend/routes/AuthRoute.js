import express from "express";
import { Login, Me, Logout, Register } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/register", Register);

export default router;
