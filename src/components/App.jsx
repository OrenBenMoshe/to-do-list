import React, { useState, useEffect } from "react";
import Task from "./Task";
import Input from "./Input";
import { FaRegCopyright } from "react-icons/fa";

const ITEMS_KEY = "toDoListItems";

function App() {
  const [items, setItems] = useState([]);
  const [deleteTasks, setDeleteTasks] = useState(true);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const storeItems = JSON.parse(localStorage.getItem(ITEMS_KEY));
    if (storeItems) {
      setItems(storeItems.filter(notCompleteItems));
    }
  }, []);

  function notCompleteItems(item) {
    if (item.complete === false) return item;
  }

  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  document.onkeydown = function (event) {
    if (event.key === "Escape") removeAllTasks();
  };

  function addItem(userInput) {
    if (userInput.length === 0) return;
    let newItem = {
      text: userInput,
      complete: false,
    };
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
    setDeleteTasks(true);
  }

  function removeAllTasks() {
    items.length = 0;
    setDeleteTasks(false);
    setItems((prevItems) => {
      return [...prevItems];
    });
    setUserInput("");
  }

  return (
    <div className="container">
      <h1>To Do List</h1>
      <Input
        onAdd={addItem}
        remove={removeAllTasks}
        userInput={userInput}
        setUserInput={setUserInput}
      />
      <div className="tasks">
        {deleteTasks ? (
          <ul>
            {items.length === 0 && (
              <div>
                <p>you can use the "ENTER" on keyboard to add a task</p>
                <p>you can use the "Esc" on keyboard to remove all tasks</p>
                <li>Example Task </li>
              </div>
            )}
            {items.length > 0 && (
              <div>
                <p className="note2">
                  If you wish to see only the unmarked tasks refresh the page
                </p>
                <p className="note">
                  Any task that not marked as done will appear when you come
                  back
                </p>
                <p>click on a task to mark as done</p>
                <p>click again on a task to unmarked it</p>
              </div>
            )}
            {items.map((item, index) => (
              <Task
                key={index}
                id={index}
                text={item.text}
                items={items}
                setItems={setItems}
              />
            ))}
          </ul>
        ) : (
          <ul>
            <p> you deleted all tasks </p>
            <p> make a new one and add it to your list </p>
          </ul>
        )}
      </div>
      <footer>
        Copyright <FaRegCopyright /> By Oren BM
      </footer>
    </div>
  );
}

export default App;
