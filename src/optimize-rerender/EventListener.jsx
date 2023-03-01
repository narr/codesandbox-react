// function diffProperties
// 1. check if onClick function changed (shallow equality)
// https://github.com/facebook/react/blob/b2ae9ddb3b497d16a7c27c051da1827d08871138/packages/react-dom-bindings/src/client/ReactDOMComponent.js#L702
// 2. if it changed, it set "updatePayload = []"
// https://github.com/facebook/react/blob/b2ae9ddb3b497d16a7c27c051da1827d08871138/packages/react-dom-bindings/src/client/ReactDOMComponent.js#L786
// 3. if "updatePayload" is truthy, excute "markUpdate(workInProgress);"
// https://github.com/facebook/react/blob/b2ae9ddb3b497d16a7c27c051da1827d08871138/packages/react-reconciler/src/ReactFiberCompleteWork.js#L445
// 4. it triggers commitUpdate
// https://github.com/facebook/react/blob/b2ae9ddb3b497d16a7c27c051da1827d08871138/packages/react-dom-bindings/src/client/ReactDOMHostConfig.js#L515
// https://github.com/facebook/react/blob/b2ae9ddb3b497d16a7c27c051da1827d08871138/packages/react-dom-bindings/src/client/ReactDOMComponent.js#L356
// * In the end, onClick callback is updated in "__reactProps${var}" in dom

// * dispatch event with a listener in dom property,  "__reactProps${var}"
// e.g. "__reactProps$5fe7ngz1ww6"
// https://github.com/facebook/react/blob/b2ae9ddb3b497d16a7c27c051da1827d08871138/packages/react-dom-bindings/src/events/plugins/SimpleEventPlugin.js#L217

import { useState, useCallback, useMemo } from "react";

function EventListener() {
  const [count, setCount] = useState(0);
  console.log("EventListener count:", count);

  function increment(e) {
    console.log("increment event", e.target);
    setCount((c) => c + 1);
  }
  increment.test = performance.now();

  const incrementCallback = useCallback((e) => {
    console.log("incrementCallback event", e.target);
    setCount((c) => c + 1);
  }, []);

  const incrementMemo = useMemo(
    () => (e) => {
      console.log("incrementMemo event", e.target);
      setCount((c) => c + 1);
    },
    []
  );

  const onClickCallback = incrementCallback;

  window.increment = onClickCallback;
  return <button onClick={onClickCallback}>The count is {count}</button>;
}

export default function App() {
  return <EventListener />;
}
