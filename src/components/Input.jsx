import React from "react";
import { FaTrash, FaSave } from "react-icons/fa";

function Input(props) {
  const { onAdd, remove, userInput, setUserInput } = props;

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      onAdd(userInput);
      setUserInput("");
    }
  }

  function handleChange(event) {
    setUserInput(event.target.value);
  }

  return (
    <div className="tools">
      <input
        name="textInput"
        type="text"
        placeholder="Add Task"
        onChange={handleChange}
        value={userInput}
        onKeyPress={handleKeyPress}
        autoFocus
        autoComplete="off"
      ></input>
      <button
        className="add"
        onClick={() => {
          onAdd(userInput);
          setUserInput("");
        }}
      >
        <FaSave /> Add
      </button>
      <button
        className="remove"
        onClick={() => {
          remove();
          setUserInput("");
        }}
      >
        <FaTrash /> Clear All
      </button>
    </div>
  );
}

export default Input;
