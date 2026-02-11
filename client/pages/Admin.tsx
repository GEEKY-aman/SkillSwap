<<<<<<< HEAD
import React from 'react';
import { Users, Briefcase, Trophy, Flag, AlertTriangle, ChevronRight } from 'lucide-react';

export const Admin: React.FC = () => {
=======
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Trophy, AlertTriangle, ChevronRight, Loader } from 'lucide-react';
import { dashboardService, userService } from '../src/services/api';
import { useToast } from '../components/ToastContext';

export const Admin: React.FC = () => {
  const { addToast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await dashboardService.getAdminDashboard();
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleBan = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      await userService.updateUserStatus(userId, newStatus);
      setData((prev: any) => ({
        ...prev,
        recentUsers: prev.recentUsers.map((u: any) =>
          u._id === userId ? { ...u, status: newStatus } : u
        ),
      }));
      addToast(`User ${newStatus === 'Active' ? 'activated' : 'suspended'}`, 'success');
    } catch (error) {
      addToast('Failed to update user status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center py-20">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentUsers = data?.recentUsers || [];
  const recentJobs = data?.recentJobs || [];
  const recentHackathons = data?.recentHackathons || [];

>>>>>>> 7fb58eb (Your commit message here)
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
<<<<<<< HEAD
           <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
               <Users size={24} />
             </div>
             <div>
               <p className="text-slate-400 text-sm">Total Users</p>
               <h3 className="text-2xl font-bold">12,450</h3>
             </div>
           </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
               <Briefcase size={24} />
             </div>
             <div>
               <p className="text-slate-400 text-sm">Active Skill Swaps</p>
               <h3 className="text-2xl font-bold">3,200</h3>
             </div>
           </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
               <Briefcase size={24} />
             </div>
             <div>
               <p className="text-slate-400 text-sm">Jobs Posted</p>
               <h3 className="text-2xl font-bold">850</h3>
             </div>
           </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-lg">
               <Trophy size={24} />
             </div>
             <div>
               <p className="text-slate-400 text-sm">Hackathons Running</p>
               <h3 className="text-2xl font-bold">15</h3>
             </div>
           </div>
=======
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Users size={24} /></div>
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><Briefcase size={24} /></div>
            <div>
              <p className="text-slate-400 text-sm">Total Posts</p>
              <h3 className="text-2xl font-bold">{stats.totalPosts?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><Briefcase size={24} /></div>
            <div>
              <p className="text-slate-400 text-sm">Jobs Posted</p>
              <h3 className="text-2xl font-bold">{stats.totalJobs?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-lg"><Trophy size={24} /></div>
            <div>
              <p className="text-slate-400 text-sm">Hackathons</p>
              <h3 className="text-2xl font-bold">{stats.totalHackathons || 0}</h3>
            </div>
          </div>
>>>>>>> 7fb58eb (Your commit message here)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management Table */}
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-400 text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
<<<<<<< HEAD
                {[
                  { name: 'Alex Johnson', role: 'User', status: 'Active', img: '64' },
                  { name: 'Sarah Lee', role: 'Recruiter', status: 'Active', img: '65' },
                  { name: 'David Kim', role: 'User', status: 'Suspended', img: '66' },
                  { name: 'Steva Shidun', role: 'Recruiter', status: 'Active', img: '68' },
                  { name: 'Alex Johnson', role: 'User', status: 'Active', img: '70' },
                  { name: 'David Kim', role: 'Recruiter', status: 'Active', img: '71' },
                  { name: 'Sarah Lee', role: 'User', status: 'Suspended', img: '72' },
                ].map((user, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={`https://picsum.photos/id/${user.img}/40/40`} className="w-8 h-8 rounded-full" alt={user.name} />
                      <span className="font-medium">{user.name}</span>
                    </td>
                    <td className="p-4 text-slate-400">{user.role}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm transition-colors">Edit</button>
                        <button className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 py-1 rounded text-sm transition-colors">Ban</button>
                      </div>
=======
                {recentUsers.map((u: any) => (
                  <tr key={u._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 text-sm font-bold">
                        {u.avatar ? <img src={u.avatar} alt={u.name} className="w-full h-full rounded-full object-cover" /> : u.name?.charAt(0)}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </td>
                    <td className="p-4 text-slate-400 capitalize">{u.role}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {u.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleBan(u._id, u.status || 'Active')}
                        className={`${u.status === 'Active' ? 'bg-red-500/20 hover:bg-red-500/40 text-red-400' : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'} px-3 py-1 rounded text-sm transition-colors`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
>>>>>>> 7fb58eb (Your commit message here)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="font-bold text-lg mb-4">Latest Jobs</h3>
            <div className="space-y-4">
<<<<<<< HEAD
              {['Frontend Dev - Active', 'UX Team Lead - Active', 'Frontend Dev - Active', 'Frontend Dev - Active'].map((job, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">{job.split('-')[0]}</span>
                  <span className="text-green-400 text-xs">{job.split('-')[1]}</span>
                </div>
              ))}
=======
              {recentJobs.length > 0 ? recentJobs.map((job: any) => (
                <div key={job._id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">{job.title}</span>
                  <span className="text-green-400 text-xs">{job.active !== false ? 'Active' : 'Closed'}</span>
                </div>
              )) : <p className="text-sm text-slate-500">No jobs yet</p>}
>>>>>>> 7fb58eb (Your commit message here)
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="font-bold text-lg mb-4">Latest Hackathons</h3>
            <div className="space-y-3">
<<<<<<< HEAD
              {[1, 2, 3].map(i => (
                <div key={i} className="text-sm text-slate-300 pb-2 border-b border-slate-700 last:border-0">
                  AI Challenge - <span className="text-slate-500">Upcoming</span>
                </div>
              ))}
=======
              {recentHackathons.length > 0 ? recentHackathons.map((h: any) => (
                <div key={h._id} className="text-sm text-slate-300 pb-2 border-b border-slate-700 last:border-0">
                  {h.title} - <span className="text-slate-500">{h.status || 'Upcoming'}</span>
                </div>
              )) : <p className="text-sm text-slate-500">No hackathons yet</p>}
>>>>>>> 7fb58eb (Your commit message here)
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 relative overflow-hidden">
<<<<<<< HEAD
             <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
             <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Reports / Flags</h3>
               <div className="flex items-center gap-3 mb-2">
                 <AlertTriangle className="text-yellow-400" size={32} />
                 <span className="text-4xl font-bold">15</span>
               </div>
               <button className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                 View Reports <ChevronRight size={14} />
               </button>
             </div>
=======
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Active Rooms</h3>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="text-yellow-400" size={32} />
                <span className="text-4xl font-bold">{stats.activeRooms || 0}</span>
              </div>
            </div>
>>>>>>> 7fb58eb (Your commit message here)
          </div>
        </div>
      </div>
    </div>
  );
};