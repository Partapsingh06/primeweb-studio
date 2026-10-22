import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Copy, Check, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';

const QuotePage = () => {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState(null);
  const [copied, setCopied] = useState(false);

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
      setError(err.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-16 bg-white min-h-screen">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROJECT ESTIMATION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
          Request a Free Project Quote
        </h1>
        <p className="text-base sm:text-lg text-brand-body leading-relaxed max-w-xl mx-auto">
          Provide your specifications below and receive an accurate proposal tailored to your technical and budgetary goals.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-lavender-border shadow-elevated">
          {submittedRef ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-brand-success rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy">Quote Request Dispatched!</h3>
              <p className="text-sm text-brand-body max-w-md mx-auto">
                We have registered your project inquiry. Use this code for tracking your status:
              </p>

              <div className="bg-brand-lavender p-5 rounded-2xl border border-brand-lavender-border max-w-sm mx-auto">
                <span className="text-xs text-brand-muted uppercase font-bold tracking-wider block">
                  Project Code
                </span>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="font-mono text-2xl font-extrabold text-brand-primary tracking-wide">
                    {submittedRef}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white border border-brand-lavender-border text-brand-muted hover:text-brand-primary"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSubmittedRef(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
                >
                  Submit Another Quote
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-brand-error text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Your Full Name <span className="text-brand-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
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
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Studio Ltd"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Primary Service
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    <option value="Business Website Development">Business Website</option>
                    <option value="Full-Stack MERN Development">Full-Stack MERN</option>
                    <option value="E-commerce Development">E-commerce Platform</option>
                    <option value="Portfolio Website Development">Portfolio Website</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Website Maintenance">Website Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Target Budget
                  </label>
                  <select
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    <option value="₹2,999 - ₹5,000">₹2,999 - ₹5,000</option>
                    <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
                    <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                    <option value="₹35,000+">₹35,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Project Timeline
                  </label>
                  <select
                    name="projectTimeline"
                    value={formData.projectTimeline}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                    <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">
                  Project Description & Specifications <span className="text-brand-error">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  required
                  rows={5}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Outline key requirements, design ideas, reference websites, or functionality you need..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-purple text-white font-bold text-sm shadow-soft hover:opacity-95 disabled:opacity-60 transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Processing Quote Request...</span>
                  ) : (
                    <>
                      <span>Submit Request & Generate Reference</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuotePage;
