<<<<<<< HEAD
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

const PROFILES: UserProfile[] = [
  { id: 1, name: "Alex Johnson", role: "Python Tutor", skill: "Experienced Python developer offering mentorship", rating: 4.9, image: "https://picsum.photos/id/64/100/100" },
  { id: 2, name: "Sarah Lee", role: "Graphic Designer", skill: "Experienced Graphic designer offering mentorship", rating: 4.9, image: "https://picsum.photos/id/65/100/100" },
  { id: 3, name: "David Kim", role: "Spanish Teacher", skill: "Native Spanish speaker offering conversation practice", rating: 4.8, image: "https://picsum.photos/id/66/100/100" },
  { id: 4, name: "Maria Garcia", role: "Spanish Teacher", skill: "Experienced Gerviot developer offering mentorship", rating: 4.9, image: "https://picsum.photos/id/67/100/100" },
  { id: 5, name: "James Wilson", role: "React Developer", skill: "Senior React developer offering code reviews", rating: 5.0, image: "https://picsum.photos/id/68/100/100" },
  { id: 6, name: "Linda Chen", role: "Spanish Teacher", skill: "Experienced Spanish developer offering mentorship", rating: 4.7, image: "https://picsum.photos/id/69/100/100" },
  { id: 7, name: "Robert Fox", role: "Spanish Teacher", skill: "Experienced English developer offering mentorship", rating: 4.9, image: "https://picsum.photos/id/70/100/100" },
  { id: 8, name: "Michael Brown", role: "Spanish Teacher", skill: "Experienced Design developer offering mentorship", rating: 4.9, image: "https://picsum.photos/id/71/100/100" },
  { id: 9, name: "Emily Davis", role: "Spanish Teacher", skill: "Experienced Aular developer offering mentorship", rating: 4.9, image: "https://picsum.photos/id/72/100/100" },
];

export const Skills: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-64 space-y-6 flex-shrink-0">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <h3 className="text-blue-400 font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {['Development', 'Design', 'Language', 'Marketing', 'Music'].map(cat => (
              <label key={cat} className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <h3 className="text-blue-400 font-semibold mb-3">Skill Level</h3>
          <div className="space-y-2">
            {['Beginner', 'Intermediate', 'Expert'].map(level => (
              <label key={level} className="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500" />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
           <h3 className="text-blue-400 font-semibold mb-3">Availability</h3>
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
               <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
             </div>
             <span className="text-sm">Online</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-10 h-5 bg-slate-600 rounded-full relative cursor-pointer">
               <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
             </div>
             <span className="text-sm text-slate-500">Offline</span>
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFILES.map((profile) => (
            <div 
              key={profile.id} 
              className={`
                bg-slate-800 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1
                ${profile.id === 5 ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-700 hover:border-slate-500'}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <img src={profile.image} alt={profile.name} className="w-16 h-16 rounded-full border-2 border-slate-600" />
                {profile.id === 5 ? (
                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg">
                        <Star size={20} fill="currentColor" />
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <img src={`https://flagcdn.com/w40/${profile.role.includes('Spanish') ? 'es' : 'us'}.png`} className="w-6 h-6 rounded-full object-cover" alt="flag" />
                    </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{profile.role}</h3>
              <p className="text-slate-400 text-sm mb-4 min-h-[40px]">{profile.skill}</p>

              <div className="flex items-center gap-1 text-yellow-400 mb-6">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">{profile.rating}</span>
                <span className="text-slate-600 text-xs ml-2">(120 reviews)</span>
              </div>

              <button 
                onClick={() => navigate('/messages')}
                className={`
                  w-full py-2.5 rounded-lg font-bold transition-colors
                  ${profile.id === 5 
                    ? 'bg-[#a3e635] text-slate-900 hover:bg-[#bef264]' 
                    : 'bg-[#a3e635] text-slate-900 hover:bg-[#bef264]'}
                `}
              >
                Swap Skill
=======
import React, { useState, useEffect } from 'react';
import { Search, Star, Loader, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../src/services/api';

export const Skills: React.FC = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await userService.getMentors();
        setMentors(res.data);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filtered = mentors.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.skills || []).some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills & Mentors</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center">
          <p className="text-slate-400">No mentors found. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(mentor => (
            <div key={mentor._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold text-xl overflow-hidden">
                  {mentor.avatar ? <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" /> : mentor.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{mentor.name}</h3>
                  <p className="text-sm text-slate-500 capitalize">{mentor.role}</p>
                </div>
              </div>

              {mentor.bio && <p className="text-sm text-slate-400 mb-3 line-clamp-2">{mentor.bio}</p>}

              <div className="flex flex-wrap gap-1.5 mb-4">
                {(mentor.skills || []).slice(0, 5).map((skill: string, i: number) => (
                  <span key={i} className="text-xs bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full text-slate-300">{skill}</span>
                ))}
              </div>

              {(mentor.offering || mentor.seeking) && (
                <div className="text-xs space-y-1 mb-4">
                  {mentor.offering && <p className="text-green-400">📗 Offering: {mentor.offering}</p>}
                  {mentor.seeking && <p className="text-blue-400">📘 Seeking: {mentor.seeking}</p>}
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <Star size={14} className="text-yellow-400" fill="currentColor" />
                <span className="text-sm text-slate-400">{mentor.xp || 0} XP</span>
              </div>

              <button
                onClick={() => navigate('/messages')}
                className="w-full bg-blue-600/10 border border-blue-600/30 text-blue-400 py-2 rounded-xl font-bold text-sm hover:bg-blue-600/20 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} /> Swap Skill
>>>>>>> 7fb58eb (Your commit message here)
              </button>
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </div>
=======
      )}
>>>>>>> 7fb58eb (Your commit message here)
    </div>
  );
};