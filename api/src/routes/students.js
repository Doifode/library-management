import express from "express";
import { deleteStudentById, getAllStudents, getStudentById, registerStudent, updateStudent } from "../controllers/students.js";
const router = express.Router();

router.post("/", registerStudent);
router.put("/", updateStudent);
router.get("/:studentId", getStudentById);
router.delete("/:studentId", deleteStudentById);
router.get("/", getAllStudents);

export default router;