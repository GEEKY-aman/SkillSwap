import React, { useState } from 'react';
import { Search, Paperclip, Send } from 'lucide-react';
import { Message } from '../types';

const CONTACTS = [
  { id: 1, name: 'Alex Johnson', lastMsg: 'Sure, I can help you with your React project...', time: '10:30 AM', active: true, img: 'https://picsum.photos/id/64/50/50' },
  { id: 2, name: 'Sarah Lee', lastMsg: "Let's swap marketing strategies...", time: 'Yesterday', active: false, img: 'https://picsum.photos/id/65/50/50' },
  { id: 3, name: 'David Kim', lastMsg: 'What time works for our session?...', time: 'Mon', active: false, img: 'https://picsum.photos/id/66/50/50' },
];

const MESSAGES: Message[] = [
  { id: 1, sender: 'Alex Johnson', text: 'Hey Alex, are you free to discuss the skill swap?', time: '10:15 AM', isMe: false },
  { id: 2, sender: 'Me', text: 'Hi! Yes, I\'m free now. What did you have in mind?', time: '10:20 AM', isMe: true },
  { id: 3, sender: 'Alex Johnson', text: 'Great, I\'m looking for help with React components.', time: '10:22 AM', isMe: false },
  { id: 4, sender: 'Me', text: 'Sure, I can help you with your React project. Let\'s set up a time.', time: '10:30 AM', isMe: true },
];

export const Messages: React.FC = () => {
  const [activeContact, setActiveContact] = useState(1);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 max-w-7xl mx-auto">
      {/* Sidebar List */}
      <div className="w-full md:w-80 flex flex-col bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
           <h2 className="text-xl font-bold mb-4">Messages</h2>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
             <input type="text" placeholder="Search for chats..." className="w-full bg-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {CONTACTS.map(contact => (
             <div 
               key={contact.id} 
               onClick={() => setActiveContact(contact.id)}
               className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-800 transition-colors border-l-4 ${contact.active && contact.id === activeContact ? 'bg-slate-800 border-blue-500' : 'border-transparent'}`}
             >
               <img src={contact.img} className="w-12 h-12 rounded-full" alt={contact.name} />
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-baseline mb-1">
                   <h3 className="font-bold text-sm truncate">{contact.name}</h3>
                   <span className="text-xs text-slate-500">{contact.time}</span>
                 </div>
                 <p className={`text-sm truncate ${contact.id === activeContact ? 'text-slate-200' : 'text-slate-500'}`}>
                   {contact.lastMsg}
                 </p>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
           <div className="flex items-center gap-3">
             <img src={CONTACTS.find(c => c.id === activeContact)?.img} className="w-10 h-10 rounded-full" alt="Active" />
             <div>
               <h3 className="font-bold">{CONTACTS.find(c => c.id === activeContact)?.name}</h3>
               <p className="text-xs text-slate-400">Web Development</p>
             </div>
           </div>
           <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
             Skill Swap Active
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           {MESSAGES.map(msg => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] p-4 rounded-2xl ${msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                 <p className="text-sm mb-1">{msg.text}</p>
                 <p className={`text-[10px] text-right ${msg.isMe ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</p>
               </div>
             </div>
           ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="bg-slate-900 rounded-full flex items-center px-4 py-2 border border-slate-700 focus-within:border-blue-500 transition-colors">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent focus:outline-none text-slate-200 text-sm"
            />
            <button className="text-slate-400 hover:text-white mr-2">
              <Paperclip size={18} />
            </button>
            <button className="bg-[#a3e635] p-2 rounded-full text-slate-900 hover:bg-[#bef264] transition-transform hover:scale-105">
              <Send size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
