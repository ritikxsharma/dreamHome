import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post(`/forgot-password`, { email });
        console.log(res.data);
        
        toast.success("Please check email for password reset");
        setLoading(false);
        navigate("/")
      } catch (error) {
        console.log(error);
        
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>
  
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="form-control mb-4"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />  
                <button type="submit" className="btn btn-primary col-12 mb-4" disabled={loading}>
                  {loading ? "Waiting" : `Submit`}
                </button>
              </form>
            
              <Link className="text-danger" to="/login">Login</Link>
  
            </div>
          </div>
        </div>
      </div>
    );
}

export default ForgotPassword