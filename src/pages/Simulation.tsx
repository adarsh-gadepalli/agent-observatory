import React from 'react';
import { ExecutionTimeline } from '../components/simulation/ExecutionTimeline';
import { FlowCanvas } from '../components/builder/FlowCanvas';

const Simulation: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Live Execution: Travel Planner</h1>
        <div className="flex gap-2">
            <span className="text-sm text-slate-500 flex items-center gap-1">
                Status: <span className="text-green-600 font-medium">Running</span>
            </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-semibold text-slate-700">Architecture State</h2>
          </div>
          <div className="flex-1 relative">
            {/* We reuse the FlowCanvas here, ideally in read-only mode */}
            <div className="absolute inset-0 pointer-events-none opacity-80">
                <FlowCanvas />
            </div>
            {/* Overlay to show activity */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Could add glowing effects on nodes here */}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-semibold text-slate-700">Execution Stream</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <ExecutionTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
