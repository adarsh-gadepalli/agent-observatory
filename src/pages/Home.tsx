import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Performance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Runs', value: '1,203' },
          { label: 'Avg Latency', value: '4.2s' },
          { label: 'Avg Cost', value: '$0.08' },
          { label: 'Success Rate', value: '94%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            <div className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-96 flex items-center justify-center text-slate-400">
        Performance Chart Placeholder
      </div>
    </div>
  );
};

export default Home;

