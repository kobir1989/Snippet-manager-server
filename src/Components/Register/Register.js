import React, { useState } from "react";
import Nabbar from "../Nav/Nabbar";
import "./Register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const registerHandler = async (e) => {
    e.preventDefault();
    const registerData = {
      name,
      email,
      password,
      confirmPassword,
    };
    try {
      const response = await axios.post("http://localhost:5000/auth", { registerData });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errorMessage) {
          setErrorMsg(error.response.data.errorMessage);
        }
      }
    }
  };

  return (
    <div className="container">
      <Nabbar />
      <div className="auth__form">
        <form onSubmit={registerHandler}>
          <h2 className="form__title">Create a new account</h2>
          <ErrorMessage message={errorMsg} />
          <label htmlFor="user-name">Full name</label>
          <input
            type="text"
            name="user-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-create-account">
            Create Account
          </button>
          <p className="login-link">
            <Link to={"/login"}>Already Have an account? Click here.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
