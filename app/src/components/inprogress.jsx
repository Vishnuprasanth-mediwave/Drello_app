import CardContentent from "./CardContent";

function In_progress({ handleTaskEdit, handleDelete, tasks }) {
  function handleBlur(id) {
    handleTaskEdit(text, id);
  }
  function handleDeletebtn(id) {
    handleDelete(id);
  }

  return (
    <>
      <div className="card-div">
        {tasks
          .filter((t) => t.inState === "in_progress")
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
export default In_progress;
