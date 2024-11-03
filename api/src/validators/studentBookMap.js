import { z } from "zod";

export const registerStudentBookMapValidator = z.object({
    "studentId": z.number(({ message: "Please enter student id" })).max(255).min(1, "Please enter student id"),
    "bookId": z.number(({ message: "Please enter book id." })).max(255).min(1, "Please enter book id."),
});