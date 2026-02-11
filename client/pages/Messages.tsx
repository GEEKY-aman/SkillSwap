import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Loader, Search, Plus, X, Circle } from 'lucide-react';
import { messageService, userService } from '../src/services/api';
import { useAuth } from '../components/AuthContext';
import { useSocket } from '../components/SocketContext';

export const Messages: React.FC = () => {
  const { user } = useAuth();
  const { socket, onlineUsers, sendMessage: socketSendMessage, emitTyping, emitStopTyping } = useSocket();

  const [conversations, setConversations] = useState<any[]>([]);
  const [activeContact, setActiveContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg: any) => {
      const senderId = msg.sender?._id || msg.sender;
      // If this message is for the active chat, add it
      if (activeContact && senderId === activeContact._id) {
        setMessages((prev) => [...prev, msg]);
      }
      // Update conversation list
      fetchConversations();
    };

    const handleMessageSent = (msg: any) => {
      setMessages((prev) => {
        // Avoid duplicates
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
      fetchConversations();
    };

    const handleTyping = (data: { userId: string; userName: string }) => {
      if (activeContact && data.userId === activeContact._id) {
        setTypingUser(data.userName);
      }
    };

    const handleStopTyping = (data: { userId: string }) => {
      if (activeContact && data.userId === activeContact._id) {
        setTypingUser(null);
      }
    };

    socket.on('receive_message', handleReceiveMessage);
    socket.on('message_sent', handleMessageSent);
    socket.on('user_typing', handleTyping);
    socket.on('user_stop_typing', handleStopTyping);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_sent', handleMessageSent);
      socket.off('user_typing', handleTyping);
      socket.off('user_stop_typing', handleStopTyping);
    };
  }, [socket, activeContact]);

  const fetchConversations = async () => {
    try {
      const res = await messageService.getConversations();
      setConversations(res.data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectContact = async (contact: any) => {
    setActiveContact(contact.user || contact);
    setTypingUser(null);
    try {
      const userId = contact.user?._id || contact._id;
      const res = await messageService.getMessages(userId);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !activeContact) return;
    setSending(true);

    // Try socket first for real-time, with REST fallback
    if (socket?.connected) {
      socketSendMessage(activeContact._id, newMessage);
      setNewMessage('');
      emitStopTyping(activeContact._id);
      setSending(false);
    } else {
      // REST fallback
      try {
        const res = await messageService.sendMessage(activeContact._id, { text: newMessage });
        setMessages((prev) => [...prev, res.data]);
        setNewMessage('');
        fetchConversations();
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setSending(false);
      }
    }
  };

  const handleTyping = useCallback(() => {
    if (!activeContact) return;
    emitTyping(activeContact._id);

    // Clear previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      emitStopTyping(activeContact._id);
    }, 2000);
  }, [activeContact, emitTyping, emitStopTyping]);

  const openNewChat = async () => {
    setShowNewChat(true);
    try {
      const res = await userService.getMentors();
      // Filter out users we already have conversations with and ourselves
      const existingIds = conversations.map((c) => c.user?._id);
      const filtered = res.data.filter(
        (u: any) => u._id !== user?._id && !existingIds.includes(u._id)
      );
      setAllUsers(filtered);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const startNewConversation = (selectedUser: any) => {
    setShowNewChat(false);
    setUserSearch('');
    selectContact(selectedUser);
  };

  const isOnline = (userId: string) => onlineUsers.includes(userId);

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter((c) =>
    c.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = allUsers.filter((u) =>
    u.name?.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">Messages</h2>
            <button
              onClick={openNewChat}
              className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
              title="New chat"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              {searchQuery ? 'No conversations match your search.' : 'No conversations yet. Click + to start chatting!'}
            </div>
          ) : (
            filteredConversations.map((conv, i) => (
              <div
                key={i}
                onClick={() => selectContact(conv)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-slate-700/50 ${activeContact?._id === conv.user._id
                    ? 'bg-blue-600/10 border-l-2 border-l-blue-500'
                    : 'hover:bg-slate-700/30'
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold">
                    {conv.user.avatar ? (
                      <img src={conv.user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      conv.user.name?.charAt(0)
                    )}
                  </div>
                  {isOnline(conv.user._id) && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm truncate">{conv.user.name}</p>
                    {conv.lastMessageTime && (
                      <span className="text-[10px] text-slate-500 flex-shrink-0 ml-2">
                        {formatTime(conv.lastMessageTime)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{conv.lastMessage || 'No messages'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 flex flex-col overflow-hidden">
        {activeContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700 flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold">
                  {activeContact.avatar ? (
                    <img src={activeContact.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    activeContact.name?.charAt(0)
                  )}
                </div>
                {isOnline(activeContact._id) && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                )}
              </div>
              <div>
                <p className="font-bold text-sm">{activeContact.name}</p>
                <p className="text-xs text-slate-500">
                  {isOnline(activeContact._id) ? (
                    <span className="text-green-400">Online</span>
                  ) : (
                    activeContact.role || 'Offline'
                  )}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                  Say hi to start the conversation! 👋
                </div>
              )}
              {messages.map((msg) => {
                const isMine = (msg.sender?._id || msg.sender) === user?._id;
                return (
                  <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[70%]">
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm ${isMine
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-slate-700 text-slate-200 rounded-bl-sm'
                          }`}
                      >
                        {msg.text}
                      </div>
                      <p className={`text-[10px] text-slate-500 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {typingUser && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sending}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center">
              <Send size={32} className="text-slate-600" />
            </div>
            <p className="text-lg font-medium">Select a conversation</p>
            <p className="text-sm">Or start a new chat by clicking the + button</p>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-lg">New Conversation</h3>
              <button onClick={() => setShowNewChat(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1">
                {filteredUsers.length === 0 ? (
                  <div className="text-center text-slate-500 py-8 text-sm">
                    {userSearch ? 'No users found.' : 'Loading users...'}
                  </div>
                ) : (
                  filteredUsers.map((u) => (
                    <button
                      key={u._id}
                      onClick={() => startNewConversation(u)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/50 transition-colors text-left"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 font-bold">
                          {u.avatar ? (
                            <img src={u.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            u.name?.charAt(0)
                          )}
                        </div>
                        {isOnline(u._id) && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.role} {u.skills?.slice(0, 2).join(', ')}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
