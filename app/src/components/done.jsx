import React, { useState } from "react";
import CardContentent from "./CardContent";

function Done({ handleTaskEdit, handleDelete, tasks }) {
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
      <div className="card-div">
        {tasks
          .filter((t) => t.inState === "done")
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
                handleBlur={handleBlur}
              />
            </div>
          ))}
      </div>
    </>
  );
}
export default Done;
