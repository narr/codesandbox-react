import "./styles.css";
import { StrictMode, Fragment, useState, useEffect } from "react";
import Topics from "./Topics";

function App() {
  const [checkedTopics, setCheckedTopics] = useState(() => {
    const savedCheckedTopics = window.localStorage.getItem("selected_topics");
    return savedCheckedTopics ? JSON.parse(savedCheckedTopics) : {};
  });
  const [selectedTopics, setSelectedTopics] = useState({});

  const onTopicCheckboxToggle = (topic) => {
    setCheckedTopics({
      ...checkedTopics,
      [topic]: checkedTopics[topic] ? false : true
    });
  };

  useEffect(() => {
    // to render a component after the checkbox UI (tick) is rendered
    setSelectedTopics(checkedTopics);
    window.localStorage.setItem(
      "selected_topics",
      JSON.stringify(checkedTopics)
    );
  }, [checkedTopics]);

  return (
    <div className="app">
      <div className="topic-chooser">
        <div className="topic-chooser__title">Choose topics to see</div>
        <ul>
          {Object.entries(Topics).map(([topic, Component]) => (
            <li key={topic} className="topic-chooser__option">
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(checkedTopics[topic])}
                  onChange={() => onTopicCheckboxToggle(topic)}
                />
                {topic}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-topics">
        {Object.entries(Topics)
          .filter(([topic, Component]) => selectedTopics[topic])
          .map(([topic, Component]) => (
            <Fragment key={topic}>
              <Component />
              <div className="selected-topics__divider">
                <hr />
                <hr />
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
}

export default function AppWrapper() {
  const [strictMode, setStrictMode] = useState(() => {
    const savedStrictMode = window.localStorage.getItem("strict_mode");
    return savedStrictMode ? JSON.parse(savedStrictMode) : true;
  });

  const toggleStrictMode = () => {
    setStrictMode(!strictMode);
    window.localStorage.setItem("strict_mode", !strictMode);
  };

  return (
    <div className="app-wrapper">
      <div className="strict-mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={strictMode}
            onChange={toggleStrictMode}
          />
          StrictMode
        </label>
      </div>
      <div className="app-wrapper__app">
        {strictMode ? (
          <StrictMode>
            <App />
          </StrictMode>
        ) : (
          <App />
        )}
      </div>
    </div>
  );
}
