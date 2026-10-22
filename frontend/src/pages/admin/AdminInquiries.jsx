import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Clock,
  User,
  Plus,
} from 'lucide-react';
import api from '../../services/api';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [internalNote, setInternalNote] = useState('');
  const [adminResponse, setAdminResponse] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState('New');
  const [priority, setPriority] = useState('Medium');
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  const statuses = ['All', 'New', 'Contacted', 'In Discussion', 'In Progress', 'Completed', 'Closed'];

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search) params.search = search;

      const res = await api.get('/inquiries/admin/all', { params });
      if (res.data?.data?.inquiries) {
        setInquiries(res.data.data.inquiries);
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, search]);

  const handleOpenDetail = (inq) => {
    setSelectedInquiry(inq);
    setInquiryStatus(inq.status);
    setPriority(inq.priority || 'Medium');
    setAdminResponse(inq.adminResponse || '');
    setInternalNote('');
  };

  const handleUpdateInquiry = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    try {
      const res = await api.put(`/inquiries/admin/${selectedInquiry._id}`, {
        status: inquiryStatus,
        priority,
        adminResponse,
        internalNote: internalNote.trim() ? internalNote.trim() : undefined,
      });

      setSelectedInquiry(res.data.data.inquiry);
      setInternalNote('');
      setFeedback({ msg: 'Inquiry updated successfully.', err: '' });
      fetchInquiries();
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    }
  };

  const handleDelete = async (id, ref) => {
    if (!window.confirm(`Delete inquiry ${ref}?`)) return;
    try {
      await api.delete(`/inquiries/admin/${id}`);
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (err) {
      alert(err.message || 'Failed to delete inquiry.');
    }
  };

  const handleExportCsv = async () => {
    try {
      const response = await api.get('/inquiries/admin/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `primeweb_leads_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to export inquiries.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Contacted': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Discussion': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'In Progress': return 'bg-purple-50 text-brand-primary border-brand-lavender-border';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Client Inquiries & Leads</h1>
          <p className="text-xs text-brand-muted">
            Manage incoming contact requests, update progress notes, and assign priorities.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-brand-lavender-border bg-white text-brand-navy hover:bg-brand-lavender text-xs font-semibold shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 text-brand-primary" />
          <span>Export CSV</span>
        </button>
      </div>

      {feedback.msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-brand-primary text-white shadow-soft'
                  : 'bg-white border border-brand-lavender-border text-brand-body hover:bg-brand-lavender'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-lavender-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      {/* Inquiries Table */}
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
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-mono font-bold text-brand-primary">
                      {inq.referenceNumber}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-brand-navy block">{inq.fullName}</span>
                      <span className="text-[11px] text-brand-muted block">{inq.email}</span>
                    </td>
                    <td className="p-4">{inq.serviceRequired}</td>
                    <td className="p-4">{inq.estimatedBudget}</td>
                    <td className="p-4 font-medium">{inq.preferredContactMethod}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-brand-muted">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenDetail(inq)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                        title="View & Edit"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inq._id, inq.referenceNumber)}
                        className="p-1.5 text-brand-muted hover:text-brand-error rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-brand-muted">No inquiries found.</div>
        )}
      </div>

      {/* Detail & Status Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-brand-lavender-border shadow-elevated p-6 space-y-5 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-brand-primary block">
                  {selectedInquiry.referenceNumber}
                </span>
                <h3 className="text-lg font-bold text-brand-navy">
                  Inquiry: {selectedInquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inquirer Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-brand-lavender/40 rounded-2xl">
              <div>
                <span className="text-brand-muted block">Email</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-brand-primary">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-brand-muted block">Phone</span>
                <span className="font-bold text-brand-navy">{selectedInquiry.phone || '—'}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Company</span>
                <span className="font-bold text-brand-navy">{selectedInquiry.companyName || '—'}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Service</span>
                <span className="font-bold text-brand-navy">{selectedInquiry.serviceRequired}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Budget</span>
                <span className="font-bold text-brand-navy">{selectedInquiry.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Timeline</span>
                <span className="font-bold text-brand-navy">{selectedInquiry.projectTimeline}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="font-bold text-brand-navy block mb-1">Project Description:</span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl whitespace-pre-wrap text-brand-body leading-relaxed">
                {selectedInquiry.projectDescription}
              </p>
            </div>

            {/* Internal Notes History */}
            {selectedInquiry.internalNotes && selectedInquiry.internalNotes.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-brand-navy block">Internal Team Notes:</span>
                <div className="space-y-1.5">
                  {selectedInquiry.internalNotes.map((n, i) => (
                    <div key={i} className="p-2.5 bg-brand-lavender/50 rounded-lg text-[11px] space-y-0.5">
                      <div className="flex items-center justify-between text-brand-muted font-medium">
                        <span>{n.author || 'Admin'}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-brand-navy">{n.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Update Form */}
            <form onSubmit={handleUpdateInquiry} className="space-y-4 pt-4 border-t border-brand-lavender-border">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Status</label>
                  <select
                    value={inquiryStatus}
                    onChange={(e) => setInquiryStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">
                  Client-Visible Response / Update
                </label>
                <input
                  type="text"
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  placeholder="e.g. Requirements reviewed. Milestone 1 scheduled for next week."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">
                  Add Internal Note (Staff Only)
                </label>
                <textarea
                  rows={2}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Record call summary or technical evaluation..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl text-brand-muted hover:bg-brand-lavender"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold shadow-soft hover:opacity-95"
                >
                  Save Status & Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
