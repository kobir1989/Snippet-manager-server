import React from "react";
import axios from "axios";

const Snippet = ({ snippet, getSnippet, onEditSnippet }) => {

  const deleteSnippetHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/snippet/${snippet._id}`);
      getSnippet();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="snippet">
      {snippet.title && <h2>{snippet.title}</h2>}
      {snippet.description && <p>{snippet.description}</p>}
      {snippet.code && (
        <pre>
          <code>{snippet.code}</code>
        </pre>
      )}
      <button onClick={()=>{onEditSnippet(snippet)}}>Edit</button>
      <button onClick={deleteSnippetHandler}>Delete</button>
    </div>
  );
};

export default Snippet;
