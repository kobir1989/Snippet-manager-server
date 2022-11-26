import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Nav/Nabbar";
import axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "../SnippetEditor/SnippetEditor";
import "./Home.scss";
import UserContext from "../../Store/auth-context";
import Login from "../Login/Login";

const Home = () => {
  const [snippet, setSnippet] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);
  const { user } = useContext(UserContext);

  const getSnippet = async () => {
    try {
      const snippetData = await axios.get("http://localhost:5000/snippet/");
      setSnippet(snippetData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      setSnippet([]);
      return;
    } else {
      getSnippet();
    }
  }, [user]);

  const editSnippetHandler = (edit) => {
    console.log("Home-Component", edit);
    setEditSnippetData(edit);
    setOpenEditor(true);
  };

  const renderSnippets = () => {
    let sortedSnippet = [...snippet];
    sortedSnippet = sortedSnippet.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sortedSnippet.map((snippet, index) => <Snippet snippet={snippet} key={index} getSnippet={getSnippet} onEditSnippet={editSnippetHandler} />);
  };
  return (
    <div className="home">
      {user !== null ? (
        <>
          <Navbar />
          {!openEditor && (
            <button
              className="btn btn-add"
              onClick={() => {
                setOpenEditor(true);
              }}
            >
              Add Snippet
            </button>
          )}
          {openEditor && <SnippetEditor openEditor={setOpenEditor} getSnippet={getSnippet} editSnippetData={editSnippetData} />}
          {renderSnippets()}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
