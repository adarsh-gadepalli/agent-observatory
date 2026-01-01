import React from 'react';

const Learning: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Learning Modules</h1>
      <div className="space-y-4">
        {[
          { title: 'Module 1: Why Agents Need Memory', status: 'Completed', color: 'bg-green-100 text-green-700' },
          { title: 'Module 2: The Cost of Planning', status: 'In Progress', color: 'bg-blue-100 text-blue-700' },
          { title: 'Module 3: Tool Execution Patterns', status: 'Locked', color: 'bg-slate-100 text-slate-500' },
          { title: 'Module 4: Smart LLM Routing', status: 'Locked', color: 'bg-slate-100 text-slate-500' },
        ].map((module, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${module.color}`}>
              {module.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;

