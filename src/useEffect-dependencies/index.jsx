import { useState, useEffect, useRef } from "react";

let externalVariable = [];

function UseEffectDependencies() {
  const [count, setCount] = useState(0);
  console.log("UseEffectDependencies rendered");
  const refDependency = useRef(0);

  const onClickHandler = () => {
    setCount((c) => c + 1);
  };

  const onClickHandler2 = () => {
    refDependency.current++;
    externalVariable = externalVariable.concat(count);
  };

  useEffect(() => {
    // This is executed when this component renders and
    // refDependency.current changes.
    // But mutating refDependency.current value doesn't triggers re-render
    // so it won't trigger useEffect callback automatically.

    // e.g. To run this callback
    // 1. update ref count
    // 2. trigger re-render by updating state count
    console.log("useEffect callback (refDependency.current)");
  }, [refDependency.current]);

  useEffect(() => {
    // It's the same as above.
    console.log("useEffect callback (externalVariable)");
  }, [externalVariable]);

  return (
    <>
      <button onClick={onClickHandler}>update state count</button>
      <br />
      <button onClick={onClickHandler2}>update ref count</button>
      <br />
      state count: {count}
      <br />
      ref count: {refDependency.current}
      <br />
      externalVariable count: {externalVariable.length}
    </>
  );
}

export default function App() {
  return <UseEffectDependencies />;
}
