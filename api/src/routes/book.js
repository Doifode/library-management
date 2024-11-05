import express from "express";
import { deleteBookById, getAllBooks, getBookById, registerBook, updateBook } from "../controllers/book.js";
const router = express.Router();

router.post("/", registerBook);
router.put("/", updateBook);
router.get("/", getAllBooks);
router.get("/:bookId", getBookById);
router.delete("/:bookId", deleteBookById);

export default router;