import React, { useState } from 'react';
import { Swords, Trophy, Timer, Flame, Code, Zap } from 'lucide-react';

export const SkillWars: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lobby' | 'battle'>('lobby');

  if (activeTab === 'battle') {
    return <BattleView onLeave={() => setActiveTab('lobby')} />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 rounded-3xl p-8 border border-red-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Swords size={150} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white italic tracking-wider flex items-center gap-3">
            <Swords size={40} className="text-red-500" />
            SKILL WARS
          </h1>
          <p className="text-red-200 mt-2 max-w-xl">
            Challenge other developers to 1v1 live coding battles. Win XP, climb the leaderboard, and earn the title of Grandmaster.
          </p>
          <div className="flex gap-4 mt-8">
            <button onClick={() => setActiveTab('battle')} className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all hover:scale-105 flex items-center gap-2">
              <Zap size={20} fill="currentColor" /> Quick Match
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 px-6 py-3 rounded-xl font-bold transition-colors">
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Challenges */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="text-orange-500" /> Live Battles
          </h2>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center justify-between hover:border-red-500/50 transition-colors">
               <div className="flex items-center gap-4">
                 <div className="flex -space-x-2">
                   <img src={`https://picsum.photos/id/${i+20}/40/40`} className="w-10 h-10 rounded-full border-2 border-slate-800" alt="P1" />
                   <img src={`https://picsum.photos/id/${i+21}/40/40`} className="w-10 h-10 rounded-full border-2 border-slate-800" alt="P2" />
                 </div>
                 <div>
                   <p className="font-bold text-white text-sm">Python Algorithms</p>
                   <p className="text-xs text-slate-400">@Alex vs @Sarah • 2min remaining</p>
                 </div>
               </div>
               <button className="text-red-400 text-sm font-bold border border-red-500/30 px-4 py-1.5 rounded-lg hover:bg-red-500/10">
                 Spectate
               </button>
            </div>
          ))}
        </div>

        {/* User Stats */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/50 p-3 rounded-xl text-center">
              <Trophy className="mx-auto text-yellow-400 mb-1" size={20} />
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-slate-500">Wins</p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl text-center">
              <Swords className="mx-auto text-red-400 mb-1" size={20} />
              <p className="text-xl font-bold">15</p>
              <p className="text-xs text-slate-500">Battles</p>
            </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-sm">
               <span className="text-slate-400">Current Rank</span>
               <span className="font-bold text-white">Silver II</span>
             </div>
             <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
               <div className="w-[70%] h-full bg-gradient-to-r from-slate-400 to-white rounded-full"></div>
             </div>
             <p className="text-xs text-center text-slate-500">30 XP to Gold I</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BattleView: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Battle Header */}
      <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
        <button onClick={onLeave} className="text-slate-400 hover:text-white font-bold text-sm">
          ← Surrender
        </button>
        <div className="flex items-center gap-4 bg-slate-900 px-6 py-2 rounded-full border border-red-500/30">
          <Timer className="text-red-500 animate-pulse" size={18} />
          <span className="font-mono text-xl font-bold text-white">09:42</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-300">Opponent: </span>
          <img src="https://picsum.photos/id/22/30/30" className="w-8 h-8 rounded-full" alt="Opponent" />
          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Arena */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-x divide-slate-700 overflow-hidden">
        {/* Problem Description */}
        <div className="p-6 overflow-y-auto bg-slate-900/50">
          <h2 className="text-2xl font-bold mb-4">Problem: Two Sum</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Given an array of integers <code className="bg-slate-800 px-1 py-0.5 rounded text-red-300">nums</code> and an integer <code className="bg-slate-800 px-1 py-0.5 rounded text-red-300">target</code>, return indices of the two numbers such that they add up to target.
          </p>
          <div className="bg-slate-800 p-4 rounded-xl mb-4 border border-slate-700">
            <p className="font-mono text-sm text-green-400 mb-2">Input: nums = [2,7,11,15], target = 9</p>
            <p className="font-mono text-sm text-blue-400">Output: [0,1]</p>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex flex-col bg-[#1e1e1e]">
          <div className="flex bg-[#252526] text-slate-400 text-xs">
            <div className="px-4 py-2 bg-[#1e1e1e] text-white border-t-2 border-blue-500">solution.py</div>
          </div>
          <div className="flex-1 p-4 font-mono text-sm text-slate-300 leading-6">
            <p><span className="text-purple-400">def</span> <span className="text-yellow-200">twoSum</span>(nums, target):</p>
            <p className="pl-4 text-slate-500"># Write your solution here</p>
            <p className="pl-4"><span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> range(len(nums)):</p>
            <p className="pl-8">...</p>
          </div>
          <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-end">
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Code size={18} /> Submit Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};