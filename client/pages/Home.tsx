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
            </div>
          ))}
        </div>
      </div>

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
      </div>
    </div>
  );
};