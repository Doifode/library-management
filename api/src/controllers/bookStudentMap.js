import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerStudentBookMapValidator } from "../validators/StudentBookMap.js";

export const registerStudentBookMap = async (req, res, next) => {
    try {
        const error = registerStudentBookMapValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { studentId, bookId } = req.body;
        const registerStudentBookMapQuery = `CALL ASSIGN_BOOK_TO_STUDENT( '${bookId}','${studentId}' )`;
        DB.query(registerStudentBookMapQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "Book assigned to student successfully!", 200,);
        });
    } catch (error) {
        return next(error)
    }
};

export const getAllStudentBookMap = async (req, res, next) => {
    try {
        const getStudentBookMapByIdQuery = `CALL GET_ALL_ASSIGNED_BOOK()`
        DB.query(getStudentBookMapByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result.length) {
                return ResponseHandler.success(res, "", 200, result[0])
            } else {
                return ResponseHandler.error(res, "StudentBookMap not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const deleteStudentBookMapById = async (req, res, next) => {
    try {
        const studentBookMapId = req.params.studentBookMapId;
        const getStudentBookMapByIdQuery = `CALL MARK_BOOK_AS_RETURNED('${studentBookMapId}')`
        DB.query(getStudentBookMapByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Student Book Returned successfully.", 200, result[0])
            } else {
                return ResponseHandler.error(res, "Student Book record not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const updateStudentBookMap = async (req, res, next) => {
    try {
        const error = registerStudentBookMapValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { bookId, studentId, studentBookMapId, } = req.body;
        const registerStudentBookMapQuery = `CALL UPDATE_ASSIGNMENT( ${studentBookMapId},'${bookId}','${studentId}' )`;
        DB.query(registerStudentBookMapQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Student BookMap updated successfully!", 200, result);
            } else {
                return ResponseHandler.error(res, "Something went wrong.", 200)
            }
        });
    } catch (error) {
        return next(error)
    }
};
