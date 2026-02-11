import React, { useState, useEffect } from 'react';
import { Heart, X, ArrowUp, Loader, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../src/services/api';
import { useToast } from '../components/ToastContext';

export const Match: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await userService.getMatches();
        setCandidates(res.data);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'right' || direction === 'up') {
      setMatched(true);
      addToast(`Matched with ${candidates[current]?.name}!`, 'success');
    } else {
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    setMatched(false);
    setCurrent(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  if (candidates.length === 0 || current >= candidates.length) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No more candidates</h2>
        <p className="text-slate-400 mb-6">Check back later for new matches or explore mentors.</p>
        <button onClick={() => navigate('/skills')} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold">
          Browse Mentors
        </button>
      </div>
    );
  }

  const person = candidates[current];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Skill Match</h1>

      {/* Match Popup */}
      {matched && (
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center">
          <Heart className="mx-auto text-green-400 mb-2" size={40} fill="currentColor" />
          <h3 className="text-xl font-bold text-green-400">It's a Match!</h3>
          <p className="text-slate-400 text-sm mt-1">You and {person.name} can now swap skills</p>
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={() => navigate('/messages')} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
              <MessageSquare size={16} /> Message
            </button>
            <button onClick={nextCandidate} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl font-bold text-sm">
              Continue Swiping
            </button>
          </div>
        </div>
      )}

      {/* Card */}
      {!matched && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold text-blue-400">
              {person.avatar ? <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full object-cover" /> : person.name?.charAt(0)}
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold">{person.name}</h2>
            <p className="text-slate-500 text-sm capitalize mb-3">{person.role}</p>
            {person.bio && <p className="text-slate-400 text-sm mb-3">{person.bio}</p>}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(person.skills || []).map((skill: string, i: number) => (
                <span key={i} className="text-xs bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-full text-slate-300">{skill}</span>
              ))}
            </div>
            {(person.offering || person.seeking) && (
              <div className="text-sm space-y-1">
                {person.offering && <p className="text-green-400">📗 Offering: {person.offering}</p>}
                {person.seeking && <p className="text-blue-400">📘 Seeking: {person.seeking}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!matched && (
        <div className="flex justify-center gap-6">
          <button onClick={() => handleSwipe('left')} className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
            <X size={24} />
          </button>
          <button onClick={() => handleSwipe('up')} className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors">
            <ArrowUp size={24} />
          </button>
          <button onClick={() => handleSwipe('right')} className="w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors">
            <Heart size={24} />
          </button>
        </div>
      )}
    </div>
  );
};