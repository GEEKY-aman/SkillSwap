import React, { useState, useEffect } from 'react';
import { Radio, Mic, Video, Users, Plus, Loader, LogOut } from 'lucide-react';
import { roomService } from '../src/services/api';
import { useToast } from '../components/ToastContext';
import { useAuth } from '../components/AuthContext';

export const LiveRooms: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newRoom, setNewRoom] = useState({ title: '', topic: '', type: 'voice', tags: '' });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await roomService.getRooms();
      setRooms(res.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newRoom.title.trim() || !newRoom.topic.trim()) return;
    try {
      const res = await roomService.createRoom({
        title: newRoom.title,
        topic: newRoom.topic,
        type: newRoom.type,
        tags: newRoom.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      setRooms([res.data, ...rooms]);
      setShowCreate(false);
      setNewRoom({ title: '', topic: '', type: 'voice', tags: '' });
      addToast('Room created!', 'success');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Failed to create room', 'error');
    }
  };

  const handleJoin = async (roomId: string) => {
    try {
      await roomService.joinRoom(roomId);
      addToast('Joined room!', 'success');
      fetchRooms();
    } catch (error) {
      addToast('Failed to join room', 'error');
    }
  };

  const handleLeave = async (roomId: string) => {
    try {
      await roomService.leaveRoom(roomId);
      addToast('Left room', 'success');
      fetchRooms();
    } catch (error) {
      addToast('Failed to leave room', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Radio className="text-red-400" size={24} /> Live Rooms</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
          <Plus size={16} /> Create Room
        </button>
      </div>

      {/* Create Room Form */}
      {showCreate && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
          <input type="text" value={newRoom.title} onChange={e => setNewRoom({ ...newRoom, title: e.target.value })} placeholder="Room Title" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
          <input type="text" value={newRoom.topic} onChange={e => setNewRoom({ ...newRoom, topic: e.target.value })} placeholder="Topic" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
          <div className="flex gap-3">
            <button onClick={() => setNewRoom({ ...newRoom, type: 'voice' })} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border ${newRoom.type === 'voice' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'border-slate-700 text-slate-400'}`}><Mic size={16} /> Voice</button>
            <button onClick={() => setNewRoom({ ...newRoom, type: 'video' })} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-sm border ${newRoom.type === 'video' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'border-slate-700 text-slate-400'}`}><Video size={16} /> Video</button>
          </div>
          <input type="text" value={newRoom.tags} onChange={e => setNewRoom({ ...newRoom, tags: e.target.value })} placeholder="Tags (comma separated)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500" />
          <button onClick={handleCreate} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold">Create Room</button>
        </div>
      )}

      {/* Rooms Grid */}
      {rooms.length === 0 ? (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-12 text-center">
          <p className="text-slate-400">No active rooms. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map(room => {
            const isParticipant = room.participants?.some((p: any) => (p._id || p) === user?._id);
            const isHost = (room.host?._id || room.host) === user?._id;

            return (
              <div key={room._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {room.type === 'voice' ? <Mic size={16} className="text-blue-400" /> : <Video size={16} className="text-purple-400" />}
                  <span className="text-xs text-slate-500 uppercase">{room.type}</span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-slate-500"><Users size={12} /> {room.participants?.length || 0}</span>
                </div>
                <h3 className="font-bold mb-1">{room.title}</h3>
                <p className="text-sm text-slate-400 mb-2">{room.topic}</p>
                <p className="text-xs text-slate-500 mb-3">Host: {room.host?.name || 'Unknown'}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {(room.tags || []).map((tag: string, i: number) => (
                    <span key={i} className="text-xs bg-slate-900 px-2 py-0.5 rounded-full text-slate-400">{tag}</span>
                  ))}
                </div>
                {isHost || isParticipant ? (
                  <button onClick={() => handleLeave(room._id)} className="w-full bg-red-500/10 border border-red-500/30 text-red-400 py-2 rounded-xl font-bold text-sm hover:bg-red-500/20 flex items-center justify-center gap-2">
                    <LogOut size={14} /> Leave Room
                  </button>
                ) : (
                  <button onClick={() => handleJoin(room._id)} className="w-full bg-blue-600/10 border border-blue-600/30 text-blue-400 py-2 rounded-xl font-bold text-sm hover:bg-blue-600/20">
                    Join Room
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};