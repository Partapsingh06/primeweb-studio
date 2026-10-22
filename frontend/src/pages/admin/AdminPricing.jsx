import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import api from '../../services/api';

const AdminPricing = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  const initialForm = {
    name: '',
    price: '₹2,999',
    billingPeriod: 'Starting price',
    description: '',
    badge: '',
    popular: false,
    ctaText: 'Get Started',
    featuresText: '',
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const res = await api.get('/pricing/admin/all');
      if (res.data?.data?.packages) {
        setPackages(res.data.data.packages);
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingId(pkg._id);
    const featuresStr = pkg.features
      ? pkg.features.map((f) => (f.included ? f.title : `-${f.title}`)).join('\n')
      : '';

    setFormData({
      name: pkg.name || '',
      price: pkg.price || '₹2,999',
      billingPeriod: pkg.billingPeriod || 'Starting price',
      description: pkg.description || '',
      badge: pkg.badge || '',
      popular: Boolean(pkg.popular),
      ctaText: pkg.ctaText || 'Get Started',
      featuresText: featuresStr,
      isPublished: Boolean(pkg.isPublished),
    });
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', err: '' });

    try {
      const features = formData.featuresText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          if (line.startsWith('-')) {
            return { title: line.slice(1).trim(), included: false };
          }
          return { title: line, included: true };
        });

      const payload = {
        name: formData.name,
        price: formData.price,
        billingPeriod: formData.billingPeriod,
        description: formData.description,
        badge: formData.badge,
        popular: formData.popular,
        ctaText: formData.ctaText,
        features,
        isPublished: formData.isPublished,
      };

      if (editingId) {
        await api.put(`/pricing/${editingId}`, payload);
        setFeedback({ msg: 'Pricing tier updated successfully.', err: '' });
      } else {
        await api.post('/pricing', payload);
        setFeedback({ msg: 'Pricing tier created successfully.', err: '' });
      }

      setModalOpen(false);
      fetchPricing();
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete package "${name}"?`)) return;
    try {
      await api.delete(`/pricing/${id}`);
      fetchPricing();
    } catch (err) {
      alert(err.message || 'Failed to delete package.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Pricing Tier Management</h1>
          <p className="text-xs text-brand-muted">
            Configure package rates, badges, feature checklists, and illustrative prices.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pricing Package</span>
        </button>
      </div>

      {feedback.msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Pricing Table */}
      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : packages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Package Name</th>
                  <th className="p-4">Starting Price</th>
                  <th className="p-4">Badge</th>
                  <th className="p-4">Highlighted</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {packages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy">{pkg.name}</td>
                    <td className="p-4 font-bold text-brand-primary">{pkg.price}</td>
                    <td className="p-4">{pkg.badge || '—'}</td>
                    <td className="p-4">{pkg.popular ? '★ Most Popular' : 'Standard'}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          pkg.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {pkg.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(pkg)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id, pkg.name)}
                        className="p-1.5 text-brand-muted hover:text-brand-error rounded hover:bg-red-50"
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
          <div className="p-12 text-center text-xs text-brand-muted">No pricing packages found.</div>
        )}
      </div>

      {/* Package Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-brand-lavender-border shadow-elevated p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <h3 className="text-lg font-bold text-brand-navy">
                {editingId ? 'Edit Package' : 'Create Pricing Package'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Starter Website"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Starting Price *</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. ₹2,999"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Most Popular"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Billing Subtitle</label>
                  <input
                    type="text"
                    value={formData.billingPeriod}
                    onChange={(e) => setFormData({ ...formData, billingPeriod: e.target.value })}
                    placeholder="Illustrative Starting Price"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Target audience or package purpose..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">
                  Features (Prefix with '-' if excluded)
                </label>
                <textarea
                  rows={5}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Single Landing Page Layout&#10;Mobile-First Responsive Design&#10;-E-Commerce Integration (Excluded)"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border font-mono text-xs resize-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="rounded text-brand-primary"
                  />
                  <span>Mark as Popular / Featured</span>
                </label>

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
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPricing;
