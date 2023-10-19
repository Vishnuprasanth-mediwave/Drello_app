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

  return (
    <div className="total-div">
      <div className="container">
        <h2>My todo</h2>
        <Card
          addTodo={handleAdd}
          tasks={tasks}
          handleTaskEdit={handleEdited}
          handleDelete={(id) => handleDelete(id)}
        />
      </div>
      <div className="progess">
        <h2>progress</h2>
        <In_progress tasks={tasks} />
      </div>
      <div className="done">
        <h2>Done</h2>
        <Done tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
