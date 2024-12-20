import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        console.log(res.data?.message);

        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
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
    <Layout title="Login - Lux-Watch">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h4 className="login-title">LOGIN</h4>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password
          </Link>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
