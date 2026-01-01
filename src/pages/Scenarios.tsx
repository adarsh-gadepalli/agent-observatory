import React from 'react';

const Scenarios: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Benchmark Scenarios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Travel Planner', desc: 'Complex multi-step planning with preferences' },
          { title: 'Research Assistant', desc: 'Parallel information gathering' },
          { title: 'Customer Support', desc: 'High volume, variable complexity routing' },
          { title: 'Code Debugger', desc: 'Deep reasoning and error correction' },
        ].map((scenario, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 cursor-pointer transition-colors group">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 mb-2">{scenario.title}</h3>
            <p className="text-slate-600">{scenario.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scenarios;

