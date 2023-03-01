import { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext";

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <form style={{ display: "inline" }}>
        <input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                text: e.target.value
              }
            });
          }}
        />
        &nbsp;
        <button
          onClick={() => {
            console.log("saved!");
            setIsEditing(false);
          }}
        >
          Save
        </button>
      </form>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      &nbsp;
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}
