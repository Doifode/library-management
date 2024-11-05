import React, { createContext, useEffect, useState } from "react";
import { ILoginDetails } from "../constants/Types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const Context = createContext<any>("");

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails") || "null"));

    const VerifyUser = async (values: ILoginDetails) => {
        try {
            const loginResponse = await axios.post("http://localhost:2304/api/auth/verifyUser", values);
            if (loginResponse.data.success) {
                localStorage.setItem("userDetails", JSON.stringify(loginResponse.data.data));
                setUserDetails(loginResponse.data.data);
                navigate('/books')
            } else {
                toast.error(loginResponse.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUserDetails(JSON.parse(localStorage.getItem("userDetails") || "null"))
    }, [])

    return (
        <Context.Provider value={{ userDetails, VerifyUser, setUserDetails }}>
            {children}
        </Context.Provider>

    )
}

export default ContextProvider
