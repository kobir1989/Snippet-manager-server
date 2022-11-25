import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const Nabbar = () => {
  return (
    <div className="navbar">
      <h1>Snippet Manager</h1>

      <div className="nav__link">
        <Link to={"/login"}>
          <h2 className="link__text">Login</h2>
        </Link>
        <Link to={"/register"}>
          <h2 className="link__text">Register</h2>
        </Link>
      </div>
    </div>
  );
};

export default Nabbar;
