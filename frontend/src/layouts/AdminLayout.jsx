import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Layers,
  CreditCard,
  MessageSquare,
  Users,
  Star,
  BookOpen,
  UserCheck,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Projects', path: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { name: 'Services', path: '/admin/services', icon: <Layers className="w-4 h-4" /> },
    { name: 'Pricing', path: '/admin/pricing', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Client Inquiries', path: '/admin/leads', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Registered Clients', path: '/admin/clients', icon: <Users className="w-4 h-4" /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Star className="w-4 h-4" /> },
    { name: 'Blog Posts', path: '/admin/blogs', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'CEO Profile', path: '/admin/ceo', icon: <UserCheck className="w-4 h-4" /> },
    { name: 'Media Library', path: '/admin/media', icon: <Image className="w-4 h-4" /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-brand-navy text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center font-bold text-sm">
            P
          </div>
          <span className="font-bold text-sm">PrimeWeb Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={`fixed md:sticky top-0 h-screen z-40 w-64 bg-brand-navy text-white border-r border-brand-secondary/40 flex flex-col justify-between p-6 transform transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              P
            </div>
            <div>
              <span className="font-extrabold text-base text-white block tracking-tight">
                PrimeWeb<span className="text-brand-violet">Studio</span>
              </span>
              <span className="text-[10px] text-brand-lavender/70 uppercase font-semibold">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Admin Tag */}
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-slate-400 block truncate">{user?.email}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-primary text-white font-bold shadow-soft'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 py-2 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-brand-violet" />
            <span>Public Agency Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
