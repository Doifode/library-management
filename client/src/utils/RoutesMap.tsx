import { Route, Routes } from "react-router-dom"
import Login from "../auth/Login"
import BookList from "../book/BookList"
import StudentList from "../students/StudentsList"
import ProtectedRoute from "./ProtectedRoute"
import AssignBookList from "../assignBook/AssignBookList"

const RouteMap = () => {
    return (<>
        <Routes>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<BookList />} path="/books"></Route>
            <Route element={<ProtectedRoute><StudentList /></ProtectedRoute>} path="/students"></Route>
            <Route element={<ProtectedRoute><AssignBookList /></ProtectedRoute>} path="/student-books"></Route>
            <Route element={<ProtectedRoute><BookList /></ProtectedRoute>} path="*"></Route>
        </Routes>
    </>
    )
}

export default RouteMap