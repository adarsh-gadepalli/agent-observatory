import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Loader2 } from 'lucide-react';

interface Step {
  id: string;
  type: 'reasoning' | 'tool' | 'memory';
  content: string;
  status: 'pending' | 'running' | 'completed';
  duration?: string;
  cost?: string;
}

export const ExecutionTimeline = () => {
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', type: 'reasoning', content: 'Analyzing user request: "Book a flight to NYC"', status: 'completed', duration: '1.2s', cost: '$0.002' },
    { id: '2', type: 'memory', content: 'Retrieving user preferences...', status: 'running', duration: '0.5s' },
    { id: '3', type: 'tool', content: 'Search Flights API', status: 'pending' },
    { id: '4', type: 'reasoning', content: 'Synthesizing results', status: 'pending' },
  ]);

  // Mock simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSteps(current => {
        const runningIndex = current.findIndex(s => s.status === 'running');
        if (runningIndex === -1) return current;

        const next = [...current];
        // Complete current
        next[runningIndex] = { ...next[runningIndex], status: 'completed', duration: '0.8s' };
        
        // Start next if exists
        if (runningIndex + 1 < next.length) {
          next[runningIndex + 1] = { ...next[runningIndex + 1], status: 'running' };
        }
        
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 p-4 h-full overflow-y-auto">
      <div className="space-y-6">
        {steps.map((step) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative pl-8 border-l-2 ${
              step.status === 'completed' ? 'border-green-500' : 
              step.status === 'running' ? 'border-blue-500' : 'border-slate-200'
            }`}
          >
            <div className={`absolute -left-[9px] top-0 bg-white rounded-full p-0.5 ${
               step.status === 'completed' ? 'text-green-500' : 
               step.status === 'running' ? 'text-blue-500' : 'text-slate-300'
            }`}>
              {step.status === 'completed' ? <CheckCircle2 size={16} /> :
               step.status === 'running' ? <Loader2 size={16} className="animate-spin" /> :
               <Circle size={16} />}
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  step.type === 'reasoning' ? 'bg-purple-100 text-purple-700' :
                  step.type === 'tool' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {step.type}
                </span>
                {step.duration && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {step.duration}</span>
                    {step.cost && <span>{step.cost}</span>}
                  </div>
                )}
              </div>
              <p className="text-slate-700 font-medium">{step.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

