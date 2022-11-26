import React, { useContext, useState } from "react";
import Nabbar from "../Nav/Nabbar";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Store/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {getUser} = useContext(UserContext)
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    console.log(loginData);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { loginData });
      await getUser()
      if(response.status === 200){
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Nabbar />
      <div className="login__form">
        <form onSubmit={loginHandler}>
          <h2 className="form__title">Login to your account</h2>
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
          <button type="submit" className="btn btn-login">
            Login
          </button>
          <p className="register-link">
            <Link to={"/register"}>Don't have an account? Click here.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
