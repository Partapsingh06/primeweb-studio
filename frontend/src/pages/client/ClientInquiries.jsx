import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock, Plus, Eye, X, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

const ClientInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await api.get('/inquiries/my');
        if (res.data?.data?.inquiries) {
          setInquiries(res.data.data.inquiries);
        }
      } catch (err) {
        console.error('Failed to load inquiries:', err);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">My Project Inquiries</h1>
          <p className="text-xs text-brand-muted">
            Track the status of all your submitted quotes, proposals, and development requests.
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-xs shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Inquiry</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Service Required</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Timeline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-mono font-bold text-brand-primary">
                      {inq.referenceNumber}
                    </td>
                    <td className="p-4 font-semibold text-brand-navy">{inq.serviceRequired}</td>
                    <td className="p-4">{inq.estimatedBudget}</td>
                    <td className="p-4">{inq.projectTimeline}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-brand-muted">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded-lg text-brand-primary hover:bg-brand-lavender transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-brand-muted mx-auto" />
            <h4 className="font-bold text-sm text-brand-navy">No Inquiries Found</h4>
            <p className="text-xs text-brand-muted">Submit an inquiry to begin your development roadmap.</p>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-brand-lavender-border shadow-elevated overflow-hidden p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-brand-primary">
                  {selectedInquiry.referenceNumber}
                </span>
                <h3 className="text-lg font-bold text-brand-navy">
                  {selectedInquiry.serviceRequired}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-brand-lavender/40 rounded-xl">
                <div>
                  <span className="text-brand-muted block">Status</span>
                  <span className="font-bold text-brand-navy">{selectedInquiry.status}</span>
                </div>
                <div>
                  <span className="text-brand-muted block">Estimated Budget</span>
                  <span className="font-bold text-brand-navy">{selectedInquiry.estimatedBudget}</span>
                </div>
                <div>
                  <span className="text-brand-muted block">Timeline</span>
                  <span className="font-bold text-brand-navy">{selectedInquiry.projectTimeline}</span>
                </div>
                <div>
                  <span className="text-brand-muted block">Contact Channel</span>
                  <span className="font-bold text-brand-navy">{selectedInquiry.preferredContactMethod}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-brand-navy block mb-1">Your Project Description</span>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-brand-body leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.projectDescription}
                </p>
              </div>

              {selectedInquiry.adminResponse && (
                <div className="p-3 bg-purple-50 border border-brand-lavender-border rounded-xl space-y-1">
                  <span className="font-bold text-brand-primary block">Agency Response & Update</span>
                  <p className="text-brand-body">{selectedInquiry.adminResponse}</p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl bg-brand-lavender text-brand-navy font-semibold text-xs hover:bg-brand-lavender-border"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientInquiries;
