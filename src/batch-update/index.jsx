import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";

function BatchUpdate() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const domRef = useRef();
  console.log("BatchUpdate rendered: counts", [count, count2, count3]);

  const onClickHandler = () => {
    // render will happen only one time
    // count will be upated as prev count value + 1 even though
    // there are two setCount
    setCount(count + 1);
    setCount(count + 1);
    setCount2(count2 + 1);
  };

  const onClickHandler2 = () => {
    setTimeout(() => {
      // render will happen only one time
      // count will be upated as prev count value + 2
      setCount((c) => c + 1);
      setCount((c) => c + 1);
      setCount2(count2 + 1);
    }, 100);
  };

  const onClickHandler3 = () => {
    // render will happen two times
    // Count will be upated as prev count value + 1 as count value
    // still refers the old value even in the second flush.
    // But actual value is already updated after flush even in dom.
    // Moreover, next codes to flushSync will be executed later
    // than useEffect
    flushSync(() => {
      setCount3(count3 + 1);
    });
    console.log("flushSync count3", count3);
    console.log("flushSync domRef", domRef.current.textContent);
    // React has updated the DOM by now
    flushSync(() => {
      setCount3(count3 + 1);
    });
    console.log("flushSync count3", count3);
    console.log("flushSync domRef", domRef.current.textContent);
    // React has updated the DOM by now
  };

  useEffect(() => {
    console.log("useEffect after flushSync count3", count3);
    console.log("useEffect after flushSync domRef", domRef.current.textContent);
  }, [count3]);

  return (
    <>
      <button onClick={onClickHandler}>update state count</button>
      <button onClick={onClickHandler2}>trigger setTimeout</button>
      <button onClick={onClickHandler3}>trigger flushSync</button>
      <br />
      state count: {count}
      <br />
      state count2: {count2}
      <br />
      state count3: <span ref={domRef}>{count3}</span>
      <br />
    </>
  );
}

export default function App() {
  return <BatchUpdate />;
}
