import React from 'react';
import { Coins, Zap, Shield, Crown, Star, Gift } from 'lucide-react';
import { useToast } from '../components/ToastContext';

const ITEMS = [
  {
    id: 1,
    title: "Profile Boost",
    description: "Get featured on the recruiter dashboard for 24 hours.",
    price: 500,
    icon: <Zap className="text-yellow-400" size={32} />,
    color: "border-yellow-500/50",
    bg: "bg-yellow-500/10"
  },
  {
    id: 2,
    title: "Verified Badge",
    description: "Add a verified checkmark to your profile to build trust.",
    price: 2000,
    icon: <Shield className="text-blue-400" size={32} />,
    color: "border-blue-500/50",
    bg: "bg-blue-500/10"
  },
  {
    id: 3,
    title: "Dark Mode Pro",
    description: "Unlock exclusive neon themes for your dashboard.",
    price: 150,
    icon: <Star className="text-purple-400" size={32} />,
    color: "border-purple-500/50",
    bg: "bg-purple-500/10"
  },
  {
    id: 4,
    title: "Mentor Session",
    description: "One free 30-min session with a Top 1% mentor.",
    price: 5000,
    icon: <Crown className="text-orange-400" size={32} />,
    color: "border-orange-500/50",
    bg: "bg-orange-500/10"
  }
];

export const Shop: React.FC = () => {
  const { addToast } = useToast();

  const handlePurchase = (item: string) => {
    addToast(`Purchased ${item}!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with Balance */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Coins size={120} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Skill Coin Shop</h1>
          <p className="text-yellow-100 mb-6 max-w-xl">
            Redeem your hard-earned coins for profile boosts, exclusive themes, and mentorship opportunities.
          </p>
          <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
            <Coins className="text-yellow-400" size={32} fill="currentColor" />
            <div>
              <p className="text-xs text-yellow-200 font-bold uppercase tracking-wider">Your Balance</p>
              <p className="text-2xl font-bold text-white">1,250 Coins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {['All Items', 'Boosts', 'Cosmetics', 'Mentorship'].map((cat, i) => (
          <button 
            key={i} 
            className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${i === 0 ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map((item) => (
          <div key={item.id} className={`bg-slate-800 rounded-2xl border ${item.color} p-6 flex flex-col relative overflow-hidden group`}>
             <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
             
             <div className="relative z-10 mb-4 bg-slate-900/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-700">
               {item.icon}
             </div>
             
             <h3 className="text-xl font-bold mb-2">{item.title}</h3>
             <p className="text-slate-400 text-sm mb-6 flex-1">{item.description}</p>
             
             <div className="mt-auto">
               <button 
                onClick={() => handlePurchase(item.title)}
                className="w-full bg-slate-700 hover:bg-white hover:text-slate-900 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
               >
                 <Coins size={16} /> {item.price}
               </button>
             </div>
          </div>
        ))}
      </div>

      {/* Daily Reward Teaser */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="bg-green-500/20 text-green-400 p-4 rounded-xl">
             <Gift size={24} />
           </div>
           <div>
             <h3 className="font-bold text-lg">Daily Bonus Available</h3>
             <p className="text-slate-400 text-sm">Login tomorrow to claim 50 free coins!</p>
           </div>
         </div>
         <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold opacity-50 cursor-not-allowed">
           Claimed
         </button>
      </div>
    </div>
  );
};