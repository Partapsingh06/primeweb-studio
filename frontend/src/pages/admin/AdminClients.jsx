import React, { useState, useEffect } from 'react';
import { Users, Search, ShieldAlert, CheckCircle, Eye, X, Building, Mail, Phone } from 'lucide-react';
import api from '../../services/api';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientInquiries, setClientInquiries] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      const res = await api.get('/users/clients', { params });
      if (res.data?.data?.clients) {
        setClients(res.data.data.clients);
      }
    } catch (err) {
      console.error('Failed to load clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [search]);

  const handleOpenClient = async (client) => {
    setSelectedClient(client);
    setLoadingDetail(true);
    try {
      const res = await api.get(`/users/clients/${client._id}`);
      if (res.data?.data?.inquiries) {
        setClientInquiries(res.data.data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load client history:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.put(`/users/clients/${id}/status`);
      if (res.data?.data?.client) {
        if (selectedClient && selectedClient._id === id) {
          setSelectedClient(res.data.data.client);
        }
        fetchClients();
      }
    } catch (err) {
      alert(err.message || 'Failed to toggle client status.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Registered Client Accounts</h1>
          <p className="text-xs text-brand-muted">
            Inspect client accounts, view inquiry history, and toggle account activation.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-lavender-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : clients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Registered Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {clients.map((c) => (
                  <tr key={c._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy">{c.name}</td>
                    <td className="p-4 text-brand-primary">{c.email}</td>
                    <td className="p-4">{c.company || '—'}</td>
                    <td className="p-4">{c.phone || '—'}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          c.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-brand-muted">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenClient(c)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                        title="View Client Inquiries"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(c._id)}
                        className={`p-1.5 rounded text-xs font-semibold ${
                          c.status === 'active'
                            ? 'text-rose-600 hover:bg-rose-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={c.status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
                      >
                        {c.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-brand-muted">No registered clients found.</div>
        )}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-brand-lavender-border shadow-elevated p-6 space-y-5 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <div>
                <h3 className="text-lg font-bold text-brand-navy">{selectedClient.name}</h3>
                <span className="text-[11px] text-brand-muted">{selectedClient.email}</span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-brand-lavender/30 rounded-xl">
              <div>
                <span className="text-brand-muted block">Account Status</span>
                <span className="font-bold text-brand-navy">{selectedClient.status}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Phone</span>
                <span className="font-bold text-brand-navy">{selectedClient.phone || '—'}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Company</span>
                <span className="font-bold text-brand-navy">{selectedClient.company || '—'}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Member Since</span>
                <span className="font-bold text-brand-navy">
                  {new Date(selectedClient.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Inquiries submitted by this client */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-brand-navy">
                Associated Inquiries ({clientInquiries.length})
              </h4>
              {loadingDetail ? (
                <div className="p-4 text-center text-brand-muted">Loading inquiries...</div>
              ) : clientInquiries.length > 0 ? (
                <div className="space-y-2">
                  {clientInquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-brand-primary">
                          {inq.referenceNumber}
                        </span>
                        <span className="px-2 py-0.5 bg-brand-lavender rounded text-[10px] font-semibold text-brand-navy">
                          {inq.status}
                        </span>
                      </div>
                      <p className="font-semibold text-brand-navy">{inq.serviceRequired}</p>
                      <p className="text-brand-muted text-[11px] line-clamp-2">
                        {inq.projectDescription}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-brand-muted py-2">No inquiries recorded for this account.</p>
              )}
            </div>

            <div className="pt-3 border-t border-brand-lavender-border flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(selectedClient._id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  selectedClient.status === 'active'
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                {selectedClient.status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
              </button>
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 rounded-xl bg-brand-lavender text-brand-navy font-semibold text-xs hover:bg-brand-lavender-border"
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

export default AdminClients;
