import React from 'react';
import { Mic, Video, Users, MessageSquare, Headphones, Code } from 'lucide-react';

const ROOMS = [
  {
    id: 1,
    title: "React Learning Group",
    host: "Sarah Jen",
    avatar: "https://picsum.photos/id/10/50/50",
    listeners: 12,
    topic: "Frontend",
    type: "voice",
    tags: ["React", "Hooks", "Beginner"]
  },
  {
    id: 2,
    title: "Silent Study / Pomodoro 🍅",
    host: "StudyBot",
    avatar: "https://picsum.photos/id/11/50/50",
    listeners: 45,
    topic: "Study",
    type: "voice",
    tags: ["Focus", "No Mic"]
  },
  {
    id: 3,
    title: "Mock Interview Practice",
    host: "David Kim",
    avatar: "https://picsum.photos/id/12/50/50",
    listeners: 4,
    topic: "Career",
    type: "video",
    tags: ["Interview", "Algorithms"]
  },
  {
    id: 4,
    title: "Python Data Science Help",
    host: "Alex Chen",
    avatar: "https://picsum.photos/id/13/50/50",
    listeners: 8,
    topic: "Data",
    type: "voice",
    tags: ["Python", "Pandas"]
  },
  {
    id: 5,
    title: "Late Night Coding 🌙",
    host: "Maria G",
    avatar: "https://picsum.photos/id/14/50/50",
    listeners: 22,
    topic: "Chill",
    type: "voice",
    tags: ["Lofi", "Chat"]
  }
];

export const LiveRooms: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            Live Study Rooms 
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </h1>
          <p className="text-slate-400">Join real-time voice & video channels to learn with others.</p>
        </div>
        <button className="bg-[#a3e635] text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-[#bef264] transition-colors flex items-center gap-2">
          <Mic size={18} /> Create Room
        </button>
      </div>

      {/* Featured / Active Now */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROOMS.map((room) => (
          <div key={room.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-slate-500 transition-all group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={room.avatar} alt={room.host} className="w-10 h-10 rounded-full border-2 border-slate-700" />
                    <div className="absolute -bottom-1 -right-1 bg-slate-800 p-0.5 rounded-full">
                       {room.type === 'video' ? <Video size={12} className="text-blue-400" /> : <Mic size={12} className="text-green-400" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors truncate max-w-[150px]">{room.title}</h3>
                    <p className="text-xs text-slate-400">Hosted by {room.host}</p>
                  </div>
                </div>
                <div className="bg-slate-900 px-2 py-1 rounded-md text-xs font-medium text-slate-300 flex items-center gap-1">
                  <Users size={12} /> {room.listeners}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-6">
                {room.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full border border-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-bold text-sm transition-colors">
                  Join Room
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 rounded-lg transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
            {/* Visualizer Footer */}
            <div className="h-10 bg-slate-900/50 flex items-end justify-center gap-1 pb-2 px-4">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className="w-1 bg-slate-600 rounded-t-sm animate-pulse" 
                   style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}
                 ></div>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Quiet Study", icon: <Headphones className="text-purple-400" />, desc: "Focus music, no talking" },
          { label: "Code Help", icon: <Code className="text-blue-400" />, desc: "Get debugging help" },
          { label: "Networking", icon: <Users className="text-green-400" />, desc: "Meet new people" },
          { label: "Interviews", icon: <Video className="text-orange-400" />, desc: "Mock practice" },
        ].map((cat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="mb-2 bg-slate-900 w-10 h-10 rounded-lg flex items-center justify-center">
              {cat.icon}
            </div>
            <h3 className="font-bold text-white">{cat.label}</h3>
            <p className="text-xs text-slate-400">{cat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};