import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage = ({ onOpenQuote }) => {
  const [activeIdx, setActiveIdx] = useState(null);

  const faqCategories = [
    {
      category: 'Website Development & Technology',
      items: [
        {
          q: 'What technologies do you use at PrimeWeb Studio?',
          a: 'Our primary stack is modern JavaScript and TypeScript with React.js, Tailwind CSS, Vite/Next.js for frontends, and Node.js with Express and MongoDB for backend APIs and databases.',
        },
        {
          q: 'Do you create custom designs or use standard templates?',
          a: 'Every client project receives a custom UI/UX design tailored specifically to their brand, colors, typography, and target customer demographic.',
        },
        {
          q: 'Will my website work across all mobile phones and tablets?',
          a: 'Yes. We build responsive-first applications that scale and adapt effortlessly across smartphones, tablets, laptops, and large desktop screens.',
        },
      ],
    },
    {
      category: 'Pricing & Timelines',
      items: [
        {
          q: 'How does your project pricing work?',
          a: 'Our illustrative starter websites begin at ₹2,999 for portfolios, ₹5,999 for business websites, and ₹9,999 for e-commerce stores. Exact pricing is determined after reviewing your custom requirements.',
        },
        {
          q: 'How long does a website take to build?',
          a: 'A typical business website takes 1-3 weeks. Larger MERN full-stack platforms and e-commerce stores take 3-6 weeks, structured across clear milestone deliverables.',
        },
      ],
    },
    {
      category: 'Maintenance & Hosting',
      items: [
        {
          q: 'Do I own the website and source code?',
          a: 'Yes, absolutely. Once final delivery is completed, full ownership of the source code, design assets, and repository is transferred to you.',
        },
        {
          q: 'Where do you host web applications?',
          a: 'We assist clients with modern, reliable hosting providers including Vercel, Netlify, Render, AWS, and MongoDB Atlas for database clusters.',
        },
        {
          q: 'Can you maintain and update my website after launch?',
          a: 'Yes. We offer continuous maintenance packages starting from ₹1,999/month for uptime monitoring, security patches, dependency updates, and technical support.',
        },
      ],
    },
  ];

  return (
    <div className="pt-32 pb-24 space-y-20 bg-white min-h-screen">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HELP & ANSWERS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-brand-body leading-relaxed max-w-xl mx-auto">
          Find transparent answers about our development workflow, technologies, pricing, and ongoing support.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {faqCategories.map((cat, cIdx) => (
          <div key={cIdx} className="space-y-4">
            <h2 className="text-xl font-bold text-brand-navy border-b border-brand-lavender-border pb-3">
              {cat.category}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, iIdx) => {
                const key = `${cIdx}-${iIdx}`;
                const isOpen = activeIdx === key;
                return (
                  <div
                    key={key}
                    className="border border-brand-lavender-border rounded-2xl bg-white overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setActiveIdx(isOpen ? null : key)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-brand-navy text-sm sm:text-base hover:bg-brand-lavender/30 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand-primary shrink-0 transition-transform duration-200 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-brand-body leading-relaxed border-t border-brand-lavender-border/40">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-3xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-2xl font-bold text-brand-navy">Still have a question?</h3>
        <p className="text-sm text-brand-body">
          We are happy to answer any questions about your project scope, architecture, or timeline.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
          >
            <span>Ask Our Engineering Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
