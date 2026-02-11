import React, { useState, useEffect } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Mail, Edit3, Award, Star, CheckCircle, Github, Linkedin, Twitter, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { profileService } from '../src/services/api';
import { useAuth } from '../components/AuthContext';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  createdAt: string;
}

interface ProfileStats {
  jobsApplied: number;
  hackathonsJoined: number;
  coursesEnrolled: number;
  quizzesCompleted: number;
  avgQuizScore: number;
}

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { logout: authLogout } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '', location: '', skills: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }
        const response = await profileService.getProfile();
        setUser(response.data.user);
        setStats(response.data.stats);
        setEditForm({
          name: response.data.user.name || '',
          bio: response.data.user.bio || '',
          location: response.data.user.location || '',
          skills: response.data.user.skills?.join(', ') || ''
        });
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        } else {
          addToast('Failed to load profile', 'error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate, addToast]);

  const handleLogout = () => {
    authLogout();
    addToast('Logged out successfully', 'success');
    navigate('/login');
  };

  const handleSaveProfile = async () => {
    try {
      const response = await profileService.updateProfile({
        name: editForm.name,
        bio: editForm.bio,
        location: editForm.location,
        skills: editForm.skills.split(',').map(s => s.trim()).filter(s => s)
      });
      setUser({ ...user!, ...response.data });
      setIsEditing(false);
      addToast('Profile updated successfully!', 'success');
    } catch (error) {
      addToast('Failed to update profile', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-slate-400 mt-4">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto text-center py-20">
        <p className="text-slate-400">Please log in to view your profile</p>
        <button
          onClick={() => navigate('/auth')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header / Cover */}
      <div className="relative">
        <div className="h-48 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 md:px-10 pb-6">
          <div className="relative -mt-20 mb-4 flex flex-col md:flex-row items-end md:items-end gap-6">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-900 shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"></div>
            </div>

            <div className="flex-1 mb-2">
              {isEditing ? (
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="text-3xl font-bold bg-slate-800 text-white px-3 py-1 rounded-lg border border-slate-600"
                />
              ) : (
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  {user.name}
                  <CheckCircle size={20} className="text-blue-400" fill="currentColor" color="#0f172a" />
                </h1>
              )}
              <p className="text-slate-300 text-lg capitalize">{user.role}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1"><MapPin size={16} /> {user.location || 'Location not set'}</span>
                <span className="flex items-center gap-1"><Mail size={16} /> {user.email}</span>
                <span className="flex items-center gap-1"><Calendar size={16} /> Joined {joinedDate}</span>
              </div>
            </div>

            <div className="flex gap-3 mb-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-500 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Edit3 size={18} /> Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600/20 border border-red-600/50 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold mb-4">Your Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats?.jobsApplied || 0}</div>
                <div className="text-xs text-slate-400 mt-1">Jobs Applied</div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{stats?.hackathonsJoined || 0}</div>
                <div className="text-xs text-slate-400 mt-1">Hackathons</div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{stats?.coursesEnrolled || 0}</div>
                <div className="text-xs text-slate-400 mt-1">Courses</div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats?.quizzesCompleted || 0}</div>
                <div className="text-xs text-slate-400 mt-1">Quizzes</div>
              </div>
            </div>
            {stats && stats.quizzesCompleted > 0 && (
              <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Avg Quiz Score</span>
                  <span className="text-lg font-bold text-yellow-400">{stats.avgQuizScore}%</span>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">About</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="w-full bg-slate-700 text-slate-300 text-sm p-3 rounded-lg border border-slate-600 min-h-[100px]"
              />
            ) : (
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {user.bio || 'No bio yet. Click Edit Profile to add one!'}
              </p>
            )}
            <div className="flex gap-2 mt-4">
              <a href={user.github || '#'} className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"><Github size={20} /></a>
              <a href={user.linkedin || '#'} className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href={user.twitter || '#'} className="p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Badges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold mb-4">Skills</h3>
            {isEditing ? (
              <div>
                <input
                  value={editForm.skills}
                  onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                  placeholder="React, TypeScript, Node.js..."
                  className="w-full bg-slate-700 text-slate-300 p-3 rounded-lg border border-slate-600"
                />
                <p className="text-xs text-slate-500 mt-2">Separate skills with commas</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-sm text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-colors">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">No skills added yet. Click Edit Profile to add skills!</p>
                )}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award size={100} />
            </div>
            <h3 className="text-lg font-bold mb-6">Earned Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats && stats.jobsApplied > 0 && (
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💼</div>
                  <div className="text-xs font-bold text-blue-300">Job Seeker</div>
                </div>
              )}
              {stats && stats.hackathonsJoined > 0 && (
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-xs font-bold text-purple-300">Hackathon Hero</div>
                </div>
              )}
              {stats && stats.coursesEnrolled > 0 && (
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-xs font-bold text-green-300">Lifelong Learner</div>
                </div>
              )}
              {stats && stats.quizzesCompleted > 0 && (
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🧠</div>
                  <div className="text-xs font-bold text-yellow-300">Quiz Master</div>
                </div>
              )}
              {(!stats || (stats.jobsApplied === 0 && stats.hackathonsJoined === 0 && stats.coursesEnrolled === 0 && stats.quizzesCompleted === 0)) && (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-400">Complete activities to earn badges!</p>
                  <p className="text-slate-500 text-sm mt-2">Apply to jobs, join hackathons, enroll in courses, or complete quizzes.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => navigate('/jobs')} className="bg-slate-700/50 hover:bg-blue-600/20 border border-slate-600 hover:border-blue-500 rounded-xl p-4 text-center transition-all">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-xs font-medium text-slate-300">Find Jobs</div>
              </button>
              <button onClick={() => navigate('/hackathons')} className="bg-slate-700/50 hover:bg-purple-600/20 border border-slate-600 hover:border-purple-500 rounded-xl p-4 text-center transition-all">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-xs font-medium text-slate-300">Hackathons</div>
              </button>
              <button onClick={() => navigate('/courses')} className="bg-slate-700/50 hover:bg-green-600/20 border border-slate-600 hover:border-green-500 rounded-xl p-4 text-center transition-all">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-xs font-medium text-slate-300">Courses</div>
              </button>
              <button onClick={() => navigate('/quizzes')} className="bg-slate-700/50 hover:bg-yellow-600/20 border border-slate-600 hover:border-yellow-500 rounded-xl p-4 text-center transition-all">
                <div className="text-2xl mb-2">🧠</div>
                <div className="text-xs font-medium text-slate-300">Quizzes</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};