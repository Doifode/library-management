import { z } from "zod";

export const registerUserValidator = z.object({
    "userName": z.string(({ message: "Please enter Username." })).max(100).min(1, "Please enter Username."),
    "password": z.string(({ message: "Please enter Shopid." })).min(1, "Please enter ShopId."),
    "mobile": z.string(({ message: "Please enter mobile no." })).max(25).min(1, "Please enter mobile no."),
    "email": z.string(({ message: "Please enter mobile no." })).max(25).min(1, "Please enter mobile no."),
});

export const resetPasswordValidator = z.object({
    "token": z.string(({ message: "Invalid link." })).max(36).min(1, "Invalid link."),
    "password": z.string(({ message: "Please enter Password." })).max(25).min(1, "Please enter Password."),
});