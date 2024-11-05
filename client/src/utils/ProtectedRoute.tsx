import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./ContextProvider";

interface ProtectedRouteProps {
    children: React.ReactNode,
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { userDetails } = useContext(Context);
    console.log(userDetails, "userDetails")
    if ((!userDetails && window.location.pathname !== "/login")) {
        return <Navigate to={"/books"}></Navigate>
    };
    if ((window.location.pathname == "/login" && userDetails)) {
        return <Navigate to={"/books"}></Navigate>
    };


    return (<>{children}</>)
}

export default ProtectedRoute