import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  FolderGit2,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ClientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/client/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'My Inquiries', path: '/client/inquiries', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Account Profile', path: '/client/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-white border-b border-brand-lavender-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <span className="font-bold text-base text-brand-navy">PrimeWeb Client</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-brand-navy rounded-lg hover:bg-brand-lavender"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-brand-lavender-border flex flex-col justify-between p-6 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              P
            </div>
            <div>
              <span className="font-extrabold text-base text-brand-navy block tracking-tight">
                PrimeWeb<span className="text-brand-primary">Studio</span>
              </span>
              <span className="text-[10px] text-brand-muted uppercase font-semibold">Client Portal</span>
            </div>
          </Link>

          {/* User Preview */}
          <div className="p-3 bg-brand-lavender/50 rounded-2xl border border-brand-lavender-border flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-purple text-white font-bold flex items-center justify-center text-xs">
              {user?.name?.slice(0, 2).toUpperCase() || 'CL'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-brand-navy block truncate">{user?.name}</span>
              <span className="text-[11px] text-brand-muted block truncate">{user?.email}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-purple text-white shadow-soft'
                      : 'text-brand-body hover:bg-brand-lavender hover:text-brand-primary'
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
        <div className="pt-6 border-t border-brand-lavender-border space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Public Agency Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-brand-error hover:bg-red-50 rounded-lg transition-colors"
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

export default ClientLayout;
