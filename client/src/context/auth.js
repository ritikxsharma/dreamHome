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
    axios.defaults.headers.common["Authorization"] = auth?.token
    axios.defaults.headers.common["refresh_token"] = auth?.refreshToken

    axios.interceptors.response.use( 
        (res) =>{
            return res
        }, 
        async(err) => {
            const originalConfig = err.config

            if(err.response){
                if(err.response.status === 401 && !originalConfig._retry){
                    originalConfig._retry = true
                    console.log("refreshing the token");
                    
                    try {
                        const res = await axios.get("/refresh-token")
                        axios.defaults.headers.common["token"] = res.data.token
                        axios.defaults.headers.common["refresh_token"] = res.data.refreshToken

                        setAuth(res.data)
                        localStorage.setItem("auth", JSON.stringify(res.data))
                        console.log("token refreshed");
                        return axios(originalConfig)
                    } catch (error) {
                        if(error.response && error.response.data){
                            return Promise.reject(error.response.data)
                        }
                    }
                }
                if(err.response.status === 403 && err.response.data){
                    return Promise.reject(err.response.data)
                }
            }

            return Promise.reject(err)
        }
    )

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
