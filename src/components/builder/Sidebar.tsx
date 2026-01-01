import React from 'react';
import { Database, Brain, Zap, Cpu } from 'lucide-react';

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const categories = [
    {
      title: 'Memory',
      icon: Database,
      items: [
        { type: 'memory', label: 'No Memory (Stateless)' },
        { type: 'memory', label: 'Short-term (Buffer)' },
        { type: 'memory', label: 'Long-term (RAG)' },
      ]
    },
    {
      title: 'Planning',
      icon: Brain,
      items: [
        { type: 'planning', label: 'ReAct' },
        { type: 'planning', label: 'Plan-and-Execute' },
        { type: 'planning', label: 'Tree-of-Thoughts' },
      ]
    },
    {
      title: 'Execution',
      icon: Zap,
      items: [
        { type: 'execution', label: 'Sequential' },
        { type: 'execution', label: 'Parallel' },
        { type: 'execution', label: 'Batched' },
      ]
    },
    {
      title: 'LLM Routing',
      icon: Cpu,
      items: [
        { type: 'routing', label: 'Single Model' },
        { type: 'routing', label: 'Cascade' },
        { type: 'routing', label: 'Specialized' },
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 overflow-y-auto h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Components</h2>
      <div className="space-y-6">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-2 text-slate-500 font-medium text-sm">
              <cat.icon className="w-4 h-4" />
              {cat.title}
            </div>
            <div className="space-y-2">
              {cat.items.map((item, j) => (
                <div
                  key={j}
                  className="bg-white border border-slate-200 p-2 rounded cursor-grab hover:border-blue-500 hover:shadow-sm transition-all text-sm text-slate-700 active:cursor-grabbing"
                  onDragStart={(event) => onDragStart(event, item.type, item.label)}
                  draggable
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

