import express from "express";
import { deleteBookById, getBookById, registerBook, updateBook } from "../controllers/book.js";
import { deleteStudentBookMapById, registerStudentBookMap } from "../controllers/bookStudentMap.js";
const router = express.Router();

router.post("/", registerStudentBookMap);
router.put("/", updateBook);
router.get("/:studentBookMapId", getBookById);
router.delete("/:studentBookMapId", deleteStudentBookMapById);

export default router;