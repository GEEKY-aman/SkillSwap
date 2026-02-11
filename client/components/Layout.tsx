import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  Repeat,
  Calendar,
  BookOpen,
  MessageSquare,
  Users,
  ShieldCheck,
  Search,
  Bell,
  Menu,
  Globe,
  LogOut,
  Settings,
  Map,
  Radio,
  ShoppingBag,
  Coins,
  Flame,
  Bot,
  Swords,
  PenTool
} from 'lucide-react';

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/' },
    { icon: <Flame size={20} />, label: 'Skill Match', path: '/match' },
    { icon: <Bot size={20} />, label: 'AI Tutor', path: '/tutor' },
    { icon: <Swords size={20} />, label: 'Skill Wars', path: '/wars' },
    { icon: <PenTool size={20} />, label: 'Collab Space', path: '/collaborate' },
    { icon: <Globe size={20} />, label: 'Community', path: '/community' },
    { icon: <Repeat size={20} />, label: 'Skills', path: '/skills' },
    { icon: <Map size={20} />, label: 'AI Roadmap', path: '/roadmap' },
    { icon: <Radio size={20} />, label: 'Live Rooms', path: '/live' },
    { icon: <Briefcase size={20} />, label: 'Jobs', path: '/jobs' },
    { icon: <Calendar size={20} />, label: 'Hackathons', path: '/hackathons' },
    { icon: <BookOpen size={20} />, label: 'Courses', path: '/courses' },
    { icon: <ShoppingBag size={20} />, label: 'Coin Shop', path: '/shop' },
    { icon: <Users size={20} />, label: 'Recruiter', path: '/recruiter' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/messages' },
    { icon: <ShieldCheck size={20} />, label: 'Admin', path: '/admin' },
  ];

  const notifications = [
    { id: 1, text: "Welcome to SkillSwap! Complete your profile to earn 100 coins.", time: "Just now", unread: true },
  ];

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const item = navItems.find(i => i.path === path);
    return item ? item.label : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Repeat className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
              SkillSwap
            </span>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-blue-600/10 text-blue-400 font-medium border-l-4 border-blue-500'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-slate-800">
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-blue-400 transition-colors">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span className="text-sm font-bold text-blue-400">{user?.name?.charAt(0) || '?'}</span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500">View Profile</p>
              </div>
              <Settings size={16} className="text-slate-600 group-hover:text-slate-400" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950/50">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold hidden sm:block">{getHeaderTitle()}</h1>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 relative">

            {/* Coin Balance */}
            <div className="hidden md:flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
              <Coins size={16} className="text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm">{user?.coins?.toLocaleString() || '0'}</span>
            </div>

            <div ref={notifRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <span className="text-xs text-blue-400 cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3 border-b border-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer ${notif.unread ? 'bg-slate-700/20' : ''}`}>
                        <p className="text-sm text-slate-200 mb-1">{notif.text}</p>
                        <p className="text-xs text-slate-500">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-slate-700 bg-slate-800">
                    <button className="text-xs text-slate-400 hover:text-white">View All History</button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleLogout} className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};