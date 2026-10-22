import React, { useState, useEffect } from 'react';
import { UserCheck, Upload, CheckCircle, AlertCircle, Save, ExternalLink, Mail, MapPin, Linkedin, Github, Instagram } from 'lucide-react';
import api from '../../services/api';

const AdminCEO = () => {
  const [profile, setProfile] = useState({
    name: 'Partap Singh',
    title: 'Founder & CEO | Full Stack MERN Developer',
    address: 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110',
    contactEmail: 'Partapxsingh05@gmail.com',
    shortIntro: '',
    biography: '',
    technicalSkills: '',
    areasOfExpertise: '',
    philosophy: '',
    vision: '',
    photoUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/partap-singh-0ab8003a9',
    githubUrl: 'https://github.com/Partapsingh06',
    instagramUrl: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/ceo');
        if (res.data?.data?.profile) {
          const p = res.data.data.profile;
          setProfile({
            ...p,
            technicalSkills: p.technicalSkills ? p.technicalSkills.join(', ') : '',
            areasOfExpertise: p.areasOfExpertise ? p.areasOfExpertise.join('\n') : '',
          });
        }
      } catch (err) {
        setFeedback({ msg: '', err: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (feedback.err) setFeedback({ msg: '', err: '' });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setFeedback({
        msg: '',
        err: 'Invalid image format. Please select a JPEG, PNG, or WEBP photo.',
      });
      return;
    }

    // Validate size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFeedback({
        msg: '',
        err: 'Image file size exceeds 5MB limit. Please select a smaller photo.',
      });
      return;
    }

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      setFeedback({ msg: '', err: '' });
      const res = await api.post('/ceo/photo', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.data?.url) {
        setProfile((prev) => ({
          ...prev,
          photoUrl: res.data.data.url,
          photoPublicId: res.data.data.publicId || '',
        }));
        setFeedback({
          msg: 'CEO photo uploaded securely to Cloudinary and profile updated successfully!',
          err: '',
        });
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message || 'Failed to upload photo to Cloudinary.' });
    } finally {
      setUploading(false);
      // Reset input value so same file or replacement can be re-selected
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ msg: '', err: '' });

    try {
      const payload = {
        ...profile,
        technicalSkills: profile.technicalSkills
          ? profile.technicalSkills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        areasOfExpertise: profile.areasOfExpertise
          ? profile.areasOfExpertise.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      const res = await api.put('/ceo', payload);
      if (res.data?.data?.profile) {
        setFeedback({ msg: 'CEO Profile updated successfully.', err: '' });
      }
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-brand-muted">Loading CEO details...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy">CEO Profile Management</h1>
        <p className="text-xs text-brand-muted">
          Update executive portrait, founder biography, technical competencies, and development vision.
        </p>
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

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-6 text-xs">
        {/* Photo Upload Section */}
        <div className="p-6 bg-brand-lavender/40 border border-brand-lavender-border rounded-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-lavender border-2 border-brand-lavender-border shrink-0 flex items-center justify-center">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="CEO" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center font-bold text-brand-primary">PS</div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <span className="font-bold text-sm text-brand-navy block">CEO Portrait / Photo</span>
            <p className="text-brand-muted text-[11px]">
              Upload a professional portrait (JPEG, PNG, WEBP). Recommended minimum 500x500px.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-brand-primary file:text-white file:text-xs file:font-semibold cursor-pointer"
              />
              {uploading && <span className="text-brand-primary font-semibold">Uploading...</span>}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-brand-navy mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">Designation & Title</label>
            <input
              type="text"
              name="title"
              required
              value={profile.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-brand-navy mb-1">Short Introduction Quote</label>
          <textarea
            rows={2}
            name="shortIntro"
            required
            value={profile.shortIntro}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-brand-navy mb-1">Professional Biography</label>
          <textarea
            rows={4}
            name="biography"
            required
            value={profile.biography}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
          />
        </div>

        {/* Technical Skills */}
        <div>
          <label className="block font-semibold text-brand-navy mb-1">
            Technical Skills (Comma separated)
          </label>
          <input
            type="text"
            name="technicalSkills"
            value={profile.technicalSkills}
            onChange={handleChange}
            placeholder="HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, REST APIs, Git"
            className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
          />
        </div>

        <div>
          <label className="block font-semibold text-brand-navy mb-1">
            Areas of Expertise (One per line)
          </label>
          <textarea
            rows={3}
            name="areasOfExpertise"
            value={profile.areasOfExpertise}
            onChange={handleChange}
            placeholder="Full-Stack MERN Architecture&#10;Responsive Frontend Engineering&#10;RESTful API Design"
            className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
          />
        </div>

        {/* Philosophy & Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-brand-navy mb-1">Development Philosophy</label>
            <textarea
              rows={3}
              name="philosophy"
              value={profile.philosophy}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">Leadership Vision</label>
            <textarea
              rows={3}
              name="vision"
              value={profile.vision}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
            />
          </div>
        </div>

        {/* Contact & Location Information */}
        <div className="p-4 bg-brand-lavender/30 border border-brand-lavender-border rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-brand-navy font-bold text-xs uppercase tracking-wider">
            <Mail className="w-4 h-4 text-brand-primary" />
            <span>Direct Contact & Physical Location</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-primary" />
                <span>Direct Contact Email</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                required
                value={profile.contactEmail || ''}
                onChange={handleChange}
                placeholder="Partapxsingh05@gmail.com"
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>

            <div>
              <label className="block font-semibold text-brand-navy mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                <span>Office / Location Address</span>
              </label>
              <input
                type="text"
                name="address"
                required
                value={profile.address || ''}
                onChange={handleChange}
                placeholder="Mullanpur Dhaka, Ludhiana, Punjab, India – 144110"
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-2">
          <label className="block font-semibold text-brand-navy text-xs uppercase tracking-wider">
            Official Social & Developer Profiles
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-brand-navy mb-1 flex items-center space-x-1">
                <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={profile.linkedinUrl || ''}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/partap-singh-0ab8003a9"
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1 flex items-center space-x-1">
                <Github className="w-3.5 h-3.5 text-slate-800" />
                <span>GitHub Profile URL</span>
              </label>
              <input
                type="url"
                name="githubUrl"
                value={profile.githubUrl || ''}
                onChange={handleChange}
                placeholder="https://github.com/Partapsingh06"
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1 flex items-center space-x-1">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={profile.instagramUrl || ''}
                onChange={handleChange}
                placeholder="https://www.instagram.com/prime.webstudio..."
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-lavender-border flex items-center justify-end space-x-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-xs shadow-soft hover:opacity-95 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Profile...' : 'Save CEO Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCEO;
