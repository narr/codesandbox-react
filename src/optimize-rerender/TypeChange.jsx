import { useState, useEffect } from "react";

function Type1({ children }) {
  console.log("Type1 rendered");
  useEffect(() => {
    return () => {
      console.log("Type1 unmounted");
    };
  }, []);
  return (
    <>
      <div>Type1</div>
      {children}
    </>
  );
}

function Type2({ children }) {
  console.log("Type2 rendered");
  useEffect(() => {
    return () => {
      console.log("Type2 unmounted");
    };
  }, []);
  return (
    <>
      <div>Type2</div>
      {children}
    </>
  );
}

function Type3() {
  console.log("Type3 rendered");
  useEffect(() => {
    return () => {
      console.log("Type3 unmounted");
    };
  }, []);
  return (
    <>
      <div>Type3</div>
    </>
  );
}

function Type4() {
  console.log("Type4 rendered");
  useEffect(() => {
    return () => {
      console.log("Type4 unmounted");
    };
  }, []);
  return (
    <>
      <div>Type4</div>
    </>
  );
}

function CommonChild() {
  console.log("CommonChild rendered");
  useEffect(() => {
    return () => {
      console.log("CommonChild unmounted");
    };
  }, []);
  return <div key="common-child">CommonChild</div>;
}

function TypeChange({ comp1, comp2 }) {
  const [comp, setComp] = useState(false);
  console.log("optimize-rerender-type-change", comp);
  function handleChange(e) {
    setComp(e.target.value === "true");
  }
  return (
    <>
      <div>
        <label>
          <input
            name="comp"
            checked={comp === false}
            value={false}
            type="radio"
            onChange={handleChange}
          />{" "}
          false
        </label>
        <label>
          <input
            name="comp"
            checked={comp === true}
            value={true}
            type="radio"
            onChange={handleChange}
          />{" "}
          true
        </label>
      </div>
      <br />
      {comp === false ? comp1 : comp2}
      <Type3 key="Type3" />
      {comp === false ? (
        <>
          <div>t4</div>
          <Type4 key="Type4" />
        </>
      ) : (
        <>
          <Type4 key="Type4" />
          <div>t4</div>
        </>
      )}
    </>
  );
}

export default function App() {
  // Type1 and Type2
  // When Type1 changes to Type2 or vice versa, unmount happens to
  // the old component and new component is mounted including the
  // children regardless of the same keys.
  // As new component is mounted, it ignores the real dom state and
  // updates the screen as the new component renders.

  // Type3 - render happens whenever TypeChange renders.
  // compare with the old v-dom tree with new one (*
  // not the current real dom tree)
  // * Even though there is difference between v-dom tree and
  // real dom tree (for example, update text content manually by
  // developer tool), React's reconciliation processes doesn't
  // care about it.
  // Unmount doesn't happen.
  // no difference between with key (the same key) or without key

  // Type4 and Div tag
  // When radio button value changes, it triggers the change of the order to show
  // Type4 and div tag. It re-renders every time the radio value changes but Type4
  // is not ummounted as it has always the same key during re-render.
  // Div doesn't have the same key so it is unmounted whenever the order in v-tree
  // changes which means it will update real dom tree as it renders even if there is
  // manual change in real dom by developer tool.

  return (
    <TypeChange
      comp1={
        <Type1 key="parent">
          <CommonChild key="child" />
        </Type1>
      }
      comp2={
        <Type2 key="parent">
          <CommonChild key="child" />
        </Type2>
      }
    />
  );
}
