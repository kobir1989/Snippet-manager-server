import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SnippetEditor.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SnippetEditor = ({ openEditor, getSnippet, editSnippetData }) => {
  console.log(editSnippetData);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title);
      setEditorDescription(editSnippetData.description);
      setEditorCode(editSnippetData.code);
    }
  }, [editSnippetData]);

  const cancelBtnHandler = () => {
    setEditorTitle("");
    setEditorDescription("");
    setEditorCode("");
    openEditor(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const snippetInpuptData = {
      title: editorTitle,
      description: editorDescription,
      code: editorCode,
    };
    try {
      if (!editSnippetData) {
        await axios.post("http://localhost:5000/snippet/", { snippetInpuptData });
      } else {
        await axios.put(`http://localhost:5000/snippet/${editSnippetData._id}`, { snippetInpuptData });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errorMessage) {
          return setErrorMsg(error.response.data.errorMessage);
        }
      }
    }
    getSnippet();
    cancelBtnHandler();
    setEditorTitle("");
    setEditorDescription("");
    setEditorCode("");
  };

  return (
    <div>
      <div className="snippet-editor">
        <form onSubmit={submitHandler}>
          <ErrorMessage message={errorMsg} />
          <label htmlFor="editor-title">Title of your Snippet</label>
          <input
            type="text"
            name="editor-title"
            value={editorTitle}
            onChange={(e) => {
              setEditorTitle(e.target.value);
            }}
          />
          <label htmlFor="editor-description">Description</label>
          <input
            type="text"
            name="editor-description"
            value={editorDescription}
            onChange={(e) => {
              setEditorDescription(e.target.value);
            }}
          />
          <label htmlFor="editor-code">Code</label>
          <textarea
            id="editor-code"
            value={editorCode}
            onChange={(e) => {
              setEditorCode(e.target.value);
            }}
          />
          <button className="btn btn-save" type="submit">
            Save snippet
          </button>
          <button className="btn btn-cancel" onClick={cancelBtnHandler}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SnippetEditor;
