import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, BookOpen, Code, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  isTyping?: boolean;
}

export const AITutor: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'ai', text: 'Hello! I am your personal Skill Tutor. I can help you understand complex concepts, debug code, or create practice quizzes. What are you learning today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg: Message = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: getAIResponse(userMsg.text) 
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('react')) return "React is a JavaScript library for building user interfaces based on components. Would you like a simple example of a useState hook?";
    if (lower.includes('python')) return "Python is great for data science and backend web development. Try writing a list comprehension: `[x**2 for x in range(10)]`. Do you want me to explain this syntax?";
    if (lower.includes('debug')) return "Paste your code snippet here, and I'll analyze it for errors and suggest optimizations.";
    return "That's an interesting topic! I can break it down into micro-lessons or give you a quick quiz to test your knowledge. Which do you prefer?";
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex gap-6">
      
      {/* Sidebar - Topics */}
      <div className="hidden lg:flex flex-col w-64 bg-slate-800/50 rounded-2xl border border-slate-700 p-4">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
           <BookOpen size={20} className="text-blue-400" /> Saved Lessons
        </h2>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {['React Hooks Basics', 'Python Lists', 'CSS Grid Layout', 'API Fetching'].map((topic, i) => (
            <div key={i} className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 cursor-pointer text-sm text-slate-300 transition-colors">
              {topic}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700">
          <button 
            onClick={() => navigate('/quizzes')}
            className="w-full bg-purple-600/20 text-purple-300 border border-purple-600/50 py-2 rounded-xl text-sm font-bold hover:bg-purple-600/30 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles size={16} /> Generate Quiz
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
               <Bot size={24} className="text-white" />
             </div>
             <div>
               <h2 className="font-bold text-white">AI Skill Tutor</h2>
               <p className="text-xs text-green-400 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
               </p>
             </div>
          </div>
          <button onClick={() => setMessages([])} className="text-slate-400 hover:text-white p-2 hover:bg-slate-700 rounded-full" title="Clear Chat">
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.sender === 'user' ? 'bg-slate-700' : 'bg-indigo-600'}`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                 </div>
                 <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                   msg.sender === 'user' 
                     ? 'bg-blue-600 text-white rounded-tr-none' 
                     : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                 }`}>
                   {msg.text}
                 </div>
               </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="flex gap-3 max-w-[80%]">
                 <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-indigo-600">
                    <Bot size={16} />
                 </div>
                 <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none">
                   <div className="flex gap-1">
                     <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                     <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                   </div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="flex gap-2 bg-slate-900 rounded-xl p-2 border border-slate-700 focus-within:border-indigo-500 transition-colors">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
              <Code size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question or type 'Teach me React'..." 
              className="flex-1 bg-transparent focus:outline-none text-slate-200"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex gap-2 justify-center">
             {['Explain closure', 'Create a quiz', 'Review my code'].map(s => (
               <button key={s} onClick={() => setInput(s)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
                 {s}
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};