import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle, BookOpen, Clock } from 'lucide-react';
import api from '../../services/api';

const AdminBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  const initialForm = {
    title: '',
    excerpt: '',
    content: '',
    category: 'Web Development',
    tags: '',
    author: 'PrimeWeb Studio',
    readTime: '4 min read',
    isPublished: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/blogs/admin/all');
      if (res.data?.data?.posts) {
        setPosts(res.data.data.posts);
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFeedback({ msg: '', err: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingId(post._id);
    setFormData({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Web Development',
      tags: post.tags ? post.tags.join(', ') : '',
      author: post.author || 'PrimeWeb Studio',
      readTime: post.readTime || '4 min read',
      isPublished: Boolean(post.isPublished),
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
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
      };

      if (editingId) {
        await api.put(`/blogs/${editingId}`, payload);
        setFeedback({ msg: 'Post updated successfully.', err: '' });
      } else {
        await api.post('/blogs', payload);
        setFeedback({ msg: 'Post published successfully.', err: '' });
      }

      setModalOpen(false);
      fetchPosts();
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchPosts();
    } catch (err) {
      alert(err.message || 'Failed to delete post.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Blog & Content Management</h1>
          <p className="text-xs text-brand-muted">
            Publish engineering articles, technical insights, and design tutorials.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {feedback.msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white rounded-3xl border border-brand-lavender-border shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-14 bg-brand-lavender/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-lavender/40 border-b border-brand-lavender-border text-brand-navy font-bold">
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Read Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-lavender-border/50 text-brand-body">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-brand-lavender/20 transition-colors">
                    <td className="p-4 font-semibold text-brand-navy">
                      <div>
                        <span>{post.title}</span>
                        <span className="block text-[11px] font-mono text-brand-muted">/{post.slug}</span>
                      </div>
                    </td>
                    <td className="p-4">{post.category}</td>
                    <td className="p-4 text-brand-muted">{post.author}</td>
                    <td className="p-4">{post.readTime}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          post.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 text-brand-navy hover:text-brand-primary rounded hover:bg-brand-lavender"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
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
          <div className="p-12 text-center text-xs text-brand-muted">No blog posts found.</div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-brand-lavender-border shadow-elevated p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-brand-lavender-border pb-3">
              <h3 className="text-lg font-bold text-brand-navy">
                {editingId ? 'Edit Article' : 'Write New Article'}
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
                <label className="block font-semibold text-brand-navy mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Web Architecture Patterns"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Performance">Performance</option>
                    <option value="Case Studies">Case Studies</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="4 min read"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="PrimeWeb Studio"
                    className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Excerpt (Summary) *</label>
                <textarea
                  required
                  rows={2}
                  maxLength={400}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short introductory summary for cards..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">Article Content *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Markdown or formatted article text..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border font-mono text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-navy mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, Frontend, Web Dev, Performance"
                  className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
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
                  <span>Publish to Public Blog</span>
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
