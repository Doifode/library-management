import { z } from "zod";

export const registerStudentValidator = z.object({
    "firstName": z.string(({ message: "Please enter first name." })).max(255).min(1, "Please enter first name."),
    "lastName": z.string(({ message: "Please enter last name." })).max(255).min(1, "Please enter last name."),
    "mobile": z.string(({ message: "Please enter mobile." })).max(25).min(1, "Please enter mobile."),
    "email": z.string(({ message: "Please enter email." })).max(25).min(1, "Please enter email."),
    "prn": z.string(({ message: "Please enter prn." })).max(25).min(1, "Please enter prn."),
});