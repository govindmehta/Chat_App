import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  //toggle between signin and signup
  const [currState, setCurrState] = useState("Sign Up");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currState === "Sign In") {
        const response = await axios.post("http://localhost:3000/api/auth/login", {
          email,
          password,
        },{ withCredentials: true });
        
        console.log("Login response:", response.data);
        navigate("/chat")
        // localStorage.setItem("token", response.data.token);
      } else {
        const response = await axios.post("http://localhost:3000/api/auth/signup", {
          username,
          email,
          password,
        },{ withCredentials: true });
        console.log("Sign Up response:", response.data);
        navigate("/chat");
      }
    } catch (error) {
      console.error(
        "Error during authentication:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="Logo" className="logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{currState}</h2>
        {currState === "Sign In" ? null : (
          <input
            type="text"
            placeholder="username"
            className="form-input"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="email address"
          className="form-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{currState}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Sign In")}>Click here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Don't have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
