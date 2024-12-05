import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '../../context/auth'

const AccountActivate = () => {
  
    const [auth, setAuth] = useAuth()
    const { token } = useParams();

    const navigate = useNavigate()

  useEffect(() => {
    if(token) requestActivation()
  }, [token])

  const requestActivation = async() => {
    try {
        const res = await axios.post('/register', { token })

        localStorage.setItem("auth", JSON.stringify(res.data))

        setAuth(res.data)

        toast.success("Successfully registered. Welcome!!")

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
};

export default AccountActivate;
