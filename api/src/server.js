import cors from "cors";
import env from "dotenv";
import express from "express";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/book.js";
import userRouter from "./routes/user.js";
import studentRoute from "./routes/students.js";
import studentBookMapRoute from "./routes/bookStudentMap.js";
import { errorHandler } from "./utils/ErrorHandler.js";
import { isAuthenticated } from "./utils/middlewares/isAuthenticated.js"
env.configDotenv({ path: "./env" });

// import statements 
const app = express();
app.use(express.json({ limit: '10mb' }));  // Set limit as per your requirements
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/book/", bookRouter);
app.use("/api/student/", isAuthenticated, studentRoute);
app.use("/api/studentBookMap/", isAuthenticated, studentBookMapRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 2304, () => {
    try {
        console.log("server running on port", process.env.PORT);
    } catch (error) {
        console.log(error);
    }
});