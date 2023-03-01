import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksProvider } from "./TasksContext";

export default function App() {
  return (
    <TasksProvider>
      <h2>Day off in Chiangmai</h2>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
