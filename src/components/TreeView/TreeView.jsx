import { TreeNode } from "./TreeNode";

// export interface ITreeViewProps {
//   nodes: ITreeNode[];
//   onNodeSelected?: (node: ITreeNode) => void;
//   selectedNode?: ITreeNode;
// }

// const TreeView: FC<ITreeViewProps> = (props) => {
const TreeView = (props) => {
  const { nodes, onNodeSelected, selectedNode } = props;
  return (
    <div className="tree">
      <ul className="tree-container">
        {nodes.map((node) => (
          <TreeNode
            key={node.key}
            node={node}
            onSelected={onNodeSelected}
            selectedNode={selectedNode}
          />
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
