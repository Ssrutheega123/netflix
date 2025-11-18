import express from "express";
import { signup, login, logout } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup", signup);   // expects JSON body
router.post("/login", login);     // expects JSON body
router.post("/logout", logout);

export default router;


