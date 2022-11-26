import React, { useContext, useState } from "react";
import Nabbar from "../Nav/Nabbar";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Store/auth-context";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { loginData });
      await getUser();
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errorMessage) {
          setErrorMsg(error.response.data.errorMessage);
        }
      }
      return;
    }
  };

  return (
    <div className="container">
      <Nabbar />
      <div className="login__form">
        <form onSubmit={loginHandler}>
          <h2 className="form__title">Login to your account</h2>
          {errorMsg && <ErrorMessage message={errorMsg} />}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
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
