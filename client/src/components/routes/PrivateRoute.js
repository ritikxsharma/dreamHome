import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

const PrivateRoute = () => {
    const [auth, setAuth] = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if(auth?.token) getCurrentUser()
    }, [auth?.user])

    const getCurrentUser = async() => {
        try {
            const res = await axios.get('/current-user', {
                headers: {
                    Authorization: auth?.token
                }
            })

            setOk(true)

        } catch (error) {
            setOk(false)
        }
    }

    return ok ? <Outlet /> : ""

}

export default PrivateRoute