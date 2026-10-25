import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';
import api, { getImageUrl } from '../../services/api';

const AdminMedia = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [error, setError] = useState('');

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get('/media');
      if (res.data?.data?.files) {
        setFiles(res.data.data.files);
      }
    } catch (err) {
      setError(err.message || 'Failed to load media.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      setError('');
      await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchMedia();
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Delete image ${filename}?`)) return;
    try {
      await api.delete(`/media/${filename}`);
      fetchMedia();
    } catch (err) {
      alert(err.message || 'Failed to delete media file.');
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Media & Asset Library</h1>
          <p className="text-xs text-brand-muted">
            Upload and manage project mockups, blog banners, portraits, and branding assets.
          </p>
        </div>

        <label className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Image (Max 5MB)'}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-brand-error text-xs rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of uploaded images */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-44 bg-brand-lavender/30 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : files.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file.filename}
              className="bg-white rounded-2xl border border-brand-lavender-border shadow-soft overflow-hidden group flex flex-col justify-between"
            >
              <div className="h-36 bg-slate-100 flex items-center justify-center overflow-hidden relative">
                <img
                  src={getImageUrl(file.url)}
                  alt={file.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-3 space-y-2">
                <p className="text-[11px] font-mono font-medium text-brand-navy truncate">
                  {file.filename}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <button
                    onClick={() => handleCopy(getImageUrl(file.url))}
                    className="inline-flex items-center space-x-1 text-[11px] font-semibold text-brand-primary hover:text-brand-secondary"
                    title="Copy URL"
                  >
                    {copiedUrl === getImageUrl(file.url) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(file.filename)}
                    className="p-1 text-brand-muted hover:text-brand-error rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-brand-lavender-border shadow-soft space-y-3">
          <ImageIcon className="w-10 h-10 text-brand-muted mx-auto" />
          <h3 className="font-bold text-sm text-brand-navy">No media uploaded yet</h3>
          <p className="text-xs text-brand-muted">Upload project thumbnails, client logos, or blog headers.</p>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
