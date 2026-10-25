import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Sparkles,
  Layers,
  Globe,
  ShoppingCart,
  Briefcase,
  Palette,
  Wrench,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Smile,
  ChevronDown,
  Terminal,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Eye,
} from 'lucide-react';
import api, { getImageUrl } from '../services/api';

const Home = ({ onOpenQuote }) => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [ceo, setCeo] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servRes, projRes, priceRes, ceoRes, testRes] = await Promise.allSettled([
          api.get('/services'),
          api.get('/projects?limit=6'),
          api.get('/pricing'),
          api.get('/ceo'),
          api.get('/testimonials'),
        ]);

        if (servRes.status === 'fulfilled' && servRes.value.data?.data?.services) {
          setServices(servRes.value.data.data.services);
        }
        if (projRes.status === 'fulfilled' && projRes.value.data?.data?.projects) {
          setProjects(projRes.value.data.data.projects);
        }
        if (priceRes.status === 'fulfilled' && priceRes.value.data?.data?.packages) {
          setPricing(priceRes.value.data.data.packages);
        }
        if (ceoRes.status === 'fulfilled' && ceoRes.value.data?.data?.profile) {
          setCeo(ceoRes.value.data.data.profile);
        }
        if (testRes.status === 'fulfilled' && testRes.value.data?.data?.testimonials) {
          setTestimonials(testRes.value.data.data.testimonials);
        }
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-brand-primary" />;
      case 'Layers': return <Layers className="w-6 h-6 text-brand-primary" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6 text-brand-primary" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-brand-primary" />;
      case 'Palette': return <Palette className="w-6 h-6 text-brand-primary" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-brand-primary" />;
      default: return <Code2 className="w-6 h-6 text-brand-primary" />;
    }
  };

  const processSteps = [
    { number: '01', title: 'Discovery & Requirements', desc: 'Understanding your business goals, target audience, and feature roadmap.' },
    { number: '02', title: 'Planning & UI/UX Design', desc: 'Creating accessible layouts, wireframes, and modern visual designs.' },
    { number: '03', title: 'Development', desc: 'Writing clean, scalable code using React, Node.js, and modern best practices.' },
    { number: '04', title: 'Testing & QA', desc: 'Cross-browser testing, responsive checks, speed optimization, and security audits.' },
    { number: '05', title: 'Deployment', desc: 'Production deployment with SSL certificates, caching, and domain setup.' },
    { number: '06', title: 'Ongoing Support', desc: 'Continued technical guidance, enhancements, and performance monitoring.' },
  ];

  const faqs = [
    {
      q: 'What types of websites and applications do you build?',
      a: 'We specialize in modern corporate websites, full-stack MERN (MongoDB, Express, React, Node.js) web applications, e-commerce platforms, portfolio sites, and custom REST API integrations.',
    },
    {
      q: 'How much does a new website or web app cost?',
      a: 'Our illustrative starter websites begin at ₹2,999 for portfolios, ₹5,999 for business websites, and ₹9,999 for full e-commerce platforms. We provide customized, transparent quotes based on your exact feature specifications.',
    },
    {
      q: 'What is the typical turnaround timeline for a project?',
      a: 'A standard business website typically takes 1 to 3 weeks, while comprehensive full-stack MERN applications or e-commerce platforms generally require 3 to 6 weeks, depending on complexity.',
    },
    {
      q: 'Will my website be mobile-friendly and fast?',
      a: 'Yes, 100%. We employ a responsive-first engineering approach. Every application is optimized for mobile phones, tablets, and desktops, adhering strictly to Core Web Vitals and speed best practices.',
    },
    {
      q: 'Do you provide maintenance and technical support after launch?',
      a: 'Yes. We offer continuous support packages covering security patches, dependency updates, uptime monitoring, minor content revisions, and technical troubleshooting.',
    },
    {
      q: 'How do I start a project with PrimeWeb Studio?',
      a: 'Simply click "Start Your Project" or "Get a Free Quote" to submit your requirements. We will review your project goals and respond with a tailored proposal and timeline.',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* ==================================================== */}
      {/* SECTION A: HERO */}
      {/* ==================================================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-lavender-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Small Tag */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                <span>YOUR DIGITAL GROWTH PARTNER</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.12]">
                We Build Digital Experiences That{' '}
                <span className="text-gradient-purple">Drive Growth.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-brand-body max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From stunning business websites to powerful full-stack applications, we help brands turn their ideas into exceptional digital experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onOpenQuote}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-purple text-white font-semibold text-base shadow-soft hover:shadow-card hover:opacity-95 active:scale-[0.98] transition-all"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl border border-brand-lavender-border bg-white text-brand-navy hover:bg-brand-lavender font-semibold text-base transition-colors"
                >
                  <span>Explore Our Work</span>
                </Link>
              </div>

              {/* Trust Subtext */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-brand-muted">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Modern Tech Stack</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Responsive First</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clear Communication</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition (Modern Mockups & Cards) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Lavender Glow */}
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-violet/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-primary/15 rounded-full blur-3xl -z-10" />

                {/* Main Browser Window Mockup */}
                <div className="bg-white rounded-2xl shadow-elevated border border-brand-lavender-border overflow-hidden">
                  {/* Browser Bar */}
                  <div className="bg-brand-lavender/70 border-b border-brand-lavender-border px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="px-3 py-1 bg-white rounded-md text-[11px] font-mono text-brand-muted border border-brand-lavender-border/80 flex items-center space-x-1.5">
                      <span>primewebstudio.com</span>
                    </div>
                    <div className="w-4" />
                  </div>

                  {/* Browser Inner Preview */}
                  <div className="p-6 space-y-4 bg-gradient-to-br from-white to-brand-lavender/30">
                    <div className="flex items-center justify-between border-b border-brand-lavender-border/50 pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-md bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
                          P
                        </div>
                        <div className="h-3 w-20 bg-brand-navy/80 rounded" />
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-2 w-8 bg-brand-muted/40 rounded" />
                        <div className="h-2 w-8 bg-brand-muted/40 rounded" />
                        <div className="h-2 w-12 bg-brand-primary/80 rounded" />
                      </div>
                    </div>

                    <div className="space-y-2 py-2">
                      <div className="h-5 w-4/5 bg-brand-navy rounded" />
                      <div className="h-3 w-full bg-brand-muted/30 rounded" />
                      <div className="h-3 w-3/4 bg-brand-muted/30 rounded" />
                    </div>

                    {/* Interactive Mock Code Snippet */}
                    <div className="bg-brand-navy rounded-xl p-3.5 text-white font-mono text-xs space-y-1 shadow-inner">
                      <div className="flex items-center justify-between text-[10px] text-brand-violet border-b border-white/10 pb-1 mb-1">
                        <span className="flex items-center space-x-1">
                          <Terminal className="w-3 h-3" />
                          <span>App.jsx</span>
                        </span>
                        <span className="text-emerald-400">● 100% Core Vitals</span>
                      </div>
                      <p className="text-brand-violet">const <span className="text-amber-300">PrimeWebStudio</span> = () =&gt; &#123;</p>
                      <p className="pl-4 text-slate-300">vision: <span className="text-emerald-300">"Your Vision. Our Creation."</span>,</p>
                      <p className="pl-4 text-slate-300">stack: [<span className="text-sky-300">"React"</span>, <span className="text-sky-300">"Node.js"</span>, <span className="text-sky-300">"MongoDB"</span>],</p>
                      <p className="pl-4 text-slate-300">outcome: <span className="text-emerald-300">"Digital Growth"</span></p>
                      <p className="text-brand-violet">&#125;;</p>
                    </div>

                    {/* Mini Stats Bar */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 bg-white rounded-lg border border-brand-lavender-border">
                        <div className="text-xs font-bold text-brand-primary">Fast</div>
                        <div className="text-[10px] text-brand-muted">Turnaround</div>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-brand-lavender-border">
                        <div className="text-xs font-bold text-emerald-600">Clean</div>
                        <div className="text-[10px] text-brand-muted">Architecture</div>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-brand-lavender-border">
                        <div className="text-xs font-bold text-brand-secondary">Secure</div>
                        <div className="text-[10px] text-brand-muted">APIs</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Badges */}
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-brand-lavender-border shadow-card flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-brand-navy">Full-Stack MERN Ready</span>
                </div>

                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-lavender-border shadow-card flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-brand-navy">High-Speed Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION B: TRUST AND VALUE PROPOSITIONS */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-lavender flex items-center justify-center text-brand-primary mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Modern Design</h3>
            <p className="text-sm text-brand-body leading-relaxed">
              Curated typography, elegant color palettes, and intuitive user experiences crafted for today's audience.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-lavender flex items-center justify-center text-brand-primary mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Responsive Development</h3>
            <p className="text-sm text-brand-body leading-relaxed">
              Flawless functionality and smooth touch responsiveness across smartphones, tablets, and desktops.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-lavender flex items-center justify-center text-brand-primary mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Reliable Performance</h3>
            <p className="text-sm text-brand-body leading-relaxed">
              Clean code structures, optimized media, and secure backend architectures that load smoothly and dependably.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-lavender flex items-center justify-center text-brand-primary mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Client-Focused Solutions</h3>
            <p className="text-sm text-brand-body leading-relaxed">
              Honest requirements analysis, continuous communication, and tailored solutions aligned to your real goals.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION C: SERVICES */}
      {/* ==================================================== */}
      <section className="py-16 bg-brand-lavender/50 border-y border-brand-lavender-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Our Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
              Comprehensive Web Development Services
            </h2>
            <p className="text-brand-body text-base">
              From initial concept and architectural design to full-stack engineering and ongoing maintenance.
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(services.length > 0 ? services : [
              { title: 'Business Website Development', shortDescription: 'Tailored, responsive websites engineered to establish credibility and capture leads.', icon: 'Globe' },
              { title: 'Full-Stack MERN Development', shortDescription: 'Dynamic web applications built with MongoDB, Express.js, React.js, and Node.js.', icon: 'Layers' },
              { title: 'E-commerce Development', shortDescription: 'Feature-rich online stores built for smooth user checkouts and high conversion rates.', icon: 'ShoppingCart' },
              { title: 'Portfolio Website Development', shortDescription: 'Impactful personal and creator portfolios designed to highlight your work and personal brand.', icon: 'Briefcase' },
              { title: 'UI/UX Design', shortDescription: 'Intuitive user interfaces focused on usability, accessibility, and modern aesthetics.', icon: 'Palette' },
              { title: 'Website Maintenance', shortDescription: 'Continuous technical support, security patching, speed tuning, and content updates.', icon: 'Wrench' },
            ]).map((service, index) => (
              <div
                key={service.slug || index}
                className="group p-8 rounded-2xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-lavender group-hover:bg-brand-primary/10 flex items-center justify-center transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-body leading-relaxed">
                    {service.shortDescription}
                  </p>
                  {service.benefits && service.benefits.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-brand-lavender-border/50 text-xs text-brand-muted">
                      {service.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-brand-lavender-border/50 flex items-center justify-between">
                  <Link
                    to="/services"
                    className="inline-flex items-center space-x-1.5 text-sm font-semibold text-brand-primary group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs text-brand-muted hover:text-brand-navy transition-colors font-medium"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border border-brand-lavender-border text-brand-navy hover:bg-brand-lavender font-semibold text-sm transition-colors shadow-sm"
            >
              <span>View All Services & Deliverables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION D: FEATURED PROJECTS */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Selected Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
              Featured Work & Demonstrations
            </h2>
            <p className="text-brand-body text-base max-w-xl">
              A curated look at our technical craftsmanship across bespoke web designs and full-stack solutions.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(projects.length > 0 ? projects : [
            {
              title: 'Manmeet Creations — Handmade Art and Craft Website',
              slug: 'manmeet-creations',
              shortDescription: 'Elegantly curated web showcase for artisanal handmade crafts, resin art, and personalized creative gifts.',
              category: 'Web Development',
              technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Responsive UI'],
              clientName: 'Demonstration Showcase (Art & Craft)',
            },
            {
              title: 'Weather App — Weather Information Application',
              slug: 'weather-app',
              shortDescription: 'Real-time weather tracking application providing instant meteorological forecasts, search, and intuitive data visuals.',
              category: 'MERN Stack',
              technologies: ['JavaScript', 'React.js', 'OpenWeather API', 'CSS Modules'],
              clientName: 'Demonstration Project (Web Utility)',
            },
            {
              title: 'E-commerce Store — Online Shopping Experience',
              slug: 'ecommerce-store',
              shortDescription: 'Modern e-commerce platform featuring dynamic product catalogs, filtering, cart management, and checkout workflows.',
              category: 'E-commerce',
              technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
              clientName: 'Demonstration Project (Commerce)',
            },
            {
              title: 'Business Website — Corporate Web Presence',
              slug: 'business-website-showcase',
              shortDescription: 'Professional corporate web presence engineered with high-impact value propositions and lead capture.',
              category: 'Web Development',
              technologies: ['React.js', 'Tailwind CSS', 'REST API'],
              clientName: 'Demonstration Project (Corporate)',
            },
          ]).map((proj) => (
            <div
              key={proj.slug}
              className="group bg-white rounded-2xl border border-brand-lavender-border shadow-soft hover:shadow-card overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Header Preview Area */}
              <div className="h-48 bg-gradient-to-br from-brand-lavender to-brand-lavender-border/40 p-6 flex flex-col justify-between relative overflow-hidden">
                {proj.thumbnail && (
                  <img
                    src={getImageUrl(proj.thumbnail)}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div
                  className={`absolute inset-0 ${
                    proj.thumbnail
                      ? 'bg-gradient-to-t from-brand-navy/90 via-brand-navy/50 to-brand-navy/30'
                      : ''
                  }`}
                />

                <div className="flex items-center justify-between relative z-10">
                  <span
                    className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold shadow-sm ${
                      proj.thumbnail
                        ? 'bg-white/95 text-brand-primary'
                        : 'bg-white/90 text-brand-primary'
                    }`}
                  >
                    {proj.category}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-md ${
                      proj.thumbnail
                        ? 'bg-brand-navy/70 text-slate-200 backdrop-blur-xs'
                        : 'bg-white/70 text-brand-muted'
                    }`}
                  >
                    {proj.clientName}
                  </span>
                </div>

                {/* Subtle Decorative Pattern & Title */}
                <div className="relative z-10">
                  <h4
                    className={`text-xl font-bold leading-snug transition-colors ${
                      proj.thumbnail
                        ? 'text-white drop-shadow-sm'
                        : 'text-brand-navy group-hover:text-brand-primary'
                    }`}
                  >
                    {proj.title}
                  </h4>
                </div>

                {!proj.thumbnail && (
                  <div className="absolute right-0 bottom-0 opacity-10 text-brand-navy pointer-events-none">
                    <Code2 className="w-32 h-32 -mr-6 -mb-6" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-sm text-brand-body leading-relaxed">
                  {proj.shortDescription}
                </p>

                <div className="space-y-4">
                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies && proj.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-brand-lavender text-brand-navy rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-brand-lavender-border flex items-center justify-between">
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="inline-flex items-center space-x-1.5 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Case Study</span>
                    </Link>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-brand-muted hover:text-brand-navy transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION E: WHY CHOOSE US */}
      {/* ==================================================== */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-violet">Why PrimeWeb Studio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built on Quality, Integrity & Technical Rigor
            </h2>
            <p className="text-slate-300 text-base">
              We eliminate technical debt and guesswork by adhering to professional engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-violet flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Responsive-First Development</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We craft interfaces designed from the ground up to render flawlessly on every display size and touch device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-violet flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Clean & Maintainable Code</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Structured, modular codebase following industry patterns so future enhancements are seamless and predictable.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-violet flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Modern User Interfaces</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tailored visual design, consistent typography, and micro-animations that present your business professionally.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-violet flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Performance-Conscious</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Fast page loads and optimized asset bundling to enhance user retention and support search engine rankings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-violet flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Secure Implementation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Strict input sanitization, rate limiting, and password hashing practices to safeguard your data.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-violet flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Clear Communication</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Direct updates and transparent project management so you are always informed at every development phase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION F: WORKING PROCESS */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Our Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            How We Bring Your Vision to Life
          </h2>
          <p className="text-brand-body text-base">
            A structured six-step development journey designed for predictable delivery and quality.
          </p>
        </div>

        {/* Timeline Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft relative overflow-hidden group hover:border-brand-primary transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-extrabold text-brand-lavender-border group-hover:text-brand-primary/30 transition-colors font-mono">
                  {step.number}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">{step.title}</h3>
              <p className="text-sm text-brand-body leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/process"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <span>Learn More About Our Working Process</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION G: PRICING PACKAGES */}
      {/* ==================================================== */}
      <section className="py-16 bg-brand-lavender/50 border-y border-brand-lavender-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Transparent Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
              Tailored Investment Packages
            </h2>
            <p className="text-brand-body text-base">
              Illustrative starting prices for clear expectations. Every project receives a tailored scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(pricing.length > 0 ? pricing : [
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
                className={`rounded-2xl p-8 bg-white border transition-all duration-300 flex flex-col justify-between ${
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
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
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

          <div className="text-center pt-2">
            <button
              onClick={onOpenQuote}
              className="text-sm font-semibold text-brand-primary hover:text-brand-secondary inline-flex items-center space-x-1"
            >
              <span>Need a custom solution or enterprise portal? Request a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION H: HONEST TESTIMONIALS */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Client Feedback</span>
          <h2 className="text-3xl font-extrabold text-brand-navy">What Our Clients Say</h2>
          <p className="text-brand-body text-sm">
            We value genuine client relationships and verified feedback.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft space-y-4">
                <p className="text-sm text-brand-body italic leading-relaxed">"{t.content}"</p>
                <div className="pt-2 border-t border-brand-lavender-border flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-brand-navy">{t.clientName}</h5>
                    <p className="text-xs text-brand-muted">{t.clientRole} {t.clientCompany && `• ${t.clientCompany}`}</p>
                  </div>
                  <span className="text-amber-500 font-bold text-xs">★ {t.rating}/5</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Honest statement when no verified testimonials are yet published */
          <div className="bg-brand-lavender/60 border border-brand-lavender-border rounded-2xl p-8 text-center max-w-xl mx-auto space-y-3">
            <MessageSquare className="w-8 h-8 text-brand-primary mx-auto opacity-70" />
            <h4 className="text-base font-bold text-brand-navy">
              Your feedback could be featured here.
            </h4>
            <p className="text-sm text-brand-muted">
              We are currently onboarding projects. Get in touch with us today to start your project and become one of our featured partners!
            </p>
            <button
              onClick={onOpenQuote}
              className="mt-2 inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-primary hover:text-brand-secondary"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* ==================================================== */}
      {/* SECTION I: CEO PREVIEW */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-lavender to-white border border-brand-lavender-border rounded-3xl p-8 md:p-12 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* CEO Portrait Area */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-brand-primary/10 border-2 border-brand-lavender-border flex items-center justify-center shadow-card">
                  {ceo?.photoUrl ? (
                    <img
                      src={getImageUrl(ceo.photoUrl)}
                      alt={ceo.name || 'Partap Singh'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-purple text-white flex items-center justify-center text-2xl font-bold mb-2">
                        PS
                      </div>
                      <span className="text-xs text-brand-muted font-medium">Founder & CEO</span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-brand-navy text-white text-[11px] font-semibold rounded-lg shadow-sm">
                  Leadership
                </div>
              </div>
            </div>

            {/* CEO Info */}
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Agency Leadership</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                {ceo?.name || 'Partap Singh'}
              </h3>
              <p className="text-sm font-semibold text-brand-primary">
                {ceo?.title || 'Founder & CEO | Full Stack MERN Developer'}
              </p>
              <p className="text-sm sm:text-base text-brand-body leading-relaxed max-w-2xl">
                {ceo?.shortIntro ||
                  'I am a Computer Science Engineering student and full-stack web developer passionate about building modern, responsive, and practical digital solutions for businesses and individuals.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white border border-brand-lavender-border rounded-lg text-xs font-medium text-brand-navy"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/ceo"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
                >
                  <span>Meet Our CEO</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION J: FAQ ACCORDION */}
      {/* ==================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-brand-primary">Clear Answers</span>
          <h2 className="text-3xl font-extrabold text-brand-navy">Frequently Asked Questions</h2>
          <p className="text-brand-body text-sm">
            Everything you need to know about our web development process and packages.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-brand-lavender-border rounded-xl bg-white overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-brand-navy text-sm sm:text-base hover:bg-brand-lavender/30 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-primary transition-transform duration-200 shrink-0 ml-4 ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-5 pt-1 text-sm text-brand-body leading-relaxed border-t border-brand-lavender-border/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION K: FINAL CALL TO ACTION */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-purple rounded-3xl p-10 sm:p-14 text-white text-center shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Have an Idea? Let's Build Something Great.
            </h2>
            <p className="text-brand-lavender text-base leading-relaxed">
              Tell us about your project and discover how PrimeWeb Studio can help bring it to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-brand-navy font-bold text-sm shadow-soft hover:bg-brand-lavender hover:text-brand-primary transition-colors"
              >
                Get a Free Quote
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 font-bold text-sm transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
