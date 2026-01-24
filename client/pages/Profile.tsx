import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Mail, Edit3, Award, Star, CheckCircle, Github, Linkedin, Twitter, Flag, PieChart, Activity, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header / Cover */}
      <div className="relative">
        <div className="h-48 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Cover" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        
        {/* Profile Info Overlay */}
        <div className="px-6 md:px-10 pb-6">
           <div className="relative -mt-20 mb-4 flex flex-col md:flex-row items-end md:items-end gap-6">
              <div className="relative">
                 <img 
                   src="https://picsum.photos/200/200" 
                   alt="Profile" 
                   className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-900 shadow-2xl" 
                 />
                 <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"></div>
              </div>
              
              <div className="flex-1 mb-2">
                 <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                   Alex Johnson 
                   <CheckCircle size={20} className="text-blue-400" fill="currentColor" color="#0f172a" />
                 </h1>
                 <p className="text-slate-300 text-lg">Senior Frontend Engineer & Mentor</p>
                 <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={16} /> San Francisco, CA</span>
                    <span className="flex items-center gap-1"><LinkIcon size={16} /> alexjohnson.dev</span>
                    <span className="flex items-center gap-1"><Calendar size={16} /> Joined March 2023</span>
                 </div>
              </div>

              <div className="flex gap-3 mb-2">
                <button 
                  onClick={() => navigate('/messages')}
                  className="bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <Mail size={18} /> Message
                </button>
                <button 
                  onClick={() => addToast('Connection request sent!', 'success')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30"
                >
                  Connect
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-700 pb-1">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Overview
        </button>
        <button 
           onClick={() => setActiveTab('analytics')}
           className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          AI Analytics
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Left Column: Stats & About */}
          <div className="space-y-6">
             {/* Reputation Card */}
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
               <h3 className="text-lg font-bold mb-4">Reputation</h3>
               <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.9</div>
                    <div className="flex text-yellow-400 text-xs justify-center my-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <div className="text-xs text-slate-500">Rating</div>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">45</div>
                    <div className="text-xs text-slate-500 mt-1">Swaps</div>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1.2k</div>
                    <div className="text-xs text-slate-500 mt-1">Followers</div>
                  </div>
               </div>
               <button className="w-full bg-slate-700/50 hover:bg-slate-700 text-blue-400 text-sm font-bold py-2 rounded-lg transition-colors">
                 View All Reviews
               </button>
             </div>

             {/* About */}
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold">About</h3>
                 <button className="text-slate-400 hover:text-white"><Edit3 size={16} /></button>
               </div>
               <p className="text-slate-300 text-sm leading-relaxed mb-4">
                 Passionate frontend developer with 5+ years of experience in React, TypeScript, and modern UI libraries. 
                 I love teaching and mentoring others. Currently looking to improve my backend skills in Node.js and Python.
               </p>
               <div className="flex gap-2">
                 <div className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white cursor-pointer transition-colors"><Github size={20} /></div>
                 <div className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white cursor-pointer transition-colors"><Linkedin size={20} /></div>
                 <div className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white cursor-pointer transition-colors"><Twitter size={20} /></div>
               </div>
             </div>

             {/* Skills */}
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
               <h3 className="text-lg font-bold mb-4">Top Skills</h3>
               <div className="flex flex-wrap gap-2">
                 {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Figma', 'GraphQL'].map(skill => (
                   <span key={skill} className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-sm text-slate-300 hover:border-blue-500 hover:text-blue-400 cursor-default transition-colors">
                     {skill}
                   </span>
                 ))}
               </div>
             </div>
          </div>

          {/* Right Column: Badges & Portfolio */}
          <div className="lg:col-span-2 space-y-6">
             {/* Badges - Gamification */}
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Award size={100} />
               </div>
               <h3 className="text-lg font-bold mb-6">Earned Badges</h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {[
                   { name: "Top Mentor", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
                   { name: "Code Ninja", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
                   { name: "Early Bird", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                   { name: "Community Star", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                 ].map((badge, i) => (
                   <div key={i} className={`${badge.bg} ${badge.border} border rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105 cursor-pointer`}>
                     <Award className={badge.color} size={32} />
                     <span className={`text-xs font-bold ${badge.color}`}>{badge.name}</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Timeline Journey */}
             <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                   <Flag size={20} className="text-green-400" /> My Journey
                </h3>
                <div className="relative pl-4">
                   {/* Line */}
                   <div className="absolute top-0 left-[19px] h-full w-0.5 bg-gradient-to-b from-blue-500 to-slate-700"></div>

                   <div className="space-y-8">
                      {[
                        { year: 'Oct 2024', title: 'Won "AI Hackathon"', desc: 'Team placed 1st in the Global AI Challenge.', icon: '🏆' },
                        { year: 'Aug 2024', title: 'Reached 100 Swaps', desc: 'Successfully mentored 100 students.', icon: '🤝' },
                        { year: 'May 2024', title: 'Certified React Dev', desc: 'Passed the advanced React skill verification.', icon: '📜' },
                        { year: 'Mar 2023', title: 'Joined SkillSwap', desc: 'Started the journey.', icon: '🚀' }
                      ].map((item, i) => (
                         <div key={i} className="relative pl-8 group">
                            {/* Dot */}
                            <div className="absolute left-0 top-1 w-10 h-10 bg-slate-800 border-4 border-blue-500 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                               <span className="text-sm">{item.icon}</span>
                            </div>
                            
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                               <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">{item.year}</span>
                               <h4 className="text-white font-bold text-lg">{item.title}</h4>
                               <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Portfolio / Recent Work */}
             <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <h3 className="text-xl font-bold">Portfolio & Projects</h3>
                 <button className="text-blue-400 text-sm font-bold hover:underline">View All</button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group hover:border-blue-500/50 transition-colors">
                   <div className="h-40 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=800&q=80" alt="Project" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">View Project</button>
                     </div>
                   </div>
                   <div className="p-4">
                     <h4 className="font-bold text-lg mb-1">E-Commerce Dashboard</h4>
                     <p className="text-slate-400 text-sm mb-3">A complete analytics dashboard built with React and D3.js</p>
                     <div className="flex gap-2">
                       <span className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded">React</span>
                       <span className="text-[10px] bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded">D3.js</span>
                     </div>
                   </div>
                 </div>

                 <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group hover:border-blue-500/50 transition-colors">
                   <div className="h-40 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&w=800&q=80" alt="Project" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm">View Project</button>
                     </div>
                   </div>
                   <div className="p-4">
                     <h4 className="font-bold text-lg mb-1">Finance Mobile App</h4>
                     <p className="text-slate-400 text-sm mb-3">Cross-platform mobile application for personal finance tracking.</p>
                     <div className="flex gap-2">
                       <span className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded">Flutter</span>
                       <span className="text-[10px] bg-green-900/30 text-green-300 px-2 py-1 rounded">Firebase</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
           {/* Skill Gap Analysis */}
           <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <PieChart className="text-purple-400" size={20} /> Skill Gap Analysis
              </h3>
              <p className="text-slate-400 text-sm mb-6">Comparing your skills to the average "Senior React Developer".</p>
              
              <div className="space-y-6">
                 {[
                   { skill: 'React', val: 95, target: 90, color: 'bg-blue-500' },
                   { skill: 'TypeScript', val: 85, target: 90, color: 'bg-blue-400' },
                   { skill: 'Node.js', val: 60, target: 80, color: 'bg-yellow-500' },
                   { skill: 'GraphQL', val: 40, target: 75, color: 'bg-red-500' },
                 ].map((item, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-sm mb-1">
                          <span className="font-bold text-white">{item.skill}</span>
                          <span className="text-slate-400">{item.val}% / {item.target}%</span>
                       </div>
                       <div className="w-full bg-slate-700 h-2.5 rounded-full relative">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                          <div className="absolute top-0 h-full w-1 bg-white opacity-50" style={{ left: `${item.target}%` }} title="Target Level"></div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="mt-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                 <h4 className="text-sm font-bold text-white mb-2">AI Recommendation</h4>
                 <p className="text-xs text-slate-400">
                    To reach Senior level, focus on <strong>GraphQL</strong> and <strong>Node.js</strong>. 
                    We recommend taking the "Advanced Backend for Frontend Devs" course.
                 </p>
                 <button className="mt-3 text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg transition-colors">
                    View Recommended Course
                 </button>
              </div>
           </div>

           {/* Growth Chart (Mock) */}
           <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <TrendingUp className="text-green-400" size={20} /> Growth Trajectory
              </h3>
              <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-4 pt-8 border-b border-slate-700 relative">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Activity size={100} />
                 </div>
                 {[30, 45, 40, 60, 55, 75, 85, 90, 95].map((h, i) => (
                   <div key={i} className="w-full bg-blue-500/20 hover:bg-blue-500 rounded-t-sm transition-all group relative" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h} XP
                      </div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                 <span>Jan</span>
                 <span>Feb</span>
                 <span>Mar</span>
                 <span>Apr</span>
                 <span>May</span>
                 <span>Jun</span>
                 <span>Jul</span>
                 <span>Aug</span>
                 <span>Sep</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};