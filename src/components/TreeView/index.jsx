import "./TreeView.css";
import { useState } from "react";
import TreeView from "./TreeView";

const TreeData = [
  {
    key: "1",
    label: "Tree Node 1",
    children: [
      {
        key: "1.1",
        label: "Tree Node 1.1",
        children: [
          {
            key: "1.1.1",
            label: "Tree Node 1.1.1",
            children: [],
          },
          {
            key: "1.1.2",
            label: "Tree Node 1.1.2",
            children: [],
          },
          {
            key: "1.1.3",
            label: "Tree Node 1.1.3",
            children: [],
          },
        ],
      },
      {
        key: "1.2",
        label: "Tree Node 1.2",
        children: [
          {
            key: "1.2.1",
            label: "Tree Node 1.2.1",
            children: [],
          },
          {
            key: "1.2.2",
            label: "Tree Node 1.2.2",
            children: [],
          },
          {
            key: "1.2.3",
            label: "Tree Node 1.2.3",
            children: [],
          },
        ],
      },
      {
        key: "1.3",
        label: "Tree Node 1.3",
        children: [
          {
            key: "1.3.1",
            label: "Tree Node 1.3.1",
            children: [],
          },
          {
            key: "1.3.2",
            label: "Tree Node 1.3.2",
            children: [],
          },
          {
            key: "1.3.3",
            label: "Tree Node 1.3.3",
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: "2",
    label: "Tree Node 2",
    children: [
      {
        key: "2.1",
        label: "Tree Node 2.1",
        children: [
          {
            key: "2.1.1",
            label: "Tree Node 2.1.1",
            children: [],
          },
          {
            key: "2.1.2",
            label: "Tree Node 2.1.2",
            children: [],
          },
          {
            key: "2.1.3",
            label: "Tree Node 2.1.3",
            children: [],
          },
        ],
      },
      {
        key: "2.2",
        label: "Tree Node 2.2",
        children: [
          {
            key: "2.2.1",
            label: "Tree Node 2.2.1",
            children: [],
          },
          {
            key: "2.2.2",
            label: "Tree Node 2.2.2",
            children: [],
          },
          {
            key: "2.2.3",
            label: "Tree Node 2.2.3",
            children: [],
          },
        ],
      },
      {
        key: "2.3",
        label: "Tree Node 2.3",
        children: [
          {
            key: "2.3.1",
            label: "Tree Node 2.3.1",
            children: [],
          },
          {
            key: "2.3.2",
            label: "Tree Node 2.3.2",
            children: [],
          },
          {
            key: "2.3.3",
            label: "Tree Node 2.3.3",
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: "3",
    label: "Tree Node 3",
    children: [
      {
        key: "3.1",
        label: "Tree Node 3.1",
        children: [
          {
            key: "3.1.1",
            label: "Tree Node 3.1.1",
            children: [],
          },
          {
            key: "3.1.2",
            label: "Tree Node 3.1.2",
            children: [],
          },
          {
            key: "3.1.3",
            label: "Tree Node 3.1.3",
            children: [],
          },
        ],
      },
      {
        key: "3.2",
        label: "Tree Node 3.2",
        children: [
          {
            key: "3.2.1",
            label: "Tree Node 3.2.1",
            children: [],
          },
          {
            key: "3.2.2",
            label: "Tree Node 3.2.2",
            children: [],
          },
          {
            key: "3.2.3",
            label: "Tree Node 3.2.3",
            children: [],
          },
        ],
      },
      {
        key: "3.3",
        label: "Tree Node 3.3",
        children: [
          {
            key: "3.3.1",
            label: "Tree Node 3.3.1",
            children: [],
          },
          {
            key: "3.3.2",
            label: "Tree Node 3.3.2",
            children: [],
          },
          {
            key: "3.3.3",
            label: "Tree Node 3.3.3",
            children: [],
          },
        ],
      },
    ],
  },
];

const App = () => {
  const [selectedTreeNode, setSelectedTreeNode] = useState();
  return (
    <div className="tree-wrapper" style={{ border: "1px solid skyblue" }}>
      <TreeView
        nodes={TreeData}
        onNodeSelected={setSelectedTreeNode}
        selectedNode={selectedTreeNode}
      />
    </div>
  );
};

export default App;
