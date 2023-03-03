import "./index.css";
import { useState, useReducer, useMemo } from "react";

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

function taskReducer(states, action) {
  switch (action.type) {
    case ActionTypes.create: {
      return {
        ...states,
        stages: states.stages.map((stage) => {
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
        states.stages,
        action.payload.stage
      );
      return {
        ...states,
        selectedTask: {
          task: action.payload.task,
          stage: action.payload.stage,
          canMovePrev: stageIndex > 0,
          canMoveNext: stageIndex < states.stages.length - 1,
        },
      };
    }
    case ActionTypes.movePrev: {
      const stageIndex = getCurrentStageIndex(
        states.stages,
        action.payload.stage
      );
      return {
        stages: states.stages.map((stage, i) => {
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
          ...states.selectedTask,
          stage: states.stages[stageIndex - 1].name,
          canMovePrev: stageIndex - 1 > 0,
          canMoveNext: stageIndex - 1 < states.stages.length - 1,
        },
      };
    }
    case ActionTypes.moveNext: {
      const stageIndex = getCurrentStageIndex(
        states.stages,
        action.payload.stage
      );
      return {
        stages: states.stages.map((stage, i) => {
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
          ...states.selectedTask,
          stage: states.stages[stageIndex + 1].name,
          canMovePrev: stageIndex + 1 > 0,
          canMoveNext: stageIndex + 1 < states.stages.length - 1,
        },
      };
    }
    case ActionTypes.delete: {
      const stageIndex = getCurrentStageIndex(
        states.stages,
        action.payload.stage
      );
      return {
        stages: states.stages.map((stage, i) => {
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

function Todo() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [createTaskName, setCreateTaskName] = useState("");

  const existingTasks = useMemo(
    () =>
      state.stages
        .map((stage) => {
          return stage.tasks;
        })
        .flatMap((v) => v),
    [state.stages]
  );

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
        stage: stage.name,
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
          <div key={stage.name} className="stage">
            <h1>{stage.name}</h1>
            <div className="tasks">
              {stage.tasks.map((task) => (
                <div
                  key={task}
                  className="task"
                  onClick={() => onSelectTask(stage, task)}
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return <Todo />;
}
