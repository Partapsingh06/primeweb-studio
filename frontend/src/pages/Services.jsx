import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Layers,
  ShoppingCart,
  Briefcase,
  Palette,
  Wrench,
  Code2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';

const Services = ({ onOpenQuote }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data?.data?.services) {
          setServices(res.data.data.services);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-7 h-7 text-brand-primary" />;
      case 'Layers': return <Layers className="w-7 h-7 text-brand-primary" />;
      case 'ShoppingCart': return <ShoppingCart className="w-7 h-7 text-brand-primary" />;
      case 'Briefcase': return <Briefcase className="w-7 h-7 text-brand-primary" />;
      case 'Palette': return <Palette className="w-7 h-7 text-brand-primary" />;
      case 'Wrench': return <Wrench className="w-7 h-7 text-brand-primary" />;
      default: return <Code2 className="w-7 h-7 text-brand-primary" />;
    }
  };

  return (
    <div className="pt-32 pb-24 space-y-24 bg-white min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR SERVICES & SOLUTIONS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          High-Impact Digital Solutions Engineered to Convert.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          From tailored marketing websites to comprehensive full-stack MERN platforms, we build digital products focused on usability, reliability, and growth.
        </p>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(services.length > 0 ? services : [
            {
              title: 'Business Website Development',
              slug: 'business-website-development',
              shortDescription: 'Tailored, responsive websites engineered to establish credibility and capture leads.',
              fullDescription: 'We build high-converting corporate and business websites using modern technologies. Each site is custom-crafted to reflect your brand identity.',
              icon: 'Globe',
              startingPrice: '₹5,999',
              benefits: ['Mobile-first responsive architecture', 'Lightning-fast load performance', 'Search engine optimized foundation'],
              deliverables: ['Custom UI/UX layout', 'Contact & inquiry forms', 'On-page SEO optimization', 'Analytics integration'],
            },
            {
              title: 'Full-Stack MERN Development',
              slug: 'full-stack-mern-development',
              shortDescription: 'Robust, dynamic web applications developed with MongoDB, Express.js, React.js, and Node.js for scalability.',
              fullDescription: 'Harness the full power of the MERN stack for custom web portals, SaaS platforms, and client management tools.',
              icon: 'Layers',
              startingPrice: '₹12,999',
              benefits: ['Scalable component-based architecture', 'RESTful API integration', 'Secure JWT authentication'],
              deliverables: ['Frontend React SPA interface', 'Backend Express REST API', 'MongoDB database schemas', 'Admin & client roles'],
            },
            {
              title: 'E-commerce Development',
              slug: 'e-commerce-development',
              shortDescription: 'Feature-rich online stores built for high conversions, smooth user checkouts, and effortless product management.',
              fullDescription: 'From product catalogs and filter systems to secure checkout workflows and inventory management.',
              icon: 'ShoppingCart',
              startingPrice: '₹9,999',
              benefits: ['Seamless product browsing & filtering', 'Secure checkout workflow', 'Automated order and stock tracking'],
              deliverables: ['Product catalog system', 'Cart & checkout workflow', 'Customer account portal', 'Admin order dashboard'],
            },
            {
              title: 'Portfolio Website Development',
              slug: 'portfolio-website-development',
              shortDescription: 'Impactful personal and creator portfolio websites designed to highlight your work and personal brand.',
              fullDescription: 'Showcase your skills, creative works, and professional journey with a refined, fast portfolio website.',
              icon: 'Briefcase',
              startingPrice: '₹2,999',
              benefits: ['Distinctive visual identity', 'Interactive case studies & galleries', 'Fast loading with minimal bloat'],
              deliverables: ['Hero intro & about section', 'Dynamic project showcase', 'Skills matrix & timeline', 'Contact CTA with direct links'],
            },
            {
              title: 'UI/UX Design',
              slug: 'ui-ux-design',
              shortDescription: 'Intuitive user interface and user experience design focused on clarity, accessibility, and modern aesthetics.',
              fullDescription: 'We craft clear design systems, wireframes, and high-fidelity interactive prototypes that guide users effortlessly.',
              icon: 'Palette',
              startingPrice: '₹4,999',
              benefits: ['Curated modern color palettes and typography', 'User-centric usability flows', 'Accessible component hierarchies'],
              deliverables: ['Wireframes & user journeys', 'High-fidelity mockups', 'Interactive design prototypes', 'Reusable component libraries'],
            },
            {
              title: 'Website Maintenance',
              slug: 'website-maintenance',
              shortDescription: 'Continuous technical support, security patches, performance optimization, and content updates.',
              fullDescription: 'Keep your web application running smoothly with proactive maintenance, scheduled dependency updates, and speed tuning.',
              icon: 'Wrench',
              startingPrice: '₹1,999/mo',
              benefits: ['Proactive security patching', 'Periodic performance audits', 'Database backup oversight'],
              deliverables: ['Uptime monitoring setup', 'Dependency updates', 'Security audit review', 'Bug fixes & revisions'],
            },
          ]).map((service) => (
            <div
              key={service.slug}
              className="p-8 rounded-2xl bg-white border border-brand-lavender-border shadow-soft hover:shadow-card hover:border-brand-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-lavender flex items-center justify-center">
                  {getServiceIcon(service.icon)}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-navy">{service.title}</h3>
                  {service.startingPrice && (
                    <span className="text-xs font-semibold text-brand-primary mt-1 inline-block">
                      From {service.startingPrice}
                    </span>
                  )}
                </div>

                <p className="text-sm text-brand-body leading-relaxed">
                  {service.shortDescription}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-4 border-t border-brand-lavender-border/60 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-brand-body">
                      {service.deliverables.slice(0, 4).map((d, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-brand-lavender-border/60 flex items-center justify-between">
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/pricing"
                  className="text-xs text-brand-muted hover:text-brand-navy transition-colors"
                >
                  View Packages
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-brand-navy">Looking for a Customized Solution?</h2>
        <p className="text-brand-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Every project is unique. Let us evaluate your requirements and assemble a dedicated development roadmap.
        </p>
        <button
          onClick={onOpenQuote}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
        >
          <span>Get a Free Project Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};

export default Services;
