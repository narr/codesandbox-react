import { useState } from "react";
import { useTasksDispatch } from "./TasksContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("added");
        setText("");
        dispatch({
          type: "added",
          id: nextId++,
          text: text
        });
      }}
    >
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      &nbsp;
      <button type="submit">Add</button>
    </form>
  );
}

let nextId = 3;
