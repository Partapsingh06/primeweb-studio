import React, { useState } from 'react';
import { X, CheckCircle, Send, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import api from '../../services/api';

const QuoteModal = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceRequired: preselectedService || 'Business Website Development',
    estimatedBudget: '₹5,000 - ₹15,000',
    projectTimeline: 'Within 2-4 weeks',
    projectDescription: '',
    preferredContactMethod: 'Email',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/inquiries', formData);
      setSubmittedRef(res.data?.data?.referenceNumber || 'PWS-CONFIRMED');
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      serviceRequired: 'Business Website Development',
      estimatedBudget: '₹5,000 - ₹15,000',
      projectTimeline: 'Within 2-4 weeks',
      projectDescription: '',
      preferredContactMethod: 'Email',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-elevated border border-brand-lavender-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-brand-lavender/60 border-b border-brand-lavender-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-navy">Request a Free Project Quote</h3>
              <p className="text-xs text-brand-muted">Tell us about your project requirements.</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-brand-lavender transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submittedRef ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-brand-success rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-brand-navy">Quote Request Received!</h4>
                <p className="text-sm text-brand-body mt-1 max-w-md mx-auto">
                  Thank you for reaching out to PrimeWeb Studio. Our engineering and design team will review your requirements.
                </p>
              </div>

              <div className="bg-brand-lavender p-5 rounded-xl border border-brand-lavender-border max-w-md mx-auto">
                <p className="text-xs font-semibold uppercase text-brand-muted tracking-wider">
                  Your Project Reference Code
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="font-mono text-xl font-bold text-brand-primary tracking-wide">
                    {submittedRef}
                  </span>
                  <button
                    onClick={handleCopyRef}
                    className="p-1.5 text-brand-muted hover:text-brand-primary rounded bg-white border border-brand-lavender-border transition-colors"
                    title="Copy reference code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-brand-muted mt-2">
                  Keep this code handy. You can check the status anytime in your client portal.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-medium text-sm shadow-soft hover:opacity-95"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-brand-error text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Full Name <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Email Address <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Company / Brand Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Studio"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Service Required
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    <option value="Business Website Development">Business Website</option>
                    <option value="Full-Stack MERN Development">Full-Stack MERN</option>
                    <option value="E-commerce Development">E-commerce Store</option>
                    <option value="Portfolio Website Development">Portfolio Website</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Website Maintenance">Website Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Estimated Budget
                  </label>
                  <select
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    <option value="₹2,999 - ₹5,000">₹2,999 - ₹5,000 (Starter)</option>
                    <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000 (Business)</option>
                    <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000 (Growth / Store)</option>
                    <option value="₹35,000+">₹35,000+ (Custom Full-Stack)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Preferred Contact
                  </label>
                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Project Description & Goals <span className="text-brand-error">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Tell us about your project, target audience, preferred pages, or special features..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-sm text-brand-body hover:bg-brand-lavender rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white text-sm font-semibold shadow-soft hover:opacity-95 disabled:opacity-60 transition-all"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
