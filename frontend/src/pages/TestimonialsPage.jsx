import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import api from '../services/api';

const TestimonialsPage = ({ onOpenQuote }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        if (res.data?.data?.testimonials) {
          setTestimonials(res.data.data.testimonials);
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="pt-32 pb-24 space-y-20 bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CLIENT REVIEWS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          Verified Client Testimonials.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          We maintain strict transparency: all published reviews come from verified project collaborations.
        </p>
      </section>

      {/* Testimonials Grid or Honest Prompt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="p-8 rounded-3xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-body italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-lavender-border flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy">{t.clientName}</h4>
                    <p className="text-xs text-brand-muted">
                      {t.clientRole} {t.clientCompany && `• ${t.clientCompany}`}
                    </p>
                  </div>
                  {t.isVerified && (
                    <span className="inline-flex items-center space-x-1 text-[11px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-brand-lavender/40 border border-brand-lavender-border rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-brand-lavender border border-brand-lavender-border flex items-center justify-center text-brand-primary mx-auto">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy">Your feedback could be featured here.</h3>
            <p className="text-sm text-brand-body leading-relaxed max-w-md mx-auto">
              We never fabricate customer reviews or ratings. Get in touch to start your project with PrimeWeb Studio and experience genuine dedication to your digital growth.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TestimonialsPage;
