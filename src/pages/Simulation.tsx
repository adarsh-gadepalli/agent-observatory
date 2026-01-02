import React, { useEffect, useState, useRef } from 'react';
import { ExecutionTimeline } from '../components/simulation/ExecutionTimeline';
import { FlowCanvas } from '../components/builder/FlowCanvas';

// Reuse the Step interface or import it if you moved it to a types file
interface Step {
  id: string;
  type: 'reasoning' | 'tool' | 'memory';
  content: string;
  status: 'pending' | 'running' | 'completed';
  duration?: string;
  cost?: string;
}

const Simulation: React.FC = () => {
  const [status, setStatus] = useState('Disconnected');
  const [steps, setSteps] = useState<Step[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 1. Connect to Backend
    ws.current = new WebSocket('ws://localhost:8000/ws');

    ws.current.onopen = () => {
      setStatus('Connected');
      // 2. Automatically start a simulation run for testing
      ws.current?.send(JSON.stringify({ 
        action: "start_simulation",
        config: { model: "gpt-4", memory: "redis" } 
      }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Handle "complete" message
      if (data.type === 'complete') {
        setStatus('Finished');
        return;
      }

      // 3. Update Timeline
      // If the backend sends a step with the same ID, update it.
      // Otherwise, add it as a new step.
      setSteps(prev => {
        // If we received a step object (has 'type' reasoning/tool/memory)
        if (data.type && data.type !== 'complete') {
            const stepId = data.id || data.content; // Fallback to content as key if ID missing
            const existingIndex = prev.findIndex(s => s.id === stepId || s.content === data.content);
            
            if (existingIndex >= 0) {
                const newSteps = [...prev];
                newSteps[existingIndex] = { ...newSteps[existingIndex], ...data };
                return newSteps;
            } else {
                return [...prev, { id: stepId, ...data }];
            }
        }
        return prev;
      });
    };

    ws.current.onclose = () => setStatus('Disconnected');

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Live Execution</h1>
        <div className="flex gap-2">
            <span className="text-sm text-slate-500 flex items-center gap-1">
                Status: <span className={`font-medium ${
                    status === 'Connected' ? 'text-green-600' : 
                    status === 'Finished' ? 'text-blue-600' : 'text-red-500'
                }`}>{status}</span>
            </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 h-full">
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
           <div className="p-4 border-b border-slate-100 bg-slate-50">
             <h2 className="font-semibold text-slate-700">Architecture State</h2>
           </div>
           <div className="flex-1 relative">
             <div className="absolute inset-0 pointer-events-none opacity-80">
                 <FlowCanvas />
             </div>
           </div>
         </div>
         
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
           <div className="p-4 border-b border-slate-100 bg-slate-50">
             <h2 className="font-semibold text-slate-700">Execution Stream</h2>
           </div>
           <div className="flex-1 overflow-hidden">
             {/* Pass the real steps to the timeline */}
             <ExecutionTimeline steps={steps} /> 
           </div>
         </div>
       </div>
    </div>
  );
};

export default Simulation;
