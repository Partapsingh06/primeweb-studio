import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Heart, Target, Sparkles, Users } from 'lucide-react';

const About = ({ onOpenQuote }) => {
  return (
    <div className="pt-32 pb-24 space-y-24 bg-white min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT PRIMEWEB STUDIO</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          We Craft Purpose-Built Digital Experiences for Modern Businesses.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          PrimeWeb Studio was founded on a simple conviction: digital agency solutions should be modern, technically sound, honest, and directly tied to your real growth objectives.
        </p>
      </section>

      {/* Story & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Our Origin & Vision</span>
            <h2 className="text-3xl font-extrabold text-brand-navy">
              Turning Creative Ambition into Reliable Code.
            </h2>
            <p className="text-brand-body leading-relaxed text-sm sm:text-base">
              Founded by Partap Singh, a Computer Science Engineering student and full-stack web developer, PrimeWeb Studio bridges the gap between clean UI/UX aesthetics and scalable full-stack software architecture.
            </p>
            <p className="text-brand-body leading-relaxed text-sm sm:text-base">
              Rather than pushing generic templates or inflated promises, we focus on engineering accessible, performance-conscious websites that represent your brand with distinction.
            </p>

            <div className="pt-2">
              <Link
                to="/ceo"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary"
              >
                <span>Read more about our Founder & CEO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-brand-lavender/50 border border-brand-lavender-border space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-purple text-white flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">Our Mission</h3>
            </div>
            <p className="text-sm text-brand-body leading-relaxed">
              To empower startups, small businesses, and creators with dependable digital tools, fast-loading responsive websites, and clear development methodologies without unnecessary complexity or bloated costs.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-lavender-border/80">
              <div className="p-4 bg-white rounded-xl border border-brand-lavender-border">
                <div className="text-2xl font-extrabold text-brand-primary">100%</div>
                <div className="text-xs text-brand-muted mt-1">Responsive Focused</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-brand-lavender-border">
                <div className="text-2xl font-extrabold text-brand-primary">MERN</div>
                <div className="text-xs text-brand-muted mt-1">Full-Stack Stack</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-brand-lavender/40 border-y border-brand-lavender-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Foundational Pillars</span>
            <h2 className="text-3xl font-extrabold text-brand-navy">The Principles We Code By</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Integrity in Delivery</h3>
              <p className="text-sm text-brand-body leading-relaxed">
                We provide honest estimates, clear scopes, and realistic timelines. No fabricated metrics, no hidden caveats.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Performance Excellence</h3>
              <p className="text-sm text-brand-body leading-relaxed">
                Every line of CSS, component, and query is crafted with speed and accessibility in mind for peak Core Web Vitals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Collaborative Partnership</h3>
              <p className="text-sm text-brand-body leading-relaxed">
                We view our clients as long-term collaborators, providing transparent updates and support long after deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-brand-navy">Ready to Work with PrimeWeb Studio?</h2>
        <p className="text-brand-body max-w-xl mx-auto text-sm sm:text-base">
          Let's discuss how we can bring your next website or web application to life with speed, precision, and elegance.
        </p>
        <button
          onClick={onOpenQuote}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
        >
          <span>Start Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};

export default About;
