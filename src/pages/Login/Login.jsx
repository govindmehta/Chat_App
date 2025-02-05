import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets.js";

const Login = () => {

const [currState,setCurrState] = useState("Sign Up")

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currState}</h2>
        {currState == "Sign In" ? null:<input
          type="text"
          placeholder="username"
          className="form-input"
          required
        />}
        <input
          type="email"
          placeholder="email address"
          className="form-input"
        />
        <input type="password" placeholder="password" className="form-input" />
        <button type="submit">{currState}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState == "Sign Up" ? <p className="login-toggle">Already have an account <span onClick={() => setCurrState("Sign In")}>click here</span></p>:<p className="login-toggle">Don't have an account <span onClick={() => setCurrState("Sign Up")}>click here</span></p>}
          
        </div>
      </form>
    </div>
  );
};

export default Login;
