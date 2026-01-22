import React, { useState, useEffect, useRef } from 'react';
import { Code, PenTool, Layout as LayoutIcon, MessageSquare, Mic, Video, Share2, Save, X, Send, Users } from 'lucide-react';
import { CodeEditor } from '../components/collaborate/CodeEditor';
import { Whiteboard } from '../components/collaborate/Whiteboard';
import { projectService } from '../src/services/api';
import { useToast } from '../components/ToastContext';
import { io, Socket } from 'socket.io-client';

export const Collaborate: React.FC = () => {
  const { addToast } = useToast();
  const [viewMode, setViewMode] = useState<'code' | 'whiteboard' | 'split'>('code');
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarMode, setSidebarMode] = useState<'ai' | 'team'>('team');

  // AI Chat State
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hello! I am your AI coding assistant. How can I help you today? I can generate code, explain concepts, or help you debug.' }
  ]);
  const [aiInput, setAiInput] = useState('');

  // Team Chat State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [teamMessages, setTeamMessages] = useState<{ user: string, text: string, time: string }[]>([]);
  const [teamInput, setTeamInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Socket.io
  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      addToast('Connected to collaboration server', 'success');
      newSocket.emit('join_room', 'room-1'); // Default room for now
    });

    newSocket.on('receive_message', (data) => {
      setTeamMessages(prev => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [addToast]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [teamMessages, aiMessages, sidebarMode]);

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    setAiMessages(prev => [...prev, { role: 'user', text: aiInput }]);
    setAiInput('');

    // Mock AI response
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: 'ai',
        text: "I see you're working on a React component. Would you like me to suggest some improvements for the state management?"
      }]);
    }, 1000);
  };

  const handleSendTeamMessage = () => {
    if (!teamInput.trim() || !socket) return;

    const messageData = {
      room: 'room-1',
      user: 'You', // In real app, get from auth context
      text: teamInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit('send_message', messageData);
    setTeamMessages(prev => [...prev, messageData]);
    setTeamInput('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0f0f13]">
      {/* Top Toolbar */}
      <div className="h-14 bg-[#18181b] border-b border-[#27272a] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 bg-[#27272a] p-1 rounded-lg">
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'code' ? 'bg-[#3f3f46] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            <Code size={16} /> Code
          </button>
          <button
            onClick={() => setViewMode('whiteboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'whiteboard' ? 'bg-[#3f3f46] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            <PenTool size={16} /> Board
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'split' ? 'bg-[#3f3f46] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            <LayoutIcon size={16} /> Split
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-[#18181b] flex items-center justify-center text-xs font-bold text-white">You</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-[#18181b] flex items-center justify-center text-xs font-bold text-white">JD</div>
          </div>

          <div className="h-6 w-px bg-[#27272a]" />

          <button className="p-2 text-gray-400 hover:text-white hover:bg-[#27272a] rounded-lg transition-colors">
            <Mic size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-[#27272a] rounded-lg transition-colors">
            <Video size={20} />
          </button>

          <button
            onClick={async () => {
              try {
                await projectService.createProject({
                  name: 'Untitled Project',
                  files: [], // In real app, get from CodeEditor state
                  whiteboardData: {} // In real app, get from Whiteboard state
                });
                addToast('Project saved successfully!', 'success');
              } catch (error) {
                addToast('Failed to save project', 'error');
              }
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-900/20"
          >
            <Save size={16} /> Save
          </button>

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`p-2 rounded-lg transition-colors ${showSidebar ? 'bg-[#3f3f46] text-white' : 'text-gray-400 hover:text-white hover:bg-[#27272a]'}`}
          >
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor / Whiteboard Area */}
        <div className="flex-1 flex relative">
          {viewMode === 'code' && (
            <div className="w-full h-full">
              <CodeEditor />
            </div>
          )}

          {viewMode === 'whiteboard' && (
            <div className="w-full h-full">
              <Whiteboard />
            </div>
          )}

          {viewMode === 'split' && (
            <div className="w-full h-full flex">
              <div className="w-1/2 h-full border-r border-[#27272a]">
                <CodeEditor />
              </div>
              <div className="w-1/2 h-full">
                <Whiteboard />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (AI & Team Chat) */}
        {showSidebar && (
          <div className="w-80 bg-[#18181b] border-l border-[#27272a] flex flex-col shrink-0">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-[#27272a]">
              <button
                onClick={() => setSidebarMode('team')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${sidebarMode === 'team' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <Users size={16} /> Team Chat
              </button>
              <button
                onClick={() => setSidebarMode('ai')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${sidebarMode === 'ai' ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <MessageSquare size={16} /> AI Assistant
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sidebarMode === 'ai' ? (
                // AI Messages
                aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-[#27272a] text-gray-200 rounded-bl-none'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                // Team Messages
                teamMessages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    <Users size={48} className="mx-auto mb-2 opacity-20" />
                    <p>Start chatting with your team!</p>
                  </div>
                ) : (
                  teamMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400">{msg.user}</span>
                        <span className="text-[10px] text-gray-600">{msg.time}</span>
                      </div>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.user === 'You'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-[#27272a] text-gray-200 rounded-bl-none'
                        }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#27272a]">
              <div className="relative">
                <input
                  type="text"
                  value={sidebarMode === 'ai' ? aiInput : teamInput}
                  onChange={(e) => sidebarMode === 'ai' ? setAiInput(e.target.value) : setTeamInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (sidebarMode === 'ai' ? handleSendAiMessage() : handleSendTeamMessage())}
                  placeholder={sidebarMode === 'ai' ? "Ask AI assistant..." : "Type a message to team..."}
                  className="w-full bg-[#27272a] text-white placeholder-gray-500 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={sidebarMode === 'ai' ? handleSendAiMessage : handleSendTeamMessage}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white rounded-lg transition-colors ${sidebarMode === 'ai' ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};