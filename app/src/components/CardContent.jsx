import { useState } from "react";
import { formatDate } from "../utils";

function CardContentent({
  task,
  handleDeletebtn,
  handletaskChange,
  handleBlur,
}) {
  const [text, setText] = useState(task.text);
  function handletaskChange(newValue) {
    setText(newValue);
  }
  return (
    <>
      <div className="delete">
        <button onClick={() => handleDeletebtn(task.id)}>X</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => handletaskChange(e.target.value)}
        onBlur={() => handleBlur(text, task.id)}
        placeholder="text here"
      />
      <div className="date-time">
        lastUpdate:
        {formatDate(task.dateTime)}
      </div>
    </>
  );
}

export default CardContentent;
