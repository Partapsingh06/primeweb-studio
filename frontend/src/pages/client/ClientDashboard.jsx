import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await api.get('/inquiries/my');
        if (res.data?.data?.inquiries) {
          setInquiries(res.data.data.inquiries);
        }
      } catch (err) {
        console.error('Failed to load client inquiries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Discussion': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'In Progress': return 'bg-purple-50 text-brand-primary border-brand-lavender-border';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Welcome Header */}
      <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Client Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Welcome, {user?.name || 'Client'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Manage your project inquiries, track delivery progress, and collaborate with PrimeWeb Studio.
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-xs shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Inquiry</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft">
          <span className="text-xs font-medium text-brand-muted block">Submitted Inquiries</span>
          <span className="text-3xl font-extrabold text-brand-navy mt-1 block">
            {inquiries.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft">
          <span className="text-xs font-medium text-brand-muted block">Active Projects / In Review</span>
          <span className="text-3xl font-extrabold text-brand-primary mt-1 block">
            {inquiries.filter((i) => i.status !== 'Completed' && i.status !== 'Closed').length}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-brand-lavender-border shadow-soft">
          <span className="text-xs font-medium text-brand-muted block">Completed Deliveries</span>
          <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
            {inquiries.filter((i) => i.status === 'Completed').length}
          </span>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-brand-lavender-border pb-4">
          <h2 className="text-lg font-bold text-brand-navy">Recent Inquiries & Estimates</h2>
          <Link
            to="/client/inquiries"
            className="text-xs font-semibold text-brand-primary hover:text-brand-secondary"
          >
            View All ({inquiries.length})
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((n) => (
              <div key={n} className="h-16 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : inquiries.length > 0 ? (
          <div className="divide-y divide-brand-lavender-border/50">
            {inquiries.slice(0, 5).map((inq) => (
              <div key={inq._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-brand-primary">
                      {inq.referenceNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusColor(
                        inq.status
                      )}`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-brand-navy">{inq.serviceRequired}</h4>
                  <p className="text-xs text-brand-muted line-clamp-1">{inq.projectDescription}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-brand-navy block">
                    {inq.estimatedBudget}
                  </span>
                  <span className="text-[11px] text-brand-muted block">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-3">
            <MessageSquare className="w-10 h-10 text-brand-muted mx-auto" />
            <h4 className="font-bold text-sm text-brand-navy">No Project Inquiries Yet</h4>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Ready to begin? Submit your first project inquiry or request a custom quote.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
