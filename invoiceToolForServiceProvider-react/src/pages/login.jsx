import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin} className="login-register-form">
      
        <input type="email" placeholder="Enter email" value={email} className="user-form-value" onChange={(e) => setEmail(e.target.value)} required/>
      
        <input type="password"placeholder="Enter password" value={password} className="user-form-value"onChange={(e) => setPassword(e.target.value)} required/>
        
        <button type="submit" className="btn-login-register">Login</button>
        
        <div id="create-account-wrap">
          <p>Don't have an account? <a href="./register" className="btn-account-wrap">Register here</a></p>
        </div>
      
      </form>
    </div>
  );
};

export default Login;
