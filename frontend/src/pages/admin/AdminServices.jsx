import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle, Layers } from 'lucide-react';
import api from '../../services/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  const initialForm = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    icon: 'Code',
    startingPrice: '',
    benefits: '',
    deliverables: '',
    order: 0,
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services/admin/all');
      if (res.data?.data?.services) {
        setServices(res.data.data.services);
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (svc) => {
    setEditingId(svc._id);
    setFormData({
      title: svc.title || '',
      shortDescription: svc.shortDescription || '',
      fullDescription: svc.fullDescription || '',
      icon: svc.icon || 'Code',
      startingPrice: svc.startingPrice || '',
      benefits: svc.benefits ? svc.benefits.join('\n') : '',
      deliverables: svc.deliverables ? svc.deliverables.join('\n') : '',
      order: svc.order || 0,
      isPublished: Boolean(svc.isPublished),
    });
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', err: '' });

    try {
      const payload = {
        ...formData,
        benefits: formData.benefits ? formData.benefits.split('\n').filter(Boolean) : [],
        deliverables: formData.deliverables ? formData.deliverables.split('\n').filter(Boolean) : [],
      };

      if (editingId) {
        await api.put(`/services/${editingId}`, payload);
        setFeedback({ msg: 'Service updated successfully.', err: '' });
      } else {
        await api.post('/services', payload);
        setFeedback({ msg: 'Service created successfully.', err: '' });
      }

      setModalOpen(false);
      fetchServices();
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete service "${title}"?`)) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.message || 'Failed to delete service.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Service Catalog Management</h1>
          <p className="text-xs text-brand-muted">
            Configure offered service lines, key deliverables, and pricing indications.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {feedback.msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Service Title</th>
                  <th className="p-4">Starting Price</th>
                  <th className="p-4">Icon</th>
                  <th className="p-4">Order</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {services.map((svc) => (
                  <tr key={svc._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy">
                      <div>
                        <span>{svc.title}</span>
                        <span className="block text-[11px] font-mono text-brand-muted">/{svc.slug}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{svc.startingPrice || 'Custom Quote'}</td>
                    <td className="p-4 font-mono text-brand-primary">{svc.icon}</td>
                    <td className="p-4">{svc.order}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          svc.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {svc.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(svc)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(svc._id, svc.title)}
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
          <div className="p-12 text-center text-xs text-brand-muted">No services found.</div>
        )}
      </div>

      {/* Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-brand-lavender-border shadow-elevated p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <h3 className="text-lg font-bold text-brand-navy">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-brand-navy mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Full-Stack MERN Development"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    placeholder="e.g. ₹5,999"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Icon Name</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border bg-white"
                  >
                    <option value="Globe">Globe</option>
                    <option value="Layers">Layers</option>
                    <option value="ShoppingCart">ShoppingCart</option>
                    <option value="Briefcase">Briefcase</option>
                    <option value="Palette">Palette</option>
                    <option value="Wrench">Wrench</option>
                    <option value="Code">Code</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  placeholder="Custom UI/UX layout&#10;On-page SEO setup&#10;Admin management"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-brand-primary"
                  />
                  <span>Publish to Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-lavender-border flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-brand-muted hover:bg-brand-lavender"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold shadow-soft hover:opacity-95"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
