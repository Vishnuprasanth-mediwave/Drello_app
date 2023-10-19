import { useReducer, useEffect } from "react";
import Card from "./components/card";
import In_progress from "./components/inprogress.jsx";
import Done from "./components/done";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [tasks, dispatch] = useReducer(todoReducer, getFromLocalStorage());
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function getFromLocalStorage() {
    const storedValues = localStorage.getItem("tasks");
    if (storedValues) {
      return JSON.parse(storedValues);
    } else {
      return [];
    }
  }

  function todoReducer(tasks, action) {
    switch (action.type) {
      case "TASK_ADD": {
        return [
          ...tasks,
          {
            id: uuidv4(),
            text: "",
            dateTime: new Date(),
            inState: "todo",
          },
        ];
      }
      case "TASK_DELETE": {
        console.log(action.value);
        const filtered = tasks.filter((t) => t.id !== action.value);
        return filtered;
      }
      case "TASK_DROP": {
        let newTasks = tasks.filter((task) => {
          if (task.id == action.value.id) {
            task.inState = action.value.state;
          }
          return task;
        });
        return newTasks;
      }
      case "TASK_EDITED": {
        const editedTask = [...tasks];
        const idx = editedTask.findIndex((nt) => nt.id === action.value.id);
        if (idx !== -1) {
          (editedTask[idx]["dateTime"] = new Date()),
            (editedTask[idx]["text"] = action.value.value);
        }
        return editedTask;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAdd(value) {
    dispatch({
      type: "TASK_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TASK_DELETE",
      value: id,
    });
  }
  function handleEdited(value, id) {
    dispatch({
      type: "TASK_EDITED",
      value: { value, id },
    });
  }
  function onDrop(ev, state) {
    let id = ev.dataTransfer.getData("id");
    dispatch({
      type: "TASK_DROP",
      value: { id, state },
    });
  }
  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  // const onDrop = (ev, state) => {
  //   let id = ev.dataTransfer.getData("id");

  //   let newTasks = tasks.filter((task) => {
  //     if (task.id == action.value.id) {
  //       task.inState = action.value.state;
  //     }
  //     return task;
  //   });
  // };
  return (
    <div className="total-div">
      <div
        className="container"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "todo")}
      >
        <h2>My todo</h2>
        <Card
          addTodo={handleAdd}
          tasks={tasks}
          handleTaskEdit={handleEdited}
          handleDelete={(id) => handleDelete(id)}
        />
      </div>
      <div
        className="progess"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "in_progress")}
      >
        <h2>progress</h2>
        <In_progress
          tasks={tasks}
          handleTaskEdit={handleEdited}
          handleDelete={(id) => handleDelete(id)}
        />
      </div>
      <div
        className="done"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "done")}
      >
        <h2>Done</h2>
        <Done
          tasks={tasks}
          handleTaskEdit={handleEdited}
          handleDelete={(id) => handleDelete(id)}
        />
      </div>
    </div>
  );
}

export default App;
