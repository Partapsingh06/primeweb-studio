import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import api from '../services/api';

const PricingPage = ({ onOpenQuote }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await api.get('/pricing');
        if (res.data?.data?.packages) {
          setPackages(res.data.data.packages);
        }
      } catch (err) {
        console.error('Failed to load pricing:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  return (
    <div className="pt-32 pb-24 space-y-20 bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRANSPARENT VALUE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          Clear, Predictable Investment Plans.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          Select an illustrative package below or request a tailored estimate based on your specific requirements.
        </p>

        <div className="p-3 bg-brand-lavender/50 border border-brand-lavender-border rounded-xl max-w-xl mx-auto text-xs text-brand-muted">
          All listed pricing represents illustrative starting rates. Final scope and costs are finalized following requirement discovery.
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(packages.length > 0 ? packages : [
            {
              name: 'Starter Website',
              price: '₹2,999',
              billingPeriod: 'Illustrative Starting Price',
              description: 'Ideal for individuals, personal brands, and simple portfolios seeking a fast, refined web presence.',
              popular: false,
              ctaText: 'Start Your Project',
              features: [
                { title: 'Single or Multi-Section Landing Layout', included: true },
                { title: 'Mobile-First Responsive Design', included: true },
                { title: 'Contact & Social Link Integration', included: true },
                { title: 'Basic SEO & Speed Optimization', included: true },
                { title: 'Full-Stack MERN Architecture', included: false },
                { title: 'E-Commerce / Payment Gateway', included: false },
              ],
            },
            {
              name: 'Business Website',
              price: '₹5,999',
              billingPeriod: 'Illustrative Starting Price',
              description: 'Tailored for small businesses, startups, and service providers seeking lead generation and trust.',
              badge: 'Most Popular',
              popular: true,
              ctaText: 'Build Business Website',
              features: [
                { title: 'Up to 5 Custom-Designed Pages', included: true },
                { title: 'Interactive Inquiry & Quote Form', included: true },
                { title: 'Comprehensive On-Page SEO Setup', included: true },
                { title: 'Performance Optimization & Caching', included: true },
                { title: 'Admin Contact Management Ready', included: true },
                { title: 'Payment Gateway Integration', included: false },
              ],
            },
            {
              name: 'E-commerce Website',
              price: '₹9,999',
              billingPeriod: 'Illustrative Starting Price',
              description: 'Full-featured online store crafted for businesses ready to sell products and manage orders smoothly.',
              popular: false,
              ctaText: 'Launch Online Store',
              features: [
                { title: 'Custom Product Catalog & Filters', included: true },
                { title: 'Cart & Secure Checkout Workflows', included: true },
                { title: 'Order & Customer Tracking Structure', included: true },
                { title: 'Payment Gateway Setup Guidance', included: true },
                { title: 'Mobile-Optimized Shopping Experience', included: true },
                { title: 'Admin Product & Inventory Management', included: true },
              ],
            },
          ]).map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-3xl p-8 bg-white border transition-all duration-300 flex flex-col justify-between ${
                pkg.popular
                  ? 'border-brand-primary shadow-elevated relative md:-translate-y-2'
                  : 'border-brand-lavender-border shadow-soft hover:shadow-card'
              }`}
            >
              <div>
                {pkg.badge && (
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
                    {pkg.badge}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-brand-navy">{pkg.name}</h3>
                <p className="text-xs text-brand-muted mt-1 leading-normal">{pkg.description}</p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-brand-navy tracking-tight">{pkg.price}</span>
                  <span className="text-xs text-brand-muted block mt-1">{pkg.billingPeriod}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-brand-lavender-border text-sm text-brand-body">
                  {pkg.features && pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          feat.included ? 'text-brand-primary' : 'text-slate-300'
                        }`}
                      />
                      <span className={feat.included ? 'text-brand-navy' : 'text-slate-400 line-through'}>
                        {feat.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenQuote}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                    pkg.popular
                      ? 'bg-gradient-purple text-white shadow-soft hover:opacity-95'
                      : 'bg-brand-lavender text-brand-primary hover:bg-brand-lavender-border'
                  }`}
                >
                  {pkg.ctaText || 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Quote Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-brand-navy rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Need a Bespoke Specification?</h3>
            <p className="text-sm text-slate-300">
              Have specific API integrations, database requirements, or multi-tenant needs?
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 rounded-xl bg-white text-brand-navy font-bold text-sm hover:bg-brand-lavender hover:text-brand-primary transition-colors shrink-0"
          >
            Request Custom Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
