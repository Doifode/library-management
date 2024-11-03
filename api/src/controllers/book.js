import DB from "../dbConnection.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { registerBookValidator } from "../validators/Book.js";

export const registerBook = async (req, res, next) => {
    try {
        const error = registerBookValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { bookName, author, quantity } = req.body;
        const registerBookQuery = `CALL REGISTER_BOOK( '${bookName}','${author}','${quantity}')`;
        DB.query(registerBookQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "Book registered successfully!", 200,);
        });
    } catch (error) {
        return next(error)
    }
};

export const getBooksByShopId = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        const BookId = req.Book.BookId
        const getBooksByShopIdQuery = `CALL GET_BookS_BY_SHOP_ID(${shopId},${BookId})`
        DB.query(getBooksByShopIdQuery, (error, result) => {
            if (error) return next(error);
            return ResponseHandler.success(res, "", 200, result[0])
        });
    } catch (error) {
        return next();
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const getBookByIdQuery = `SELECT * FROM BOOKS WHERE BOOKID = ${bookId}`
        DB.query(getBookByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result.length) {
                return ResponseHandler.success(res, "", 200, result[0])
            } else {
                return ResponseHandler.error(res, "Book not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const deleteBookById = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const getBookByIdQuery = ` CALL DELETE_BOOK(${bookId})`
        DB.query(getBookByIdQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Book Deleted successfully.", 200, result[0])
            } else {
                return ResponseHandler.error(res, "Book not found.", 200)
            }
        });

    } catch (error) {
        next(error)
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const error = registerBookValidator.safeParse(req.body);
        if (!error.success) {
            return ResponseHandler.error(res, error.error.issues[0].message, 400)
        }
        const { author, quantity, bookName, bookId, } = req.body;
        const registerBookQuery = `CALL UPDATE_BOOK(${bookId}, '${bookName}','${author}','${quantity}')`;
        DB.query(registerBookQuery, (error, result) => {
            if (error) return next(error);
            if (result.affectedRows) {
                return ResponseHandler.success(res, "Book updated successfully!", 200, result);
            } else {
                return ResponseHandler.error(res, "Something went wrong.", 200)
            }
        });
    } catch (error) {
        return next(error)
    }
};
