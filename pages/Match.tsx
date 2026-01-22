import React, { useState } from 'react';
import { X, Heart, Star, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CANDIDATES = [
  {
    id: 1,
    name: "Jessica Wu",
    role: "UX Researcher",
    offering: "User Research, Figma",
    seeking: "React Native, API Design",
    bio: "I love understanding user needs. Looking to build my own mobile app.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 2,
    name: "Liam O'Connor",
    role: "DevOps Engineer",
    offering: "AWS, Docker, CI/CD",
    seeking: "Vue.js, Frontend Design",
    bio: "Infrastructure wizard looking to make things pretty on the frontend.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 3,
    name: "Anita Singh",
    role: "Data Scientist",
    offering: "Python, ML, SQL",
    seeking: "Public Speaking, English",
    bio: "Data nerd wanting to improve my communication skills for conferences.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-green-600 to-teal-600"
  }
];

export const Match: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    setLastDirection(direction);
    if (direction === 'right' || direction === 'up') {
      setTimeout(() => setShowMatchPopup(true), 500);
    } else {
      setTimeout(() => setIndex(index + 1), 300);
    }
  };

  const closePopup = () => {
    setShowMatchPopup(false);
    setIndex(index + 1);
    setLastDirection(null);
  };

  const handleSendMessage = () => {
    setShowMatchPopup(false);
    navigate('/messages');
  };

  if (index >= CANDIDATES.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Star size={40} className="text-yellow-400" fill="currentColor" />
        </div>
        <h2 className="text-2xl font-bold mb-2">You've reached the end!</h2>
        <p className="text-slate-400 mb-6">Check back later for more potential skill swaps.</p>
        <button 
          onClick={() => setIndex(0)} 
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-500 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  const profile = CANDIDATES[index];

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-8rem)] flex flex-col justify-center relative">
      
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Skill Match</span>
        </h1>
        <p className="text-slate-400 text-sm">Find your perfect barter partner</p>
      </div>

      {/* Card */}
      <div className="relative aspect-[3/4] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
        <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
            <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full">
              <Briefcase size={16} className="text-white" />
            </div>
          </div>
          <p className="text-slate-300 font-medium mb-4">{profile.role}</p>
          
          <div className="space-y-3 mb-6">
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs text-green-300 font-bold uppercase tracking-wider mb-1">Teaching</p>
              <p className="text-white text-sm">{profile.offering}</p>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">Learning</p>
              <p className="text-white text-sm">{profile.seeking}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center text-red-500 border border-slate-700 shadow-lg hover:scale-110 transition-transform"
        >
          <X size={28} />
        </button>
        <button 
          onClick={() => handleSwipe('up')}
          className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-blue-400 border border-slate-700 shadow-lg hover:scale-110 transition-transform"
        >
          <Star size={24} fill="currentColor" />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:scale-110 transition-transform"
        >
          <Heart size={28} fill="currentColor" />
        </button>
      </div>

      {/* Match Popup Overlay */}
      {showMatchPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-sm w-full text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-orange-500"></div>
             <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-2">IT'S A MATCH!</h2>
             <p className="text-slate-300 mb-6">You and {profile.name} both want to swap skills.</p>
             
             <div className="flex justify-center gap-4 mb-8">
               <img src="https://picsum.photos/100/100" className="w-20 h-20 rounded-full border-4 border-slate-800" alt="Me" />
               <img src={profile.image} className="w-20 h-20 rounded-full border-4 border-slate-800" alt={profile.name} />
             </div>

             <button 
                onClick={handleSendMessage}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mb-3"
             >
               Send Message
             </button>
             <button 
                onClick={closePopup}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl"
             >
               Keep Swiping
             </button>
           </div>
        </div>
      )}
    </div>
  );
};