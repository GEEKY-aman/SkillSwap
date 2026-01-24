import React, { useState, useEffect } from 'react';
import { Calendar, Users, Trophy, Sparkles, Brain, Rocket, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '../components/ToastContext';
import { hackathonService } from '../src/services/api';

export const Hackathons: React.FC = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'events' | 'team-builder' | 'project-gen'>('events');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTeam, setGeneratedTeam] = useState<any>(null);
  const [generatedProject, setGeneratedProject] = useState<any>(null);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await hackathonService.getHackathons();
        setHackathons(response.data);
      } catch (error) {
        addToast('Failed to load hackathons', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, [addToast]);

  const handleRegister = () => {
    addToast("Registration Successful! Check your email for details.", "success");
  };

  const generateTeam = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedTeam([
        { role: "Frontend (You)", name: "Alex Johnson", skill: "React" },
        { role: "Backend", name: "Sarah Chen", skill: "Node.js", match: "98%" },
        { role: "Designer", name: "Mike Ross", skill: "Figma", match: "95%" },
        { role: "Data Scientist", name: "Priya Patel", skill: "Python", match: "92%" },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const generateProject = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedProject({
        title: "EcoTrack AI",
        tagline: "Carbon footprint tracking using image recognition",
        stack: ["React Native", "TensorFlow", "Node.js", "MongoDB"],
        features: ["Scan grocery receipts", "Daily carbon score", "Community leaderboard"]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hackathon Hub</h1>
          <p className="text-slate-400">Compete, collaborate, and build the future.</p>
        </div>
        <div className="bg-slate-800/50 p-1 rounded-xl flex gap-1 border border-slate-700">
          {[
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'team-builder', label: 'AI Team Builder', icon: Users },
            { id: 'project-gen', label: 'Project Gen', icon: Sparkles },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
                ${activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'}
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'events' && (
        <div className="space-y-8 animate-fade-in">
          {/* Featured Hackathon */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-800 border border-slate-700 group">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
            <div className="p-8 md:p-12 relative z-10">
              <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold mb-4 border border-green-500/30">
                Featured Event
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Global AI Hackathon 2025</h2>
              <p className="text-slate-300 max-w-xl mb-8 text-lg">
                Join thousands of developers worldwide to build the next generation of AI applications.
                Prizes worth over <span className="text-green-400 font-bold">$100,000</span> up for grabs!
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
                  <Calendar className="text-blue-400" size={20} />
                  <span>Mar 15 - Mar 17</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
                  <Users className="text-purple-400" size={20} />
                  <span>2,500+ Joined</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50">
                  <Trophy className="text-yellow-400" size={20} />
                  <span>$100k Prizes</span>
                </div>
              </div>

              <button
                onClick={handleRegister}
                className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Register Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 text-center text-slate-400">Loading hackathons...</div>
              ) : hackathons.length > 0 ? (
                hackathons.map((hackathon) => (
                  <div key={hackathon._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:translate-y-[-4px] flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                        🏆
                      </div>
                      <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded">{hackathon.status}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex-1">
                      Organized by {hackathon.organizer}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm border-t border-slate-700 pt-4">
                      <div>
                        <p className="text-slate-500 text-xs">Participants</p>
                        <p className="font-bold text-green-400">{hackathon.participants}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Date</p>
                        <p className="font-bold text-slate-300">{hackathon.date}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleRegister}
                      className="w-full bg-[#a3e635] text-slate-900 font-bold py-2 rounded-lg hover:bg-[#bef264] transition-colors"
                    >
                      Register
                    </button>
                  </div>
                ))
              ) : (
                // Fallback mock data if API returns empty (since we just created DB)
                [1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:translate-y-[-4px] flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                        {i === 1 ? '🤖' : i === 2 ? '🌍' : '🎮'}
                      </div>
                      <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded">Upcoming</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{i === 1 ? 'AI Challenge' : i === 2 ? 'Climate Fix' : 'Game Jam'}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex-1">
                      Build solutions for {i === 1 ? 'automation' : i === 2 ? 'sustainability' : 'entertainment'} using modern tech stacks.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm border-t border-slate-700 pt-4">
                      <div>
                        <p className="text-slate-500 text-xs">Prize Pool</p>
                        <p className="font-bold text-green-400">$10,000</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Date</p>
                        <p className="font-bold text-slate-300">May 20</p>
                      </div>
                    </div>

                    <button
                      onClick={handleRegister}
                      className="w-full bg-[#a3e635] text-slate-900 font-bold py-2 rounded-lg hover:bg-[#bef264] transition-colors"
                    >
                      Register
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'team-builder' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-8">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Brain size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">AI Team Formation</h2>
              <p className="text-slate-300 mb-6">
                Our AI analyzes your skills, personality type, and timezone to find the perfect teammates for your next hackathon victory.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Target Hackathon</label>
                  <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option>Global AI Hackathon 2025</option>
                    <option>Climate Fix</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Your Role</label>
                  <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white">
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>UI/UX Designer</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateTeam}
                disabled={isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                {isGenerating ? 'Analyzing Profiles...' : 'Find My Dream Team'}
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8 flex flex-col items-center justify-center min-h-[400px]">
            {generatedTeam ? (
              <div className="w-full space-y-4">
                <h3 className="text-xl font-bold text-center mb-6">Team Match Found! <span className="text-green-400">98% Compatibility</span></h3>
                {generatedTeam.map((member: any, i: number) => (
                  <div key={i} className="bg-slate-700/50 p-4 rounded-xl flex items-center justify-between animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role} • {member.skill}</p>
                      </div>
                    </div>
                    {member.match && (
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                        {member.match} Match
                      </span>
                    )}
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-colors">
                    Create Group Chat
                  </button>
                  <button className="px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl">
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <Users size={64} className="mx-auto mb-4 opacity-20" />
                <p>Generate a team to see your matches here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'project-gen' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-900 to-slate-900 border border-pink-500/30 rounded-3xl p-8">
              <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center mb-6">
                <Sparkles size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Idea Generator</h2>
              <p className="text-slate-300 mb-6">
                Stuck on what to build? Get a winning hackathon idea complete with tech stack and feature list instantly.
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Hackathon Theme</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Sustainability', 'FinTech', 'Healthcare', 'EdTech'].map(theme => (
                      <button key={theme} className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-sm hover:border-pink-500 transition-colors">
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Preferred Tech</label>
                  <div className="flex gap-2 flex-wrap">
                    {['React', 'Python', 'Blockchain', 'AI/ML'].map(tech => (
                      <button key={tech} className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-sm hover:border-pink-500 transition-colors">
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={generateProject}
                disabled={isGenerating}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
              >
                <Rocket size={18} />
                {isGenerating ? 'Brainstorming...' : 'Generate Winning Idea'}
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8 min-h-[400px]">
            {generatedProject ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Project Concept</span>
                    <h3 className="text-3xl font-black text-white mt-1">{generatedProject.title}</h3>
                  </div>
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <Sparkles className="text-pink-500" size={24} />
                  </div>
                </div>

                <p className="text-lg text-slate-300 mb-8 italic">"{generatedProject.tagline}"</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-white mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedProject.stack.map((t: string) => (
                        <span key={t} className="px-3 py-1 bg-slate-700 rounded-lg text-sm text-blue-300 border border-slate-600">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-3">Key Features (MVP)</h4>
                    <ul className="space-y-2">
                      {generatedProject.features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button className="w-full border border-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-colors">
                    Save to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
                <Brain size={64} className="mb-4 opacity-20" />
                <p>Configure and generate to see your project brief</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};