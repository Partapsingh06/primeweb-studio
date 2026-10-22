import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Code2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';

const ProjectDetails = ({ onOpenQuote }) => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/projects/${slug}`);
        if (res.data?.data?.project) {
          setProject(res.data.data.project);
          setRelated(res.data.data.related || []);
        }
      } catch (err) {
        setError(err.message || 'Project not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center max-w-4xl mx-auto px-4">
        <div className="h-8 w-48 bg-brand-lavender mx-auto rounded animate-pulse mb-6" />
        <div className="h-64 bg-brand-lavender/40 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-24 text-center max-w-2xl mx-auto px-4 space-y-4">
        <h2 className="text-2xl font-bold text-brand-navy">Project Not Found</h2>
        <p className="text-sm text-brand-body">{error || 'The requested project could not be loaded.'}</p>
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 space-y-16 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation */}
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-muted hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-lavender text-brand-primary font-semibold text-xs border border-brand-lavender-border">
              {project.category}
            </span>
            <span className="text-xs text-brand-muted bg-slate-100 px-3 py-1 rounded-full">
              {project.clientName || 'Demonstration Showcase'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-body leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Featured Visual Preview Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-lavender to-brand-lavender-border/50 border border-brand-lavender-border p-8 sm:p-12 shadow-elevated relative overflow-hidden flex flex-col justify-between min-h-[260px]">
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div
            className={`absolute inset-0 ${
              project.thumbnail
                ? 'bg-gradient-to-t from-brand-navy/95 via-brand-navy/70 to-brand-navy/40'
                : ''
            }`}
          />

          <div className="relative z-10 space-y-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                project.thumbnail ? 'text-brand-lavender' : 'text-brand-primary'
              }`}
            >
              Case Study Overview
            </span>
            <h3
              className={`text-2xl font-bold ${
                project.thumbnail ? 'text-white' : 'text-brand-navy'
              }`}
            >
              Project Architecture & Visual Showcase
            </h3>
          </div>

          {/* Action buttons if URLs provided */}
          <div className="relative z-10 pt-6 flex flex-wrap gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="px-4 py-2 bg-white/80 rounded-xl text-xs text-brand-muted border border-brand-lavender-border font-medium">
                Demonstration Portfolio Entry (Live URL provided upon request)
              </div>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-white text-brand-navy border border-brand-lavender-border font-semibold text-sm hover:bg-brand-lavender transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 text-brand-navy pointer-events-none">
            <Code2 className="w-64 h-64 -mr-10 -mb-10" />
          </div>
        </div>

        {/* Main Details & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-brand-navy">Project Overview & Implementation</h2>
            <div className="prose prose-purple text-brand-body text-sm sm:text-base leading-relaxed space-y-4">
              <p>{project.description}</p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-lavender/40 border border-brand-lavender-border space-y-3">
              <h4 className="font-bold text-sm text-brand-navy">Engineering Highlights</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-brand-body">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Responsive UI tested across smartphones, tablets, and desktops.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Component-based modular architecture for clean maintainability.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Optimized Core Web Vitals and SEO-friendly structure.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Tech Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-brand-lavender-border shadow-soft space-y-5">
              <h3 className="font-bold text-base text-brand-navy">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies && project.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-brand-lavender text-brand-navy text-xs font-semibold border border-brand-lavender-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-brand-lavender-border space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-muted">Category</span>
                  <span className="font-semibold text-brand-navy">{project.category}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-muted">Showcase Type</span>
                  <span className="font-semibold text-brand-navy">{project.clientName}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 rounded-xl bg-gradient-purple text-white font-semibold text-xs shadow-soft hover:opacity-95"
                >
                  Request Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-brand-lavender-border space-y-6">
            <h3 className="text-xl font-bold text-brand-navy">More in {project.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/projects/${r.slug}`}
                  className="p-5 rounded-2xl bg-brand-lavender/30 border border-brand-lavender-border hover:border-brand-primary/40 hover:bg-white transition-all space-y-2 block group"
                >
                  <span className="text-[11px] font-semibold text-brand-primary">{r.category}</span>
                  <h4 className="font-bold text-sm text-brand-navy group-hover:text-brand-primary transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-xs text-brand-muted line-clamp-2">{r.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
