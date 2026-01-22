import React, { useState } from 'react';
import { Briefcase, Users, Plus, MoreHorizontal, Search, Filter, GripVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

interface Candidate {
  id: number;
  name: string;
  role: string;
  score: number;
  avatar: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  candidates: Candidate[];
}

export const Recruiter: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeView, setActiveView] = useState<'kanban' | 'list'>('kanban');

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'applied',
      title: 'Applied',
      color: 'border-blue-500',
      candidates: [
        { id: 1, name: "Alex Johnson", role: "Frontend Dev", score: 95, avatar: "https://picsum.photos/id/64/40/40" },
        { id: 2, name: "Maria Garcia", role: "UX Designer", score: 88, avatar: "https://picsum.photos/id/65/40/40" },
      ]
    },
    {
      id: 'screening',
      title: 'AI Screening',
      color: 'border-yellow-500',
      candidates: [
        { id: 3, name: "David Kim", role: "Backend Dev", score: 92, avatar: "https://picsum.photos/id/66/40/40" },
      ]
    },
    {
      id: 'interview',
      title: 'Interview',
      color: 'border-purple-500',
      candidates: [
        { id: 4, name: "Sarah Lee", role: "Product Manager", score: 97, avatar: "https://picsum.photos/id/67/40/40" },
      ]
    },
    {
      id: 'offer',
      title: 'Offer Sent',
      color: 'border-green-500',
      candidates: []
    }
  ]);

  const moveCandidate = (colId: string, candidateId: number) => {
    // Simplified move logic for demo purposes - moves to next column or wraps
    const colIndex = columns.findIndex(c => c.id === colId);
    const nextColIndex = (colIndex + 1) % columns.length;
    
    const sourceCol = columns[colIndex];
    const targetCol = columns[nextColIndex];
    const candidate = sourceCol.candidates.find(c => c.id === candidateId);

    if (candidate) {
      const newColumns = [...columns];
      newColumns[colIndex].candidates = sourceCol.candidates.filter(c => c.id !== candidateId);
      newColumns[nextColIndex].candidates.push(candidate);
      setColumns(newColumns);
      addToast(`Moved ${candidate.name} to ${targetCol.title}`, 'success');
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold">ATS Pipeline</h1>
           <p className="text-slate-400">Manage your candidates efficiently.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => navigate('/shop')} 
             className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-700"
           >
             Upgrade Plan
           </button>
           <button className="bg-[#a3e635] text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-[#bef264] flex items-center gap-2">
             <Plus size={18} /> Post Job
           </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Candidates', val: '142', icon: Users, color: 'text-blue-400' },
          { label: 'Avg Match Score', val: '88%', icon: Briefcase, color: 'text-green-400' },
          { label: 'Interviews', val: '12', icon: Users, color: 'text-purple-400' },
          { label: 'Hired', val: '4', icon: Users, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
             <div className={`p-2 bg-slate-900 rounded-lg ${stat.color}`}>
               <stat.icon size={20} />
             </div>
             <div>
               <p className="text-slate-400 text-xs">{stat.label}</p>
               <p className="text-xl font-bold">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
         <div className="relative w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
           <input type="text" placeholder="Search candidates..." className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm focus:border-blue-500 outline-none text-slate-200" />
         </div>
         <div className="flex gap-2">
           <button className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700">
             <Filter size={18} />
           </button>
           <div className="bg-slate-800 rounded-lg border border-slate-700 p-1 flex">
             <button onClick={() => setActiveView('kanban')} className={`px-3 py-1 rounded text-sm ${activeView === 'kanban' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>Board</button>
             <button onClick={() => setActiveView('list')} className={`px-3 py-1 rounded text-sm ${activeView === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>List</button>
           </div>
         </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-[1000px]">
           {columns.map(col => (
             <div key={col.id} className="flex-1 flex flex-col min-w-[280px]">
                {/* Column Header */}
                <div className={`flex justify-between items-center mb-4 p-3 bg-slate-800 rounded-xl border-t-4 ${col.color}`}>
                   <h3 className="font-bold flex items-center gap-2">
                     {col.title}
                     <span className="bg-slate-700 text-xs py-0.5 px-2 rounded-full text-slate-300">{col.candidates.length}</span>
                   </h3>
                   <MoreHorizontal size={16} className="text-slate-500 cursor-pointer" />
                </div>

                {/* Drop Zone */}
                <div className="flex-1 bg-slate-800/30 rounded-xl p-3 space-y-3 overflow-y-auto custom-scrollbar border border-slate-800/50">
                   {col.candidates.map(candidate => (
                     <div key={candidate.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm hover:border-blue-500/50 transition-all cursor-move group relative">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-grab">
                          <GripVertical size={14} className="text-slate-500" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                           <img src={candidate.avatar} className="w-10 h-10 rounded-full border border-slate-600" alt={candidate.name} />
                           <div>
                             <h4 className="font-bold text-sm">{candidate.name}</h4>
                             <p className="text-xs text-slate-400">{candidate.role}</p>
                           </div>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                             candidate.score >= 90 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                           }`}>
                             {candidate.score}% Match
                           </span>
                           <button 
                             onClick={() => moveCandidate(col.id, candidate.id)}
                             className="text-xs text-blue-400 hover:underline"
                           >
                             Move →
                           </button>
                        </div>
                     </div>
                   ))}
                   <button className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 text-sm hover:border-slate-500 hover:text-slate-400 transition-colors">
                     + Add Candidate
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};