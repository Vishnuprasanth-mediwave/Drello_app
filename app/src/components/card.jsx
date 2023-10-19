import React, { useState } from "react";
import CardContentent from "./CardContent";

function Card({ addTodo, handleTaskEdit, handleDelete, tasks }) {
  const addCard = () => {
    addTodo("");
  };

  function handleBlur(text, id) {
    handleTaskEdit(text, id);
  }
  function handleDeletebtn(id) {
    handleDelete(id);
  }
  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  return (
    <>
      <div className="add">
        <button onClick={addCard}>+</button>
      </div>
      <div className="card-div">
        {tasks
          .filter((t) => t.inState === "todo")
          .map((task) => (
            <div
              className="card"
              key={task.id}
              draggable
              onDragStart={(e) => {
                onDragStart(e, task.id);
              }}
            >
              <CardContentent
                task={task}
                handleDeletebtn={handleDeletebtn}
                // handletaskChange={handletaskChange}
                handleBlur={handleBlur}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default Card;
