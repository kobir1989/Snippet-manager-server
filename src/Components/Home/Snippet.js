import React from "react";
import axios from "axios";
import "./Snippet.scss";

const Snippet = ({ snippet, getSnippet, onEditSnippet }) => {
  const deleteSnippetHandler = async () => {
    try {
      if (window.confirm("Do you want to delete this snippet?")) await axios.delete(`http://localhost:5000/snippet/${snippet._id}`);
      getSnippet();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="snippet">
      {snippet.title && <h2 className="title">{snippet.title}</h2>}
      {snippet.description && <p className="description">{snippet.description}</p>}
      {snippet.code && (
        <pre className="code">
          <code>{snippet.code}</code>
        </pre>
      )}
      <button
        className="btn btn-edit"
        onClick={() => {
          onEditSnippet(snippet);
        }}
      >
        Edit
      </button>
      <button className="btn btn-delete" onClick={deleteSnippetHandler}>
        Delete
      </button>
    </div>
  );
};

export default Snippet;
