import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  Headphones,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const ProcessPage = ({ onOpenQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Requirements Analysis',
      icon: <Compass className="w-6 h-6 text-brand-primary" />,
      desc: 'We start by understanding your brand vision, core target audience, competitor landscape, and exact technical functional requirements.',
      deliverables: ['Project Specification Document', 'Architecture Recommendations', 'Timeline & Milestone Roadmap'],
    },
    {
      num: '02',
      title: 'Planning & UI/UX Design',
      icon: <Palette className="w-6 h-6 text-brand-primary" />,
      desc: 'Our design phase creates intuitive user flows, accessible contrast schemes, interactive mockups, and mobile-first layouts.',
      deliverables: ['Information Architecture', 'Interactive Wireframes & Mockups', 'Component Design System'],
    },
    {
      num: '03',
      title: 'Development & Engineering',
      icon: <Code2 className="w-6 h-6 text-brand-primary" />,
      desc: 'We transform approved designs into high-performance web applications using React, Node.js, Express, MongoDB, and Tailwind CSS.',
      deliverables: ['Clean, Documented Codebase', 'RESTful API Services', 'State Management & Responsive Layouts'],
    },
    {
      num: '04',
      title: 'Testing & Quality Assurance',
      icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" />,
      desc: 'Every application undergoes cross-browser verification, mobile responsiveness checks, performance audits, and security validation.',
      deliverables: ['Cross-Device Compatibility Testing', 'Core Web Vitals Optimization', 'Security Sanitization Checks'],
    },
    {
      num: '05',
      title: 'Deployment & Production Launch',
      icon: <Rocket className="w-6 h-6 text-brand-primary" />,
      desc: 'We handle production hosting configuration, custom domain mapping, SSL certificate setup, and search engine submission.',
      deliverables: ['Production Deployment', 'SSL Security Activation', 'Sitemap & Google Search Console Setup'],
    },
    {
      num: '06',
      title: 'Ongoing Support & Optimization',
      icon: <Headphones className="w-6 h-6 text-brand-primary" />,
      desc: 'Post-launch, we provide dependable maintenance packages covering dependency updates, uptime monitoring, and enhancements.',
      deliverables: ['Scheduled Technical Reviews', 'Proactive Security Patching', 'Priority Developer Assistance'],
    },
  ];

  return (
    <div className="pt-32 pb-24 space-y-20 bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STRUCTURED DEVELOPMENT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          Our Proven 6-Step Development Process.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          From first meeting to production deployment, our workflow provides clarity, quality, and complete transparency at every milestone.
        </p>
      </section>

      {/* Process Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-8 rounded-3xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card hover:border-brand-primary/40 transition-all flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-lavender border border-brand-lavender-border flex items-center justify-center shrink-0">
              {step.icon}
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-primary tracking-wider uppercase">
                  Phase {step.num}
                </span>
                <span className="text-2xl font-extrabold text-brand-lavender-border font-mono">
                  {step.num}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-brand-navy">{step.title}</h3>
              <p className="text-sm text-brand-body leading-relaxed">{step.desc}</p>

              <div className="pt-3 border-t border-brand-lavender-border/60">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-2">
                  Key Deliverables:
                </span>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((del, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-brand-lavender text-brand-navy rounded-lg text-xs font-medium"
                    >
                      ✓ {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-brand-navy">Ready to Kick Off Phase 01?</h2>
        <p className="text-brand-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Book an initial discovery consultation to outline your requirements and establish a tailored development scope.
        </p>
        <button
          onClick={onOpenQuote}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
        >
          <span>Schedule Discovery Session</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};

export default ProcessPage;
