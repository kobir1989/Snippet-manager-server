import axios from "axios";
import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const getUser = async () => {
    const userRes = await axios.get("http://localhost:5000/auth/loggedIn");
    setUser(userRes.data);
  };
  useEffect(() => {
    getUser();
  }, []);
  return <UserContext.Provider value={{user, getUser}}>{props.children}</UserContext.Provider>;
};

export default UserContext;
export { UserContextProvider };
