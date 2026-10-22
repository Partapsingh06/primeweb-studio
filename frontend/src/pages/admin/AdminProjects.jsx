import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, ExternalLink, Star, Sparkles, CheckCircle, AlertCircle, X, Upload } from 'lucide-react';
import api from '../../services/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  const initialForm = {
    title: '',
    description: '',
    shortDescription: '',
    category: 'Web Development',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    clientName: 'Demonstration Project',
    featured: false,
    isPublished: true,
    thumbnail: '',
    thumbnailPublicId: '',
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects/admin/all');
      if (res.data?.data?.projects) {
        setProjects(res.data.data.projects);
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj._id);
    setFormData({
      title: proj.title || '',
      description: proj.description || '',
      shortDescription: proj.shortDescription || '',
      category: proj.category || 'Web Development',
      technologies: proj.technologies ? proj.technologies.join(', ') : '',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      clientName: proj.clientName || 'Demonstration Project',
      featured: Boolean(proj.featured),
      isPublished: Boolean(proj.isPublished),
      thumbnail: proj.thumbnail || '',
      thumbnailPublicId: proj.thumbnailPublicId || '',
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
        technologies: formData.technologies
          ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
        setFeedback({ msg: 'Project updated successfully.', err: '' });
      } else {
        await api.post('/projects', payload);
        setFeedback({ msg: 'Project created successfully.', err: '' });
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete project "${title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/projects/${id}`);
      setFeedback({ msg: `Project "${title}" deleted successfully.`, err: '' });
      fetchProjects();
    } catch (err) {
      alert(err.message || 'Failed to delete project.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid image format. Please select a JPEG, PNG, or WEBP image.');
      return;
    }

    // Validate size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Image file size exceeds 5MB limit. Please select a smaller image.');
      return;
    }

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const res = await api.post('/media/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.data?.url) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: res.data.data.url,
          thumbnailPublicId: res.data.data.publicId || '',
        }));
      }
    } catch (err) {
      alert(err.message || 'Image upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Portfolio & Project Management</h1>
          <p className="text-xs text-brand-muted">
            Create, edit, and curate demonstration projects and client showcases.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {feedback.msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {feedback.err && (
        <div className="p-3 bg-red-50 border border-red-200 text-brand-error text-xs rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.err}</span>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Showcase Label</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy">
                      <div className="flex items-center space-x-3">
                        {proj.thumbnail ? (
                          <img
                            src={proj.thumbnail}
                            alt={proj.title}
                            className="w-10 h-10 rounded-lg object-cover border border-brand-lavender-border shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-brand-lavender/50 border border-brand-lavender-border flex items-center justify-center shrink-0 text-brand-primary">
                            <Sparkles className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <span>{proj.title}</span>
                          <span className="block text-[11px] font-mono text-brand-muted">/{proj.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{proj.category}</td>
                    <td className="p-4 text-brand-muted">{proj.clientName}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          proj.isPublished
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {proj.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      {proj.featured ? (
                        <span className="text-amber-500 font-bold text-xs flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id, proj.title)}
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
          <div className="p-12 text-center text-xs text-brand-muted">No projects found. Add one above!</div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-brand-lavender-border shadow-elevated overflow-hidden p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <h3 className="text-lg font-bold text-brand-navy">
                {editingId ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-brand-muted hover:text-brand-navy rounded-lg hover:bg-brand-lavender"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-brand-navy mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Manmeet Creations"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Showcase / Client Label</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Demonstration Project"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Short Description (Max 300 chars)</label>
                <input
                  type="text"
                  maxLength={300}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief summary for cards"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Full Description & Architecture *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive case study breakdown..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">
                  Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React.js, Node.js, Express, MongoDB, Tailwind CSS"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-navy mb-1">GitHub Repo URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
              </div>

              {/* Thumbnail / Image Upload */}
              <div>
                <label className="block font-semibold text-brand-navy mb-1">Thumbnail Image (Cloudinary / Device Upload)</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-brand-lavender file:text-brand-primary file:font-semibold cursor-pointer"
                    />
                    {uploading && <span className="text-brand-primary font-semibold animate-pulse">Uploading...</span>}
                  </div>
                  {formData.thumbnail && (
                    <div className="flex items-center space-x-3 p-2.5 bg-brand-lavender/30 rounded-xl border border-brand-lavender-border">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-12 h-12 rounded-lg object-cover border border-brand-lavender-border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-brand-navy font-medium truncate block">
                          {formData.thumbnail}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold">Image Ready</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '', thumbnailPublicId: '' }))}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-brand-primary focus:ring-brand-primary"
                  />
                  <span>Mark as Featured Project</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-brand-primary focus:ring-brand-primary"
                  />
                  <span>Publish to Public Website</span>
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
                  {editingId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
