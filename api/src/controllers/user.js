import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerUserValidator } from "../validators/user.js";
import bcryptjs from "bcryptjs"

export const registerUser = async (req, res, next) => {
    try {
        const error = registerUserValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { mobile, email, userName, password } = req.body;
        const hashPassword = bcryptjs.hashSync(password, 10);
        const registerUserQuery = `CALL REGISTER_USER( '${mobile}','${email}','${userName}','${hashPassword}')`;
        DB.query(registerUserQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "User registered successfully!", 200,);
        });
    } catch (error) {
        return next(error)
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const error = registerUserValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { mobile, email, userName, userId, } = req.body;
        const registerUserQuery = `CALL UPDATE_USER_BY_ID('${userName}' ,'${mobile}','${email}','${userId}')`;
        DB.query(registerUserQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "User registered successfully!", 200, result);
            } else {
                return ResponseHandler.error(res, "Something went wrong.", 200)
            }
        });
    } catch (error) {
        return next(error)
    }
};
