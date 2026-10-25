import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Code2, Sparkles, Eye, ArrowRight } from 'lucide-react';
import api, { getImageUrl } from '../services/api';

const Projects = ({ onOpenQuote }) => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Web Development', 'MERN Stack', 'E-commerce', 'Portfolio', 'UI/UX Design'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = {};
        if (category !== 'All') params.category = category;
        if (search) params.search = search;

        const res = await api.get('/projects', { params });
        if (res.data?.data?.projects) {
          setProjects(res.data.data.projects);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category, search]);

  return (
    <div className="pt-32 pb-24 space-y-16 bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PROJECT PORTFOLIO</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          Our Technical Work & Demonstrations.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          Explore modern digital applications, e-commerce prototypes, and tailored corporate websites developed by PrimeWeb Studio.
        </p>

        {/* Filter and Search Bar */}
        <div className="pt-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-gradient-purple text-white shadow-soft'
                    : 'bg-brand-lavender/60 text-brand-body hover:bg-brand-lavender-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-brand-lavender/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div
                key={proj._id || proj.slug}
                className="group bg-white rounded-2xl border border-brand-lavender-border shadow-soft hover:shadow-card overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
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
                      {proj.clientName || 'Demonstration'}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold leading-snug transition-colors relative z-10 ${
                      proj.thumbnail
                        ? 'text-white drop-shadow-sm'
                        : 'text-brand-navy group-hover:text-brand-primary'
                    }`}
                  >
                    {proj.title}
                  </h3>

                  {!proj.thumbnail && (
                    <div className="absolute right-0 bottom-0 opacity-10 text-brand-navy pointer-events-none">
                      <Code2 className="w-28 h-28 -mr-4 -mb-4" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
                    {proj.shortDescription || proj.description.slice(0, 140) + '...'}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies && proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-brand-lavender text-brand-navy rounded-md text-[11px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-brand-lavender-border flex items-center justify-between">
                      <Link
                        to={`/projects/${proj.slug}`}
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Case Study Details</span>
                      </Link>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs text-brand-muted hover:text-brand-navy"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-lavender/30 rounded-2xl border border-brand-lavender-border space-y-3">
            <Code2 className="w-10 h-10 text-brand-muted mx-auto" />
            <h4 className="text-base font-bold text-brand-navy">No matching projects found</h4>
            <p className="text-xs text-brand-muted">Try selecting another category or clearing your search term.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-brand-navy">Ready to Build Your Project?</h2>
        <p className="text-brand-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Tell us about your brand vision and we will design a dedicated web application for you.
        </p>
        <button
          onClick={onOpenQuote}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95"
        >
          <span>Request Free Project Proposal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};

export default Projects;
