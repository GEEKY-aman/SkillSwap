import React, { useState } from 'react';
import { Sparkles, CheckCircle, Circle, ArrowRight, PlayCircle, BookOpen, Clock, ChevronRight } from 'lucide-react';

interface Module {
  id: number;
  week: string;
  title: string;
  description: string;
  resources: string[];
  completed: boolean;
}

export const Roadmap: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [targetRole, setTargetRole] = useState("Full Stack Developer");

  const ROADMAP_DATA: Module[] = [
    {
      id: 1,
      week: "Week 1-2",
      title: "Foundations & HTML/CSS Mastery",
      description: "Understand the core structure of the web. Deep dive into semantic HTML5, modern CSS flexbox/grid, and responsive design principles.",
      resources: ["MDN Web Docs", "CSS Tricks Flexbox Guide", "Build a Portfolio Project"],
      completed: true
    },
    {
      id: 2,
      week: "Week 3-6",
      title: "JavaScript Deep Dive",
      description: "Master ES6+, closures, async/await, and DOM manipulation. This is the most critical step before learning frameworks.",
      resources: ["JavaScript.info", "Namaste JavaScript", "Build a To-Do App"],
      completed: false
    },
    {
      id: 3,
      week: "Week 7-10",
      title: "React & Ecosystem",
      description: "Learn functional components, hooks, state management (Redux/Zustand), and React Router.",
      resources: ["React Official Docs", "Epic React by Kent C. Dodds"],
      completed: false
    },
    {
      id: 4,
      week: "Week 11-12",
      title: "Backend Basics (Node.js)",
      description: "Introduction to servers, REST APIs, and connecting to a database (MongoDB/PostgreSQL).",
      resources: ["Node.js Crash Course", "Express Docs"],
      completed: false
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowRoadmap(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium text-sm">
          <Sparkles size={16} />
          AI-Powered Learning
        </div>
        <h1 className="text-4xl font-bold">Career Path Generator</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Not sure what to learn next? Let our AI analyze industry trends and your current skills to build a personalized roadmap.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <label className="block text-sm font-medium text-slate-300 mb-2">I want to become a...</label>
        <div className="flex flex-col sm:flex-row gap-4">
           <select 
             value={targetRole}
             onChange={(e) => setTargetRole(e.target.value)}
             className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
           >
             <option>Full Stack Developer</option>
             <option>UI/UX Designer</option>
             <option>Data Scientist</option>
             <option>Mobile App Developer (Flutter)</option>
             <option>DevOps Engineer</option>
           </select>
           <button 
             onClick={handleGenerate}
             disabled={isGenerating}
             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
           >
             {isGenerating ? (
               <>
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 Generating Plan...
               </>
             ) : (
               <>
                 <Sparkles size={18} />
                 Generate Roadmap
               </>
             )}
           </button>
        </div>
      </div>

      {/* Results Section */}
      {showRoadmap && (
        <div className="animate-fade-in-up space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold">Your Path to {targetRole}</h2>
             <span className="text-slate-400 text-sm">Estimated Time: 6 Months</span>
          </div>

          <div className="relative border-l-2 border-slate-700 ml-3 space-y-8 pb-8">
            {ROADMAP_DATA.map((module, index) => (
              <div key={module.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${module.completed ? 'bg-green-500 border-green-500' : 'bg-slate-900 border-slate-600'}`}></div>
                
                <div className={`p-6 rounded-2xl border transition-all ${module.completed ? 'bg-slate-800/50 border-green-500/30' : 'bg-slate-800 border-slate-700 hover:border-blue-500/50'}`}>
                   <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1 block">{module.week}</span>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          {module.title}
                          {module.completed && <CheckCircle size={18} className="text-green-500" />}
                        </h3>
                      </div>
                      {!module.completed && (
                        <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-full transition-colors">
                          Mark Complete
                        </button>
                      )}
                   </div>
                   
                   <p className="text-slate-400 mb-4">{module.description}</p>
                   
                   <div className="bg-slate-900/50 rounded-xl p-4">
                     <p className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                       <BookOpen size={16} /> Recommended Resources
                     </p>
                     <ul className="space-y-2">
                       {module.resources.map((res, i) => (
                         <li key={i} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
                           <PlayCircle size={14} /> {res}
                         </li>
                       ))}
                     </ul>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps CTA */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to start the next module?</h3>
            <p className="text-slate-400 mb-6">Take a skill assessment quiz to verify your knowledge and earn a badge.</p>
            <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors">
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};