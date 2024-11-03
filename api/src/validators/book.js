import { z } from "zod";

export const registerBookValidator = z.object({
    "bookName": z.string(({ message: "Please enter bookName." })).max(255).min(1, "Please enter BookName."),
    "author": z.string(({ message: "Please enter author." })).max(255).min(1, "Please enter author."),
    "quantity": z.number(({ message: "Please enter quantity." })).max(25).min(1, "Please enter quantity."),
});