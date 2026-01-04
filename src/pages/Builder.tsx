import React from 'react';
import { Sidebar } from '../components/builder/Sidebar';
import { FlowCanvas } from '../components/builder/FlowCanvas';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';

const Builder: React.FC = () => {
  const { nodes, edges } = useStore();
  const navigate = useNavigate();

  const handleDeploy = () => {
    // Basic validation: Check if we have nodes
    if (nodes.length <= 1) {
        alert("Please add some components to your agent first!");
        return;
    }

    // In a real app, we'd process the graph here into a cleaner config
    // For now, let's just log it and move to simulation
    console.log("Deploying Agent Configuration:", { nodes, edges });
    
    // Navigate to simulation page
    navigate('/simulation');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
       <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Agent Architecture Builder</h1>
        <button 
          onClick={handleDeploy}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Deploy Agent
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">
        <Sidebar />
        <div className="flex-1 h-full">
          <FlowCanvas />
        </div>
      </div>
    </div>
  );
};

export default Builder;
