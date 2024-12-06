import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '../../context/auth'

const AccessAccount = () => {
    const [auth, setAuth] = useAuth()
    const { token } = useParams();

    const navigate = useNavigate()

  useEffect(() => {
    if(token) requesAccountAccess()
  }, [token])

  const requesAccountAccess = async() => {
    try {
        const res = await axios.post('/access-account', { resetCode: token })

        localStorage.setItem("auth", JSON.stringify(res.data))

        setAuth(res.data)

        toast.success("Account Accessed. Please update you password now!")

        navigate("/")
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong. Try again later."
        toast.error(errorMessage)
    }
  }

  return (
    <div
      className="display-3 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please Wait. Loading...
    </div>
  );
}

export default AccessAccount