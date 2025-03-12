import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            alert("Reset link sent to your email.");
        } catch (error) {
            alert("Error: " + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
                <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
