// https://kentcdodds.com/blog/optimize-react-re-renders

import { useState } from "react";

function Logger(props) {
  console.log(`${props.label} rendered`);
  return "Logger1";
}

function Logger2(props) {
  console.log(`${props.label} rendered`);
  return "Logger2";
}

function Counter(props) {
  const [count, setCount] = useState(0);
  console.log("optimize-rerender-simple", count);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>
      <Logger label="counter" />
      {props.children}
    </div>
  );
}

export default function Simple() {
  return (
    <Counter>
      <Logger2 label="counter2" />
    </Counter>
  );
}
