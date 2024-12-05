import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_API } from '../config'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        refreshToken: ""
    })

    useEffect(() => {
        let fromLS = localStorage.getItem("auth")
        if(fromLS)  setAuth(JSON.parse(fromLS))
    }, [])

    axios.defaults.baseURL = SERVER_API

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {
    useAuth,
    AuthProvider
}
