import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import "./style/index.scss";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import axios from "axios";
import {UserContextProvider} from "./Store/auth-context";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="container">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
