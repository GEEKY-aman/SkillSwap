import React, { useState } from 'react';
import { ShoppingBag, Coins, Star, Zap, Shield, Palette, Crown, Sparkles, Loader } from 'lucide-react';
import { useToast } from '../components/ToastContext';
import { useAuth } from '../components/AuthContext';
import { userService } from '../src/services/api';

const SHOP_ITEMS = [
  { id: 1, name: 'Profile Boost', description: 'Get featured in skill searches for 24 hours', price: 200, icon: <Zap size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 2, name: 'Custom Badge', description: 'Unlock a unique badge for your profile', price: 350, icon: <Shield size={24} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 3, name: 'Theme Pack', description: 'Unlock exclusive dark/light theme variations', price: 150, icon: <Palette size={24} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 4, name: 'Pro Mentor Title', description: 'Display "Pro Mentor" next to your name', price: 500, icon: <Crown size={24} />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 5, name: 'XP Multiplier', description: '2x XP for the next 48 hours', price: 300, icon: <Star size={24} />, color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 6, name: 'AI Tutor Premium', description: 'Unlock advanced AI tutor features for a week', price: 400, icon: <Sparkles size={24} />, color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

export const Shop: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [purchasing, setPurchasing] = useState<number | null>(null);

  const balance = user?.coins || 0;

  const handlePurchase = async (item: typeof SHOP_ITEMS[0]) => {
    if (balance < item.price) {
      addToast('Not enough coins!', 'error');
      return;
    }

    setPurchasing(item.id);
    try {
      const res = await userService.purchaseItem({ price: item.price, item: item.name });
      updateUser({ coins: res.data.coins });
      addToast(`${item.name} purchased!`, 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Purchase failed', 'error');
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2"><ShoppingBag className="text-purple-400" size={28} /> Coin Shop</h1>
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full">
          <Coins size={20} className="text-yellow-400" />
          <span className="text-yellow-400 font-bold">{balance.toLocaleString()}</span>
          <span className="text-yellow-400/60 text-sm">coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOP_ITEMS.map(item => (
          <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/30 transition-colors group">
            <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <Coins size={16} /> {item.price}
              </span>
              <button
                onClick={() => handlePurchase(item)}
                disabled={purchasing === item.id || balance < item.price}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 ${balance < item.price
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
              >
                {purchasing === item.id ? <Loader size={14} className="animate-spin" /> : null}
                {balance < item.price ? 'Not enough' : 'Buy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};