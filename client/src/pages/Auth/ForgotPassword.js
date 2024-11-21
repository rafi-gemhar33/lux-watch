import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
        // navigate("/");/
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout title="Password-Reset">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h4 className="login-title">Password Reset</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Place of Birth"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="login-input"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
