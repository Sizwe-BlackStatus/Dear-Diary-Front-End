import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [userLogIn, setUserLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");
  let navigate = useNavigate();

  const login = () => {
    axios
      .post("https://deary-diary-backend.herokuapp.com/auth/login", {
        username: userLogIn,
        password: passwordLogIn,
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
        }
        navigate(`/home`);
      });
  };

  return (
    <div className="registerContainer">
      <div className="CreateDiaryAccSection">
        <h1>dear diary...</h1>
        <p>login to dear diary</p>
      </div>
      <div className="registrationSection">
        <div className="intro">
          <h1>login details</h1>
          <p>
            don't have an account?<Link to="/"> register</Link>
          </p>
        </div>
        <div className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserLogIn(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPasswordLogIn(e.target.value)}
          />
          <button type="submit" onClick={login}>
            login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
