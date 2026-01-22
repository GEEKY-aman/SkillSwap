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
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};