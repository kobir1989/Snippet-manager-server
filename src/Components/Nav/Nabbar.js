import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Store/auth-context";
import "./Nav.scss";

const Nabbar = () => {
  const { user, getUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await axios.get("http://localhost:5000/auth/logout");
    getUser();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <h1>
        <Link to={"/"}>Snippet Manager</Link>
      </h1>

      <div className="nav__link">
        {user === null ? (
          <>
            <Link to={"/login"}>
              <h2 className="link__text">Login</h2>
            </Link>
            <Link to={"/register"}>
              <h2 className="link__text">Register</h2>
            </Link>
          </>
        ) : (
          <button className="btn logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Nabbar;
