<<<<<<< HEAD
import React from 'react';
import { ArrowRight, Star, PlayCircle, Users, Zap, Briefcase, Award, Flame, Gift, Target, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

export const Home: React.FC = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-10">
      {/* Gamification Strip (NEW) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Card */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex items-center justify-between">
           <div>
             <p className="text-slate-400 text-xs font-bold uppercase mb-1">Daily Streak</p>
             <h3 className="text-2xl font-bold text-white flex items-center gap-2">
               5 Days <Flame className="text-orange-500 fill-orange-500 animate-pulse" size={24} />
             </h3>
           </div>
           <div className="flex gap-1">
             {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-8 bg-orange-500 rounded-full"></div>)}
             <div className="w-2 h-8 bg-slate-700 rounded-full"></div>
             <div className="w-2 h-8 bg-slate-700 rounded-full"></div>
           </div>
        </div>

        {/* Daily Quest */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden group">
           <div className="relative z-10">
             <div className="flex justify-between items-start mb-2">
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase mb-1">Daily Quest</p>
                 <h3 className="text-lg font-bold text-white">Complete 1 Quiz</h3>
               </div>
               <Target className="text-blue-400" size={24} />
             </div>
             <div className="w-full bg-slate-700 h-2 rounded-full mb-1">
               <div className="w-0 h-full bg-blue-500 rounded-full group-hover:w-full transition-all duration-1000"></div>
             </div>
             <p className="text-xs text-right text-slate-500">0/1 Completed</p>
           </div>
        </div>

        {/* Mystery Box */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => addToast("Come back tomorrow to open!", "info")}>
           <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
             <Gift size={80} />
           </div>
           <div className="relative z-10">
             <p className="text-purple-300 text-xs font-bold uppercase mb-1">Mystery Box</p>
             <h3 className="text-lg font-bold text-white mb-2">Weekly Reward</h3>
             <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 transition-colors">
               Tap to Open
             </button>
           </div>
        </div>
      </div>

      {/* Advanced Hero Section */}
      <div className="relative rounded-3xl overflow-hidden min-h-[450px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Collaboration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            #1 Platform for Skill Exchange
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Master new skills through <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              peer-to-peer learning
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
            Connect with industry experts, swap knowledge, and accelerate your career growth. 
            Join 50,000+ developers exchanging skills daily.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/skills" className="bg-[#a3e635] hover:bg-[#bef264] text-slate-900 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
              Find a Mentor
            </Link>
            <Link to="/jobs" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-md flex items-center gap-2">
              <Briefcase size={20} />
              Explore Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Skills Categories */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Skills</h2>
            <p className="text-slate-400">Find the perfect mentor to help you master these technologies.</p>
          </div>
          <Link to="/skills" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
            View All Categories <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Frontend Dev", count: "1.2k Mentors", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
            { name: "UI/UX Design", count: "850 Mentors", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
            { name: "Data Science", count: "600 Mentors", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
            { name: "Mobile Dev", count: "450 Mentors", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }
          ].map((cat, idx) => (
            <Link to="/skills" key={idx} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer block">
              <div className="absolute inset-0">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                <p className="text-slate-300 text-sm flex items-center gap-2">
                  <Users size={14} /> {cat.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Mentors Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Top Rated Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
             { name: "Elena Rodriguez", role: "Senior Product Designer", company: "Adobe", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
             { name: "David Chen", role: "Staff Engineer", company: "Google", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
             { name: "Sarah Miller", role: "Tech Lead", company: "Netflix", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
          ].map((mentor, i) => (
            <div key={i} className="bg-slate-800 rounded-2xl p-1 border border-slate-700 hover:border-slate-500 transition-all">
              <div className="bg-slate-900/50 p-6 rounded-xl h-full flex flex-col items-center text-center">
                 <div className="relative mb-4">
                   <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-blue-500 to-green-400">
                     <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover rounded-full border-4 border-slate-900" />
                   </div>
                   <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-slate-900">
                     TOP 1%
                   </div>
                 </div>
                 <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                 <p className="text-blue-400 text-sm mb-4">{mentor.role} at {mentor.company}</p>
                 
                 <div className="flex items-center gap-1 text-yellow-400 mb-6 bg-yellow-400/10 px-3 py-1 rounded-full">
                   <Star size={14} fill="currentColor" />
                   <span className="text-sm font-bold">5.0</span>
                   <span className="text-slate-500 text-xs ml-1">(200+ Reviews)</span>
                 </div>

                 <button 
                    onClick={() => navigate('/profile')}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors text-sm"
                 >
                   View Profile
                 </button>
              </div>
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Zap, Star, Trophy, Gift, ArrowRight, Sparkles } from 'lucide-react';
import { dashboardService, userService } from '../src/services/api';
import { useAuth } from '../components/AuthContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboardService.getDashboard();
        setDashboard(res.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const streak = dashboard?.user?.streak || 0;
  const coins = dashboard?.user?.coins || 0;
  const stats = dashboard?.stats || { jobsApplied: 0, hackathonsJoined: 0, coursesEnrolled: 0, quizzesCompleted: 0 };
  const topMentors = dashboard?.topMentors || [];

  const dailyQuests = [
    { title: 'Complete a Quiz', xp: 50, progress: stats.quizzesCompleted > 0 ? 100 : 0 },
    { title: 'Apply to a Job', xp: 30, progress: stats.jobsApplied > 0 ? 100 : 0 },
    { title: 'Join a Hackathon', xp: 40, progress: stats.hackathonsJoined > 0 ? 100 : 0 },
  ];

  const skillCategories = [
    { name: 'Web Dev', emoji: '🌐', color: 'from-blue-500 to-cyan-500' },
    { name: 'AI/ML', emoji: '🤖', color: 'from-purple-500 to-pink-500' },
    { name: 'Design', emoji: '🎨', color: 'from-orange-500 to-red-500' },
    { name: 'Mobile', emoji: '📱', color: 'from-green-500 to-emerald-500' },
    { name: 'DevOps', emoji: '⚙️', color: 'from-slate-500 to-zinc-500' },
    { name: 'Data Sci', emoji: '📊', color: 'from-yellow-500 to-amber-500' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-48"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-800 rounded-2xl"></div>)}
        </div>
        <div className="h-48 bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Streak & Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 p-5 rounded-2xl flex items-center gap-4">
          <div className="text-4xl"><Flame className="text-orange-400" size={40} /></div>
          <div>
            <p className="text-slate-400 text-sm">Current Streak</p>
            <div className="flex items-baseline gap-1">
              <h2 className="text-3xl font-bold text-orange-400">{streak}</h2>
              <span className="text-orange-500/60 text-sm">days</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-lg"><Trophy className="text-yellow-400" size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">XP Earned</p>
            <h2 className="text-2xl font-bold">{dashboard?.user?.xp || 0}</h2>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-purple-500/30 transition-colors" onClick={() => navigate('/shop')}>
          <div className="p-3 bg-purple-500/20 rounded-lg"><Gift className="text-purple-400" size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">Skill Coins</p>
            <h2 className="text-2xl font-bold text-yellow-400">{coins.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Zap className="text-yellow-400" size={20} /> Daily Quests</h3>
        </div>
        <div className="space-y-3">
          {dailyQuests.map((quest, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-xl">
              <div className="flex-1">
                <p className="font-medium text-sm">{quest.title}</p>
                <p className="text-xs text-slate-500">+{quest.xp} XP</p>
              </div>
              <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${quest.progress}%` }}></div>
              </div>
              <span className="text-xs text-slate-500">{quest.progress}%</span>
>>>>>>> 7fb58eb (Your commit message here)
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      
      {/* CTA Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-12 text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to accelerate your career?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join a community of ambitious professionals sharing skills and opportunities.</p>
          <div className="flex justify-center gap-4">
             <Link to="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
               Get Started for Free
             </Link>
             <button onClick={() => addToast('Demo mode active!', 'info')} className="bg-blue-700 text-white border border-blue-400 px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors flex items-center gap-2">
               <PlayCircle size={20} /> Watch Demo
             </button>
          </div>
        </div>
=======

      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/20 rounded-2xl p-8 text-center">
        <Sparkles className="mx-auto text-blue-400 mb-3" size={32} />
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'there'}!</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-4">You've applied to {stats.jobsApplied} jobs, joined {stats.hackathonsJoined} hackathons, and completed {stats.quizzesCompleted} quizzes. Keep going!</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/match')} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
            Find a Mentor
          </button>
          <button onClick={() => navigate('/jobs')} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Skill Categories */}
      <div>
        <h3 className="font-bold text-lg mb-4">Explore Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {skillCategories.map((cat, i) => (
            <div key={i} onClick={() => navigate('/skills')} className={`bg-gradient-to-br ${cat.color} p-4 rounded-2xl text-center cursor-pointer hover:scale-105 transition-transform`}>
              <span className="text-2xl block mb-1">{cat.emoji}</span>
              <p className="text-xs font-bold text-white">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Mentors */}
      {topMentors.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><Star className="text-yellow-400" size={20} /> Top Mentors</h3>
            <button onClick={() => navigate('/skills')} className="text-sm text-blue-400 hover:underline flex items-center gap-1">View All <ArrowRight size={14} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topMentors.map((mentor: any) => (
              <div key={mentor._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold">
                    {mentor.avatar ? <img src={mentor.avatar} alt={mentor.name} className="w-full h-full rounded-full object-cover" /> : mentor.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{mentor.name}</p>
                    <p className="text-xs text-slate-500">{mentor.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(mentor.skills || []).slice(0, 3).map((skill: string, si: number) => (
                    <span key={si} className="text-xs bg-slate-900 px-2 py-0.5 rounded-full text-slate-400">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Your Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Jobs Applied', value: stats.jobsApplied, color: 'text-blue-400' },
          { label: 'Hackathons', value: stats.hackathonsJoined, color: 'text-green-400' },
          { label: 'Courses', value: stats.coursesEnrolled, color: 'text-purple-400' },
          { label: 'Quizzes', value: stats.quizzesCompleted, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
            <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
>>>>>>> 7fb58eb (Your commit message here)
      </div>
    </div>
  );
};