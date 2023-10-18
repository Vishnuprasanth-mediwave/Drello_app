import React, { useState } from "react";

import { formatDate } from "../utils";

function Card({ addTodo, handleTaskEdit, handleDelete, tasks }) {
  const [text, setText] = useState("");

  const addCard = () => {
    addTodo(text);
  };
  function handletaskChange(newValue) {
    setText(newValue);
    handleTaskEdit(newValue, id);
  }
  function handleBlur(id) {
    handleTaskEdit(text, id);
  }
  function handleDeletebtn(id) {
    handleDelete(id);
  }

  return (
    <>
      <button onClick={addCard}>+</button>
      <div className="card-div">
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <div className="delete">
              <button onClick={() => handleDeletebtn(task.id)}>X</button>
            </div>
            <textarea
              key={index}
              // value={text}
              onChange={(e) => handletaskChange(e.target.value, task.id)}
              onBlur={() => handleBlur(task.id)}
              placeholder="text here"
            />
            <div className="date-time">
              lastUpdate:
              {formatDate(task.dateTime)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
