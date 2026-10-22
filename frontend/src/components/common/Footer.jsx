import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  ArrowUpRight,
  UserCheck,
  ChevronRight,
  ArrowUp,
  Sparkles,
} from 'lucide-react';

const Footer = ({ settings }) => {
  const currentYear = 2026;

  // Contact Information with settings fallback
  const email = settings?.businessEmail || 'Partapxsingh05@gmail.com';
  const address = settings?.address || 'Mullanpur Dhaka, Ludhiana, Punjab, India';
  const linkedinUrl = settings?.linkedinUrl || 'https://www.linkedin.com/in/partap-singh-0ab8003a9';
  const githubUrl = settings?.githubUrl || 'https://github.com/Partapsingh06';
  const instagramUrl =
    settings?.instagramUrl ||
    'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2';
  const tagline = settings?.tagline || 'Your Vision. Our Creation.';

  // 1. Quick Links (Home, About, Services, Projects, Pricing, CEO Profile, Contact)
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'CEO Profile', path: '/ceo' },
    { name: 'Contact', path: '/contact' },
  ];

  // 2. Our Services (Business Websites, E-commerce Websites, Portfolio Websites, Full Stack MERN Development)
  const serviceLinks = [
    { name: 'Business Websites', path: '/services' },
    { name: 'E-commerce Websites', path: '/services' },
    { name: 'Portfolio Websites', path: '/services' },
    { name: 'Full Stack MERN Development', path: '/services' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-10 border-t border-brand-violet/20 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* ==================================================== */}
          {/* COLUMN 1: PRIMEWEB STUDIO (Agency Branding) */}
          {/* ==================================================== */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-purple flex items-center justify-center text-white font-extrabold text-2xl shadow-elevated group-hover:scale-105 transition-transform">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl text-white tracking-tight">
                  PrimeWeb<span className="text-brand-violet">Studio</span>
                </span>
                <span className="text-[11px] text-brand-violet font-semibold tracking-wider uppercase flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 inline text-brand-violet" />
                  <span>{tagline}</span>
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              {settings?.footerContent ||
                'PrimeWeb Studio is a modern digital agency specializing in professional website development, full-stack MERN applications, and bespoke web solutions.'}
            </p>

            {/* Founder Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Founded & Led by </span>
              <Link to="/ceo" className="font-bold text-white hover:text-brand-violet transition-colors">
                Partap Singh
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-2.5 pt-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-600 border border-white/10 hover:border-pink-500 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs group"
                aria-label="Instagram Profile"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-sky-600 border border-white/10 hover:border-sky-500 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs group"
                aria-label="LinkedIn Profile"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-slate-800 border border-white/10 hover:border-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs group"
                aria-label="GitHub Profile"
                title="View GitHub Repositories"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={`mailto:${email}`}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-primary border border-white/10 hover:border-brand-primary flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs group"
                aria-label="Send Email"
                title="Email Us Directly"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* ==================================================== */}
          {/* COLUMN 2: QUICK LINKS */}
          {/* ==================================================== */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-brand-violet transition-colors inline-flex items-center space-x-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-violet opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================================================== */}
          {/* COLUMN 3: OUR SERVICES */}
          {/* ==================================================== */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              <span>Our Services</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-brand-violet transition-colors inline-flex items-center space-x-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-violet opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================================================== */}
          {/* COLUMN 4: CONTACT US */}
          {/* ==================================================== */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet" />
              <span>Contact Us</span>
            </h3>

            <div className="space-y-3.5 text-sm text-slate-300">
              {/* Founder Contact */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-violet shrink-0 mt-0.5">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Founder & CEO
                  </span>
                  <Link to="/ceo" className="font-semibold text-white hover:text-brand-violet transition-colors">
                    Partap Singh
                  </Link>
                </div>
              </div>

              {/* Clickable Email */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-violet shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-medium text-white hover:text-brand-violet transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-violet shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Office Location
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed block">
                    {address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* BOTTOM COPYRIGHT & TAGLINE BAR */}
        {/* ==================================================== */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
            <p>© {currentYear} PrimeWeb Studio. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-600">•</span>
            <p className="text-brand-violet font-medium">{tagline}</p>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-primary border border-white/10 hover:border-brand-primary flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-xs"
              aria-label="Back to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
