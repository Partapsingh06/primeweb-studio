import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle, Star } from 'lucide-react';
import api from '../../services/api';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  const initialForm = {
    clientName: '',
    clientRole: '',
    clientCompany: '',
    content: '',
    rating: 5,
    projectTitle: '',
    isVerified: true,
    isPublished: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/testimonials/admin/all');
      if (res.data?.data?.testimonials) {
        setTestimonials(res.data.data.testimonials);
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      clientName: t.clientName || '',
      clientRole: t.clientRole || '',
      clientCompany: t.clientCompany || '',
      content: t.content || '',
      rating: t.rating || 5,
      projectTitle: t.projectTitle || '',
      isVerified: Boolean(t.isVerified),
      isPublished: Boolean(t.isPublished),
    });
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ msg: '', err: '' });

    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, formData);
        setFeedback({ msg: 'Testimonial updated successfully.', err: '' });
      } else {
        await api.post('/testimonials', formData);
        setFeedback({ msg: 'Testimonial created successfully.', err: '' });
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      alert(err.message || 'Failed to delete testimonial.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Client Testimonials & Feedback</h1>
          <p className="text-xs text-brand-muted">
            Manage genuine client feedback. Unverified or draft reviews stay unpublished until reviewed.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Testimonial</span>
        </button>
      </div>

      {feedback.msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Testimonials Table */}
      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Company / Role</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Verified</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {testimonials.map((t) => (
                  <tr key={t._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy">{t.clientName}</td>
                    <td className="p-4 text-brand-muted">
                      {t.clientRole} {t.clientCompany && `(${t.clientCompany})`}
                    </td>
                    <td className="p-4 text-amber-500 font-bold">★ {t.rating}/5</td>
                    <td className="p-4">{t.isVerified ? '✓ Verified' : 'Unverified'}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          t.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t._id, t.clientName)}
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
          <div className="p-12 text-center text-xs text-brand-muted">
            No testimonials recorded yet. You can add verified client reviews as projects conclude.
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-brand-lavender-border shadow-elevated p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <h3 className="text-lg font-bold text-brand-navy">
                {editingId ? 'Edit Testimonial' : 'Add Client Review'}
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
                  <label className="block font-semibold text-brand-navy mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border bg-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="Founder / Marketing Lead"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Company / Brand</label>
                  <input
                    type="text"
                    value={formData.clientCompany}
                    onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                    placeholder="Company Ltd"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Testimonial Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Paste verified feedback provided by the client..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="rounded text-brand-primary"
                  />
                  <span>Mark as Verified Client</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-brand-primary"
                  />
                  <span>Publish to Public Site</span>
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
