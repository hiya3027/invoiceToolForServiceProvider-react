import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(name, email, password);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleRegister} className="login-register-form">

        <input type="text" placeholder="Name" value={name} className="user-form-value"
          onChange={(e) => setName(e.target.value)} required/>

        <input type="email" placeholder="Email" value={email} className="user-form-value"
          onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" value={password} className="user-form-value" onChange={(e) => setPassword(e.target.value)}required/>

        <button type="submit"className="btn-login-register">Register</button>

        <div id="create-account-wrap">
          <p className="">Already registered? <a href="./login" className="btn-account-wrap">Login</a></p>
        </div>

      </form>
    </div>
  );
};

export default Register;
