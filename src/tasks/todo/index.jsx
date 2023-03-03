import "./index.css";
import { useState, useReducer, useMemo, memo } from "react";

const StageNames = {
  todo: "todo",
  inprogress: "inprogress",
  done: "done",
};

const initialState = {
  stages: [
    {
      name: StageNames.todo,
      tasks: ["t1", "t2", "t3", "t4"],
    },
    {
      name: StageNames.inprogress,
      tasks: ["t5", "t6", "t7"],
    },
    {
      name: StageNames.done,
      tasks: ["t8", "t9"],
    },
  ],
  // tasks: {
  //   t1: {
  //     name: "task-1",
  //   },
  // },
  selectedTask: {},
  // selectedTask: {
  //   task: "1",
  //   stage: "todo",
  // },
};

const ActionTypes = {
  create: "create",
  select: "select",
  movePrev: "move-prev",
  moveNext: "move-next",
  delete: "delete",
};

function getCurrentStageIndex(stages, currentStage) {
  return stages.findIndex((stage) => stage.name === currentStage);
}

function taskReducer(oldState, action) {
  switch (action.type) {
    case ActionTypes.create: {
      return {
        ...oldState,
        stages: oldState.stages.map((stage) => {
          if (stage.name === StageNames.todo) {
            return {
              ...stage,
              tasks: stage.tasks.concat(action.payload.task),
            };
          }
          return stage;
        }),
      };
    }
    case ActionTypes.select: {
      const stageIndex = getCurrentStageIndex(
        oldState.stages,
        action.payload.stage
      );
      return {
        ...oldState,
        selectedTask: {
          task: action.payload.task,
          stage: action.payload.stage,
          canMovePrev: stageIndex > 0,
          canMoveNext: stageIndex < oldState.stages.length - 1,
        },
      };
    }
    case ActionTypes.movePrev: {
      const stageIndex = getCurrentStageIndex(
        oldState.stages,
        action.payload.stage
      );
      return {
        stages: oldState.stages.map((stage, i) => {
          if (i === stageIndex) {
            return {
              ...stage,
              tasks: stage.tasks.filter((t) => t !== action.payload.task),
            };
          } else if (i === stageIndex - 1) {
            return {
              ...stage,
              tasks: stage.tasks.concat(action.payload.task),
            };
          }
          return stage;
        }),
        selectedTask: {
          ...oldState.selectedTask,
          stage: oldState.stages[stageIndex - 1].name,
          canMovePrev: stageIndex - 1 > 0,
          canMoveNext: stageIndex - 1 < oldState.stages.length - 1,
        },
      };
    }
    case ActionTypes.moveNext: {
      const stageIndex = getCurrentStageIndex(
        oldState.stages,
        action.payload.stage
      );
      return {
        stages: oldState.stages.map((stage, i) => {
          if (i === stageIndex) {
            return {
              ...stage,
              tasks: stage.tasks.filter((t) => t !== action.payload.task),
            };
          } else if (i === stageIndex + 1) {
            return {
              ...stage,
              tasks: stage.tasks.concat(action.payload.task),
            };
          }
          return stage;
        }),
        selectedTask: {
          ...oldState.selectedTask,
          stage: oldState.stages[stageIndex + 1].name,
          canMovePrev: stageIndex + 1 > 0,
          canMoveNext: stageIndex + 1 < oldState.stages.length - 1,
        },
      };
    }
    case ActionTypes.delete: {
      const stageIndex = getCurrentStageIndex(
        oldState.stages,
        action.payload.stage
      );
      return {
        stages: oldState.stages.map((stage, i) => {
          if (i === stageIndex) {
            return {
              ...stage,
              tasks: stage.tasks.filter((t) => t !== action.payload.task),
            };
          }
          return stage;
        }),
        selectedTask: {},
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const Stage = memo(
  ({ name, tasks, onSelectTask }) => {
    console.log(`Stage:${name} renders`);
    return (
      <div className="stage">
        <h1>{name}</h1>
        <div className="tasks">
          {tasks.map((task) => (
            <div
              key={task}
              className="task"
              onClick={() => onSelectTask(name, task)}
            >
              {task}
            </div>
          ))}
        </div>
      </div>
    );
  },
  function arePropsEqual(oldProps, newProps) {
    return oldProps.tasks === newProps.tasks;
  }
);

function Todo() {
  console.log("Todo root renders");
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [createTaskName, setCreateTaskName] = useState("");

  const existingTasks = useMemo(() => {
    console.log("useMemo get value");
    return state.stages
      .map((stage) => {
        return stage.tasks;
      })
      .flatMap((v) => v);
  }, [state.stages]);

  const onCreateTaskNameChange = (e) => {
    setCreateTaskName(e.target.value.trim());
  };

  const onCreateTask = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // formData.get("new-task-name");
    // const input = e.target.elements["new-task-name"];
    dispatch({
      type: ActionTypes.create,
      payload: {
        // task: input.value,
        task: createTaskName,
      },
    });
    setCreateTaskName("");
    // input.value = "";
  };

  const onSelectTask = (stage, task) => {
    dispatch({
      type: ActionTypes.select,
      payload: {
        stage,
        task,
      },
    });
  };

  const onMoveTaskPrev = () => {
    dispatch({
      type: ActionTypes.movePrev,
      payload: {
        stage: state.selectedTask.stage,
        task: state.selectedTask.task,
      },
    });
  };

  const onMoveTaskNext = () => {
    dispatch({
      type: ActionTypes.moveNext,
      payload: {
        stage: state.selectedTask.stage,
        task: state.selectedTask.task,
      },
    });
  };

  const onDeleteTask = () => {
    dispatch({
      type: ActionTypes.delete,
      payload: {
        stage: state.selectedTask.stage,
        task: state.selectedTask.task,
      },
    });
  };

  return (
    <div className="todo">
      <div className="controller">
        <h1>Controller</h1>
        <form onSubmit={onCreateTask}>
          <input
            type="text"
            name="new-task-name"
            value={createTaskName}
            onChange={onCreateTaskNameChange}
          />
          <button disabled={existingTasks.includes(createTaskName)}>
            Create
          </button>
        </form>
        <br />
        <div>
          <input type="text" readOnly value={state.selectedTask.task || ""} />
          <button
            onClick={onMoveTaskPrev}
            disabled={!state.selectedTask.canMovePrev}
          >
            Move Prev
          </button>
          &nbsp;&nbsp;
          <button
            onClick={onMoveTaskNext}
            disabled={!state.selectedTask.canMoveNext}
          >
            Move Next
          </button>
          &nbsp;&nbsp;
          <button onClick={onDeleteTask} disabled={!state.selectedTask.task}>
            Delete
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="stages">
        {state.stages.map((stage) => (
          <Stage
            key={stage.name}
            name={stage.name}
            tasks={stage.tasks}
            onSelectTask={onSelectTask}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return <Todo />;
}
