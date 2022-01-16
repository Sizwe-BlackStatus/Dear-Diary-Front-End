import React, { useState } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [usernameReg, setUserNameReg] = useState("");
  const [emailReg, setemailReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");

  let navigate = useNavigate();

  function registration() {
    if (!!usernameReg && !!emailReg && !!passwordReg) {
      axios
        .post("https://deary-diary-backend.herokuapp.com/auth", {
          username: usernameReg,
          email: emailReg,
          password: passwordReg,
        })
        .then((response) => {
          if(typeof response.data === 'object'){
            alert('User already exists!')
          }
          else {
            navigate("/login");
          }
        })
    }
  }

  return (
    <div className="registerContainer">
      <div className="CreateDiaryAccSection">
        <h1>dear diary...</h1>
        <p>sign up to dear diary</p>
      </div>
      <div className="registrationSection">
        <div className="intro">
          <h1>sign up</h1>
          <p>
            already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className="form">
          <input
            type="text"
            onChange={(e) => {
              setUserNameReg(e.target.value);
            }}
            name="fullname"
            placeholder="User Name"
          />
          <input
            type="email"
            onChange={(e) => {
              setemailReg(e.target.value);
            }}
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setpasswordReg(e.target.value);
            }}
            name="password"
            placeholder="Password"
          />
          <button type="submit" onClick={registration}>
            sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
