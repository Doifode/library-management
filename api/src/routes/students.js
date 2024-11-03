import express from "express";
import { deleteStudentById, getStudentById, registerStudent, updateStudent } from "../controllers/students.js";
const router = express.Router();

router.post("/", registerStudent);
router.put("/", updateStudent);
router.get("/:bookId", getStudentById);
router.delete("/:bookId", deleteStudentById);

export default router;