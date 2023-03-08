import { memo, useState } from "react";
import TreeView from "./TreeView";

// export interface ITreeNode {
//   key: string;
//   label: string;
//   children?: ITreeNode[];
//   expanded?: boolean;
// }

// export interface TreeNodeProps {
//   node: ITreeNode;
//   onSelected?: (node: ITreeNode) => void;
//   selectedNode?: ITreeNode;
// }

// export const TreeNode: FC<TreeNodeProps> = memo(function TreeNode(props) {
export const TreeNode = memo(function TreeNode(props) {
  const { node, onSelected = () => {}, selectedNode } = props;
  console.log("TreeNode", node.key);
  const [expanded, setExpanded] = useState(false);

  const getRowClasses = () => {
    let classes = "row";
    if (node.key === selectedNode?.key) {
      classes = classes + " selected";
    }
    return classes;
  };

  const getRowPaddingPerDepth = () => {
    const depth = node.key.split(".").length;
    // return depth + (depth - 1) * 0.5;
    return depth * 1.5;
  };

  const onRowClick = () => {
    onSelected(node);
  };

  const getColumnClasses = () => {
    let classes = "column caret";
    if (node.children?.length) {
      classes = classes + ` ${expanded ? "expanded" : "collapsed"}`;
    } else {
      classes = classes + " disabled";
    }
    return classes;
  };

  const onCaretClick = (e) => {
    e.stopPropagation();
    if (node.children?.length) {
      setExpanded(!expanded);
    }
  };

  return (
    <li className="tree-node">
      <div
        className={getRowClasses()}
        style={{ paddingLeft: `${getRowPaddingPerDepth()}rem` }}
        onClick={onRowClick}
      >
        <span
          className={getColumnClasses()}
          onClick={onCaretClick}
          aria-label={`tree-node-caret__${node.key}`}
        ></span>
        <div className={`column`}>{node.label}</div>
      </div>

      {node.children?.length && expanded ? (
        <TreeView
          nodes={node.children}
          onNodeSelected={onSelected}
          selectedNode={selectedNode}
        />
      ) : null}
    </li>
  );
}, propsAreEqual);

// function propsAreEqual(oldProps: TreeNodeProps, newProps: TreeNodeProps) {
function propsAreEqual(oldProps, newProps) {
  console.log("shouldRerender", newProps.node.key);
  if (oldProps.node !== newProps.node) {
    return false;
  }
  if (oldProps.selectedNode?.key !== newProps.selectedNode?.key) {
    const nodeKeyArr = newProps.node.key.split(".");

    let shouldDeselectNodeOrChildNode = false;
    const oldSelectedNodeKeyArr = oldProps.selectedNode?.key.split(".") ?? [];
    if (oldSelectedNodeKeyArr.length >= nodeKeyArr.length) {
      shouldDeselectNodeOrChildNode = nodeKeyArr.every((k, i) => {
        return k === oldSelectedNodeKeyArr[i];
      });
    }

    let shouldSelectNodeOrChildNode = false;
    const newSelectedNodeKeyArr = newProps.selectedNode?.key.split(".") ?? [];
    if (newSelectedNodeKeyArr.length >= nodeKeyArr.length) {
      shouldSelectNodeOrChildNode = nodeKeyArr.every((k, i) => {
        return k === newSelectedNodeKeyArr[i];
      });
    }

    console.log(
      "shouldRerender shouldDeselectNodeOrChildNode",
      shouldDeselectNodeOrChildNode
    );
    console.log(
      "shouldRerender shouldSelectNodeOrChildNode",
      shouldSelectNodeOrChildNode
    );
    return !shouldDeselectNodeOrChildNode && !shouldSelectNodeOrChildNode;
  }
  return true;
}
