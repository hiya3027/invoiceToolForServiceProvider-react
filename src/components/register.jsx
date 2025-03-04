{/*import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleRegister(e) {
        e.preventDefault();
        console.log("Registered with:", name, email, password);
        navigate("/login");
    }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={name}
          onChange={(e) => setName(e.target.value)} required/>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
  */}
