import express from "express";
import { registerUser, updateUser } from "../controllers/user.js";
const router = express.Router();

router.post("/", registerUser)
router.put("/", updateUser);



export default router;