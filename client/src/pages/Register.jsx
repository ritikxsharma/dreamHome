import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(`pre-register`, { email, password });

      toast.success(
        res.data.message + ". Please check your email and activate account."
      );
      setLoading(false);
      navigate("/")
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Register</h1>

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
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary col-12 mb-4" disabled={loading}>
                {loading ? "Waiting" : `Register`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
