import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  MessageSquare,
  Users,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import api from '../../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats/dashboard');
        if (res.data?.data) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const counts = stats?.counts || {
    totalProjects: 0,
    publishedProjects: 0,
    totalInquiries: 0,
    newInquiries: 0,
    inProgressInquiries: 0,
    totalClients: 0,
    publishedBlogs: 0,
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy">Dashboard Overview</h1>
        <p className="text-xs text-brand-muted">
          Real-time metrics, project developments, and client inquiries across PrimeWeb Studio.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-brand-muted block">Total Projects</span>
            <span className="text-3xl font-extrabold text-brand-navy mt-1 block">
              {counts.totalProjects}
            </span>
            <span className="text-[11px] text-emerald-600 block mt-1">
              {counts.publishedProjects} Published
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-brand-muted block">Client Inquiries</span>
            <span className="text-3xl font-extrabold text-brand-primary mt-1 block">
              {counts.totalInquiries}
            </span>
            <span className="text-[11px] text-amber-600 font-medium block mt-1">
              {counts.newInquiries} New / Unreviewed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-primary flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-brand-muted block">Registered Clients</span>
            <span className="text-3xl font-extrabold text-brand-navy mt-1 block">
              {counts.totalClients}
            </span>
            <span className="text-[11px] text-brand-muted block mt-1">Active Accounts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-brand-muted block">Published Articles</span>
            <span className="text-3xl font-extrabold text-brand-navy mt-1 block">
              {counts.publishedBlogs}
            </span>
            <span className="text-[11px] text-brand-muted block mt-1">Blog Posts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Recent Inquiries & Latest Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-brand-lavender-border pb-4">
            <h2 className="text-lg font-bold text-brand-navy">Recent Inquiries & Leads</h2>
            <Link
              to="/admin/leads"
              className="text-xs font-semibold text-brand-primary hover:text-brand-secondary inline-flex items-center space-x-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
            <div className="divide-y divide-brand-lavender-border/50 text-xs">
              {stats.recentInquiries.map((inq) => (
                <div key={inq._id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-brand-primary">
                        {inq.referenceNumber}
                      </span>
                      <span className="px-2 py-0.5 bg-brand-lavender rounded text-[10px] font-semibold text-brand-navy">
                        {inq.status}
                      </span>
                    </div>
                    <span className="font-semibold text-brand-navy block">{inq.fullName}</span>
                    <span className="text-brand-muted block">{inq.serviceRequired}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-brand-navy block">{inq.estimatedBudget}</span>
                    <span className="text-brand-muted text-[11px] block">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-brand-muted text-center py-8">No inquiries received yet.</p>
          )}
        </div>

        {/* Status Distribution & Recent Projects */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Breakdown */}
          <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-4">
            <h3 className="font-bold text-base text-brand-navy">Inquiry Status Breakdown</h3>
            <div className="space-y-3 pt-2 text-xs">
              {stats?.statusDistribution &&
                Object.entries(stats.statusDistribution).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-brand-navy font-medium">{status}</span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-lavender font-bold text-brand-primary">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-gradient-to-br from-brand-lavender to-white rounded-3xl p-6 border border-brand-lavender-border space-y-3">
            <h4 className="font-bold text-xs uppercase text-brand-primary tracking-wider">
              Quick Management
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/admin/projects"
                className="p-3 bg-white rounded-xl border border-brand-lavender-border hover:border-brand-primary font-semibold text-brand-navy text-center"
              >
                + Add Project
              </Link>
              <Link
                to="/admin/blogs"
                className="p-3 bg-white rounded-xl border border-brand-lavender-border hover:border-brand-primary font-semibold text-brand-navy text-center"
              >
                + Write Post
              </Link>
              <Link
                to="/admin/ceo"
                className="p-3 bg-white rounded-xl border border-brand-lavender-border hover:border-brand-primary font-semibold text-brand-navy text-center"
              >
                Edit CEO Bio
              </Link>
              <Link
                to="/admin/settings"
                className="p-3 bg-white rounded-xl border border-brand-lavender-border hover:border-brand-primary font-semibold text-brand-navy text-center"
              >
                Site Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
