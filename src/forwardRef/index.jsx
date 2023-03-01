import React, { useRef, useImperativeHandle, useState } from "react";

const ForwardRefComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>{props.children}</div>
));

const UseImperativeHandleComponent = (props) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useImperativeHandle(props.myRef3, () => ({
    count: (value) => setCount(value)
  }));

  if (props.myRef4?.current) {
    props.myRef4.current.count = (value) => {
      setCount2(value);
    };
  }

  const onClick = () => {
    setCount(count + 1);
    setCount2(count + 1);
  };

  return (
    <>
      <button ref={props.myRef2} onClick={onClick}>
        {props.children}
      </button>
      <br />
      Count: {count}
      <br />
      Count2: {count2}
    </>
  );
};

export default function App() {
  const myRef = useRef();
  const myRef2 = useRef();
  const myRef3 = useRef("valueToBeOverriden");
  const myRef4 = useRef({});

  const onClick = () => {
    myRef.current.textContent = "ForwardRefComponent changed!";
    myRef2.current.textContent = "UseImperativeHandleComponent changed!";
    console.log("myRef3.current", myRef3.current);
    myRef3.current.count(-1);
    myRef4.current.count(-2);
  };

  return (
    <div className="App">
      <button onClick={onClick}>Click me!</button>
      <br />
      <br />
      <ForwardRefComponent ref={myRef}>ForwardRefComponent</ForwardRefComponent>
      <br />
      <UseImperativeHandleComponent
        myRef2={myRef2}
        myRef3={myRef3}
        myRef4={myRef4}
      >
        UseImperativeHandleComponent
      </UseImperativeHandleComponent>
    </div>
  );
}
