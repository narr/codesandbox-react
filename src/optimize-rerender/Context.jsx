import { useState, createContext, useContext, useRef, useEffect } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [isDark, useIsDark] = useState(false);
  console.log("ThemeProvider rendered");
  return (
    <ThemeContext.Provider value={[isDark, useIsDark]}>
      <div style={{ backgroundColor: isDark ? "#666" : "#eee" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeChooser() {
  const [isDark, setIsDark] = useContext(ThemeContext);
  console.log("ThemeChooser rendered");
  return (
    <label>
      <input
        type="checkbox"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
      />
      Dark mode
    </label>
  );
}

function ThemeUser({ children }) {
  const [isDark] = useContext(ThemeContext);
  console.log("ThemeUser rendered");
  return <div>{children}</div>;
}

function NoThemeUser() {
  console.log("[ARTIFICIALLY SLOW] NoThemeUser rendered");
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }
  return <div>NoThemeUser</div>;
}

function ThemeUser2() {
  useContext(ThemeContext);
  console.log("ThemeUser2 rendered");
  return <NoThemeUser2 />;
}

function NoThemeUser2() {
  console.log("NoThemeUser2 rendered");
  return <div>NoThemeUser2</div>;
}

function NoThemeUser3({ callback, renderedCountRef }) {
  console.log("NoThemeUser3 rendered");
  const renderedCountSelfRef = useRef(0);

  // in strict mode, even though it renders twice on init and log twice,
  // the actual value (1) of useRef - renderedCountSelfRef is different from expected (2).
  // After init, the value is updated twice in Strict mode as expected.
  console.log(
    "NoThemeUser3 renderedCountSelfRef.current",
    renderedCountSelfRef.current
  );
  console.log(
    "NoThemeUser3 renderedCountRef.current",
    renderedCountRef.current
  );

  renderedCountSelfRef.current = renderedCountSelfRef.current + 1;
  renderedCountRef.current = renderedCountRef.current + 1;

  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log("NoThemeUser3 mounted");
    return () => {
      console.log("NoThemeUser3 unmounted");
    };
  }, []);

  return (
    <div
      style={{ border: "1px solid red", cursor: "pointer" }}
      onClick={() => {
        callback();
        setCount((x) => x + 1);
      }}
    >{`NoThemeUser3 - count: ${count}, 
    renderedCountBySelfRef: ${renderedCountSelfRef.current},
    renderedCountByParentRef: ${renderedCountRef.current}`}</div>
  );
}

function App() {
  console.log("App rendered");
  const childRenderedCountRef = useRef(0);
  const callback = () => {};
  return (
    <ThemeProvider>
      <ThemeChooser />
      <ThemeUser>
        <NoThemeUser />
      </ThemeUser>
      <ThemeUser2 />
      <NoThemeUser3
        callback={callback}
        renderedCountRef={childRenderedCountRef}
      />
    </ThemeProvider>
  );
}

export default function Context() {
  return <App />;
}
