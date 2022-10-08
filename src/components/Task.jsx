import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

function Task(props) {
  const { text, id, items, setItems } = props;

  //   define the initial state to false
  const [isDone, setIsDone] = useState(false);

  function handleClick() {
    setIsDone((prevValue) => {
      return !prevValue;
    });
    items[id].complete = !items[id].complete;
    setItems((prevItems) => {
      return [...prevItems];
    });
  }

  function deleteTask(text) {
    const index = items.findIndex((x) => x.text === text);
    items.splice(index, 1);
    setItems((prevItems) => [...prevItems]);
  }

  return (
    <div className="task-item">
      <li
        onClick={() => handleClick()}
        style={{ textDecoration: isDone ? "line-through" : "none" }}
      >
        {text}
      </li>
      <button className="remove-task" onClick={() => deleteTask(text)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default Task;
