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
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};