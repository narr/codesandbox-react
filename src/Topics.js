import { memo } from "react";
import OptRrSimple from "./optimize-rerender/Simple";
import OptRrComplex from "./optimize-rerender/Complex";
import OptRrContext from "./optimize-rerender/Context";
import OptRrTypeChange from "./optimize-rerender/TypeChange";
import OptRrEventListener from "./optimize-rerender/EventListener";
import batchUpdate from "./batch-update";
import useEffectDependencies from "./useEffect-dependencies";
import ErrorBoundary from "./error-boundary";
import useReducer from "./useReducer";
import customHook from "./custom-hook";
import forwardRef from "./forwardRef";
import ClassComponent from "./class-component";
import Todo from "./tasks/todo";

const Topics = {
  "optimize-rerender-simple": memo(OptRrSimple),
  "optimize-rerender-complex": memo(OptRrComplex),
  "optimize-rerender-context": memo(OptRrContext),
  "optimize-rerender-type-change (key)": memo(OptRrTypeChange),
  "optimize-rerender-event-listener (useCallback, useMemo)":
    memo(OptRrEventListener),
  "batch-update": memo(batchUpdate),
  "useEffect-dependencies": memo(useEffectDependencies),
  "error-boundary": memo(ErrorBoundary),
  "useReducer (useContext)": memo(useReducer),
  "custom-hook (useLayoutEffect, createPortal)": memo(customHook),
  "forwardRef (useImperativeHandle)": memo(forwardRef),
  "class component": memo(ClassComponent),
  "task-todo": memo(Todo),
};

export default Topics;
