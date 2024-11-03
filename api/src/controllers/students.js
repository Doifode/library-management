import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerStudentValidator } from "../validators/student.js";
import bcryptjs from "bcryptjs"

export const registerStudent = async (req, res, next) => {
    try {
        const error = registerStudentValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }

        const { firstName, lastName, prn, email, mobile, password ,username} = req.body;
        const hashPassword = bcryptjs.hashSync(password, 10);

        const registerStudentQuery = `CALL REGISTER_STUDENT( '${firstName}','${lastName}','${prn}','${email}','${mobile}','${username}','${password}')`;
        DB.query(registerStudentQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "Student registered successfully!", 200,);
        });
    } catch (error) {
        return next(error)
    }
};

export const getStudentsByShopId = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        const StudentId = req.Student.StudentId
        const getStudentsByShopIdQuery = `CALL GET_StudentS_BY_SHOP_ID(${shopId},${StudentId})`
        DB.query(getStudentsByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
};

export const getStudentById = async (req, res, next) => {
    try {
        const StudentId = req.params.StudentId;
        const getStudentByIdQuery = `SELECT * FROM StudentS WHERE StudentID = ${StudentId}`
        DB.query(getStudentByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result.length) {
                return ResponseHandler.success(res, "", 200, result[0])
            } else {
                return ResponseHandler.error(res, "Student not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const deleteStudentById = async (req, res, next) => {
    try {
        const StudentId = req.params.StudentId;
        const getStudentByIdQuery = ` CALL DELETE_Student(${StudentId})`
        DB.query(getStudentByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Student Deleted successfully.", 200, result[0])
            } else {
                return ResponseHandler.error(res, "Student not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        const error = registerStudentValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { firstName, lastName, prn, email, mobile, studentId } = req.body;
        const registerStudentQuery = `CALL UPDATE_STUDENT('${studentId}', '${firstName}','${lastName}','${prn}','${email}','${mobile}')`;
        DB.query(registerStudentQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Student updated successfully!", 200, result);
            } else {
                return ResponseHandler.error(res, "Something went wrong.", 200)
            }
        });
    } catch (error) {
        return next(error)
    }
};
