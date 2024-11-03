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
            return ResponseHandler.success(res, "User registered successfully!", 200, `${activateUrl}/${result[0][0].activationToken}`);
        });
    } catch (error) {
        return next(error)
    }
};

export const getUsersByShopId = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        const userId = req.user.userId
        const getUsersByShopIdQuery = `CALL GET_USERS_BY_SHOP_ID(${shopId},${userId})`
        DB.query(getUsersByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const shopId = req.query.shopId;
        const getUserByIdQuery = `CALL GET_USER_BY_ID(${userId},${shopId})`
        DB.query(getUserByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result[0].length) {
                return ResponseHandler.success(res, "", 200, result[0][0])
            } else {
                return ResponseHandler.error(res, "User not found.", 200)
            }
        });

    } catch (error) {
        next(error)
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
