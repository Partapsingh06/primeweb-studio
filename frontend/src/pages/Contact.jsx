import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Copy, Check, Sparkles } from 'lucide-react';
import api from '../services/api';

const Contact = () => {
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

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data?.data?.settings) {
          setSettings(res.data.data.settings);
        }
      } catch (e) {
        // Fallback safely
      }
    };
    fetchSettings();
  }, []);

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

  const handleCopy = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-20 bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONTACT OUR TEAM</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          Let's Discuss Your Next Digital Project.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          Fill out the form below for a tailored estimate, or reach out directly via email or our contact channels.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-brand-navy text-white space-y-6 shadow-soft">
              <h3 className="text-2xl font-bold text-white">Agency Information</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We work with businesses globally. Reach out with your requirements and we will review and schedule an introductory project discussion.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Direct Business Email</span>
                    <a
                      href={`mailto:${settings?.businessEmail || 'contact@primewebstudio.com'}`}
                      className="font-medium hover:text-brand-violet transition-colors"
                    >
                      {settings?.businessEmail || 'contact@primewebstudio.com'}
                    </a>
                  </div>
                </div>

                {settings?.contactPhone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block">Phone Consultation</span>
                      <a href={`tel:${settings.contactPhone}`} className="font-medium hover:text-brand-violet">
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Business Working Hours</span>
                    <span className="font-medium">
                      {settings?.businessHours || 'Mon - Fri: 9:00 AM - 6:00 PM IST'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Headquarters & Service Reach</span>
                    <span className="font-medium text-xs leading-relaxed block text-slate-300">
                      {settings?.address || 'Remote Digital Agency (Serving Global Clients)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-brand-lavender/40 border border-brand-lavender-border space-y-2">
              <h4 className="font-bold text-sm text-brand-navy">What Happens Next?</h4>
              <p className="text-xs text-brand-body leading-relaxed">
                1. You will receive an instant Project Reference Code upon submission.
                <br />
                2. Our engineering team reviews your goals and timeline.
                <br />
                3. We follow up via your preferred contact channel within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-lavender-border shadow-soft">
              {submittedRef ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 text-brand-success rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-brand-navy">Inquiry Received!</h3>
                  <p className="text-sm text-brand-body max-w-md mx-auto">
                    Thank you for reaching out. We have registered your requirements under the following reference code:
                  </p>

                  <div className="bg-brand-lavender p-5 rounded-2xl border border-brand-lavender-border max-w-sm mx-auto">
                    <span className="text-xs text-brand-muted uppercase font-bold tracking-wider block">
                      Reference Number
                    </span>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="font-mono text-2xl font-extrabold text-brand-primary tracking-wide">
                        {submittedRef}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-lg bg-white border border-brand-lavender-border hover:text-brand-primary text-brand-muted transition-colors"
                        title="Copy Reference"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-brand-muted" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-2xl font-bold text-brand-navy mb-4">Project Inquiry Form</h3>

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
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
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
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
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
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-navy mb-1">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your Company / Brand"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
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
                        className="w-full px-3 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
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
                        Estimated Budget
                      </label>
                      <select
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                      >
                        <option value="₹2,999 - ₹5,000">₹2,999 - ₹5,000</option>
                        <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
                        <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                        <option value="₹35,000+">₹35,000+</option>
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
                        className="w-full px-3 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                      >
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Project Description <span className="text-brand-error">*</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      required
                      rows={5}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Please describe your project, preferred features, target audience, or references..."
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 disabled:opacity-60 transition-all"
                    >
                      {loading ? (
                        <span>Submitting Requirements...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry & Receive Code</span>
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
      </section>
    </div>
  );
};

export default Contact;
