import express from "express";
import { deleteStudentBookMapById, getAllStudentBookMap, registerStudentBookMap, updateStudentBookMap } from "../controllers/bookStudentMap.js";
const router = express.Router();

router.post("/", registerStudentBookMap);
router.put("/", updateStudentBookMap);
router.get("/", getAllStudentBookMap);
router.delete("/:studentBookMapId", deleteStudentBookMapById);

export default router;