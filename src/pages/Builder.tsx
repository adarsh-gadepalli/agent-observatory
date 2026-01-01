import React from 'react';
import { Sidebar } from '../components/builder/Sidebar';
import { FlowCanvas } from '../components/builder/FlowCanvas';

const Builder: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
       <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Agent Architecture Builder</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
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
