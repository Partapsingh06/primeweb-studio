import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, AlertCircle, Mail, Globe, Phone, MapPin } from 'lucide-react';
import api from '../../services/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    websiteName: 'PrimeWeb Studio',
    tagline: 'Your Vision. Our Creation.',
    businessEmail: 'contact@primewebstudio.com',
    contactPhone: '',
    whatsappNumber: '',
    businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
    address: 'Remote Digital Agency (Serving Global Clients)',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    instagramUrl: '',
    footerContent: '',
    seoDefaultTitle: '',
    seoDefaultDesc: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ msg: '', err: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get('/settings');
        if (res.data?.data?.settings) {
          setSettings(res.data.data.settings);
        }
      } catch (err) {
        setFeedback({ msg: '', err: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    if (feedback.err) setFeedback({ msg: '', err: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ msg: '', err: '' });

    try {
      await api.put('/settings', settings);
      setFeedback({ msg: 'Agency settings updated successfully.', err: '' });
    } catch (err) {
      setFeedback({ msg: '', err: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-brand-muted">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy">Agency & Contact Settings</h1>
        <p className="text-xs text-brand-muted">
          Manage agency contact channels, social networks, footer contents, and default SEO attributes.
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
        {/* Brand Identity */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-brand-navy border-b border-brand-lavender-border pb-2">
            Brand Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Agency Name</label>
              <input
                type="text"
                name="websiteName"
                value={settings.websiteName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
          </div>
        </div>

        {/* Contact Channels */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-sm text-brand-navy border-b border-brand-lavender-border pb-2">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Official Business Email</label>
              <input
                type="email"
                name="businessEmail"
                value={settings.businessEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Contact Phone (Optional)</label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                placeholder="+91..."
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">WhatsApp Number (Optional)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                placeholder="+91..."
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Business Working Hours</label>
              <input
                type="text"
                name="businessHours"
                value={settings.businessHours}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">Address / Service Area</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-sm text-brand-navy border-b border-brand-lavender-border pb-2">
            Social Profiles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedinUrl"
                value={settings.linkedinUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={settings.githubUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Instagram URL (Optional)</label>
              <input
                type="url"
                name="instagramUrl"
                value={settings.instagramUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
          </div>
        </div>

        {/* Footer & SEO */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-sm text-brand-navy border-b border-brand-lavender-border pb-2">
            Footer Text & SEO Defaults
          </h3>
          <div>
            <label className="block font-semibold text-brand-navy mb-1">Footer About Text</label>
            <textarea
              rows={2}
              name="footerContent"
              value={settings.footerContent}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Default SEO Meta Title</label>
              <input
                type="text"
                name="seoDefaultTitle"
                value={settings.seoDefaultTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Default SEO Meta Description</label>
              <input
                type="text"
                name="seoDefaultDesc"
                value={settings.seoDefaultDesc}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-brand-lavender-border"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-lavender-border flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-xs shadow-soft hover:opacity-95 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
