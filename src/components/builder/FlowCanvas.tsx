import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  type ReactFlowInstance,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../../lib/store';
import { useShallow } from 'zustand/react/shallow';

let id = 0;
const getId = () => `dndnode_${id++}`;

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
});

const FlowCanvasInner = ({ readonly }: { readonly: boolean }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useStore(useShallow(selector));
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      if (readonly) return; // Prevent dropping in readonly mode

      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');

      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode: Node = {
        id: getId(),
        type: 'default', 
        position,
        data: { label: `${label}`, type }, // Save the type metadata
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode, readonly],
  );

  return (
    <div className="h-full w-full bg-slate-50" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readonly ? undefined : onNodesChange}
        onEdgesChange={readonly ? undefined : onEdgesChange}
        onConnect={readonly ? undefined : onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodesDraggable={!readonly}
        nodesConnectable={!readonly}
        elementsSelectable={!readonly}
        fitView
      >
        <Controls showInteractive={!readonly} />
        <Background />
      </ReactFlow>
    </div>
  );
};

export const FlowCanvas = ({ readonly = false }: { readonly?: boolean }) => {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner readonly={readonly} />
    </ReactFlowProvider>
  );
}
