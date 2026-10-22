import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Github,
  Instagram,
  Mail,
  MapPin,
  ArrowRight,
  Code2,
  CheckCircle2,
  Terminal,
  Cpu,
  Compass,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Globe,
} from 'lucide-react';
import api from '../services/api';

const CEOPage = ({ onOpenQuote }) => {
  const [profile, setProfile] = useState({
    name: 'Partap Singh',
    title: 'Founder & CEO | Full Stack MERN Developer',
    address: 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110',
    shortIntro: 'I am a Computer Science Engineering student and full-stack web developer passionate about building modern, responsive, and practical digital solutions for businesses and individuals.',
    biography: 'My focus is on creating user-friendly websites and full-stack applications using modern web technologies. I enjoy turning ideas into functional digital products through thoughtful design, structured development, and continuous learning.',
    technicalSkills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST API Development',
      'Responsive Web Design',
      'Git and GitHub',
    ],
    areasOfExpertise: [
      'Full-Stack MERN Architecture',
      'Responsive Frontend Engineering',
      'RESTful API Design & Integration',
      'Client-Focused Custom Web Applications',
    ],
    philosophy: "Great websites combine thoughtful design, useful functionality, performance, and a clear understanding of the user's needs.",
    vision: 'My vision is to help businesses establish a strong digital presence by creating accessible, reliable, and effective web experiences.',
    photoUrl: '',
    linkedinUrl: 'https://www.linkedin.com/in/partap-singh-0ab8003a9',
    githubUrl: 'https://github.com/Partapsingh06',
    instagramUrl: 'https://www.instagram.com/prime.webstudio?vrfl=NmhoMGh4NTZ5djY2',
    contactEmail: 'Partapxsingh05@gmail.com',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCEO = async () => {
      try {
        const res = await api.get('/ceo');
        if (res.data?.data?.profile) {
          setProfile(res.data.data.profile);
        }
      } catch (err) {
        console.error('Failed to load CEO profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCEO();
  }, []);

  return (
    <div className="pt-32 pb-24 space-y-16 bg-lavender-mesh min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* ==================================================== */}
        {/* HERO SECTION */}
        {/* ==================================================== */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-lavender-border shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* CEO Portrait Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden bg-brand-lavender border-4 border-brand-lavender-border shadow-card flex items-center justify-center">
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="w-24 h-24 rounded-full bg-gradient-purple text-white flex items-center justify-center text-4xl font-extrabold mx-auto shadow-md">
                        PS
                      </div>
                      <div className="pt-2">
                        <span className="text-xs text-brand-muted uppercase font-bold tracking-wider">
                          Executive Portrait
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full border border-brand-lavender-border shadow-soft text-xs font-semibold text-brand-primary whitespace-nowrap">
                  Founder & Full-Stack Lead
                </div>
              </div>

              {/* Quick Social & Contact Icons */}
              <div className="flex items-center space-x-3 mt-8">
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-brand-lavender text-brand-navy hover:text-brand-primary hover:bg-brand-lavender-border transition-all shadow-xs"
                    aria-label="LinkedIn"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-brand-lavender text-brand-navy hover:text-brand-primary hover:bg-brand-lavender-border transition-all shadow-xs"
                    aria-label="GitHub"
                    title="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-brand-lavender text-brand-navy hover:text-brand-primary hover:bg-brand-lavender-border transition-all shadow-xs"
                    aria-label="Instagram"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {profile.contactEmail && (
                  <a
                    href={`mailto:${profile.contactEmail}`}
                    className="p-2.5 rounded-xl bg-brand-lavender text-brand-navy hover:text-brand-primary hover:bg-brand-lavender-border transition-all shadow-xs"
                    aria-label="Email Partap Singh"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* CEO Narrative Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Leadership & Engineering
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-base font-semibold text-brand-secondary">{profile.title}</p>
              </div>

              {/* Location pill */}
              {profile.address && (
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender text-brand-navy text-xs font-medium border border-brand-lavender-border">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>{profile.address}</span>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-brand-lavender/60 border border-brand-lavender-border/80 text-brand-navy text-sm font-medium leading-relaxed italic">
                "{profile.shortIntro}"
              </div>

              <div className="space-y-3 text-sm text-brand-body leading-relaxed">
                <h3 className="font-bold text-base text-brand-navy">Professional Background</h3>
                <p>{profile.biography}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenQuote}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
                >
                  <span>Discuss Your Project with Partap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-brand-lavender-border bg-white text-brand-navy hover:bg-brand-lavender font-semibold text-sm transition-colors"
                >
                  View Agency Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* DEDICATED CONTACT & LOCATION INFORMATION SECTION */}
        {/* ==================================================== */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-lavender-border shadow-soft space-y-8">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-lavender text-brand-primary text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Communication</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
              CEO Contact Information & Office
            </h2>
            <p className="text-sm text-brand-body max-w-2xl">
              Get in direct touch with Partap Singh for project consultations, technical architecture planning, or business collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Direct Email Card */}
            <div className="p-6 rounded-2xl bg-brand-lavender/30 border border-brand-lavender-border hover:border-brand-primary/40 hover:bg-brand-lavender/50 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-lavender-border flex items-center justify-center text-brand-primary shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted block">
                    Direct Email
                  </span>
                  <h3 className="text-base font-bold text-brand-navy mt-1">Official Inbox</h3>
                </div>
                <p className="text-xs text-brand-body leading-relaxed">
                  Send inquiries, project specs, or consultation requests directly to Partap's verified email address.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${profile.contactEmail || 'Partapxsingh05@gmail.com'}`}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary break-all transition-colors group"
                >
                  <Mail className="w-4 h-4 shrink-0 text-brand-primary group-hover:scale-110 transition-transform" />
                  <span>{profile.contactEmail || 'Partapxsingh05@gmail.com'}</span>
                </a>
              </div>
            </div>

            {/* 2. Office & Location Card */}
            <div className="p-6 rounded-2xl bg-brand-lavender/30 border border-brand-lavender-border hover:border-brand-primary/40 hover:bg-brand-lavender/50 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-lavender-border flex items-center justify-center text-brand-primary shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted block">
                    Physical Location
                  </span>
                  <h3 className="text-base font-bold text-brand-navy mt-1">Office & Development Base</h3>
                </div>
                <p className="text-xs text-brand-body leading-relaxed">
                  Headquartered in Punjab, India, catering to clients locally and globally with modern web development.
                </p>
              </div>
              <div className="pt-2 flex items-start space-x-2 text-xs font-semibold text-brand-navy">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="leading-snug">{profile.address || 'Mullanpur Dhaka, Ludhiana, Punjab, India – 144110'}</span>
              </div>
            </div>

            {/* 3. Social Media & Developer Networks */}
            <div className="p-6 rounded-2xl bg-brand-lavender/30 border border-brand-lavender-border hover:border-brand-primary/40 hover:bg-brand-lavender/50 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-brand-lavender-border flex items-center justify-center text-brand-primary shadow-xs">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted block">
                    Professional Networks
                  </span>
                  <h3 className="text-base font-bold text-brand-navy mt-1">Verified Social Links</h3>
                </div>
                <p className="text-xs text-brand-body leading-relaxed">
                  Follow development updates, open-source repositories, and digital agency showcases.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-brand-lavender-border text-xs font-semibold text-brand-navy hover:text-brand-primary hover:border-brand-primary/40 transition-all"
                  >
                    <span className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4 text-sky-600" />
                      <span>LinkedIn Profile</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-muted" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-brand-lavender-border text-xs font-semibold text-brand-navy hover:text-brand-primary hover:border-brand-primary/40 transition-all"
                  >
                    <span className="flex items-center space-x-2">
                      <Github className="w-4 h-4 text-slate-800" />
                      <span>GitHub Repositories</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-muted" />
                  </a>
                )}
                {profile.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-brand-lavender-border text-xs font-semibold text-brand-navy hover:text-brand-primary hover:border-brand-primary/40 transition-all"
                  >
                    <span className="flex items-center space-x-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>Instagram Agency</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-muted" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TECHNICAL SKILLS & PHILOSOPHY GRID */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Toolkit */}
          <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy">Technical Competencies</h2>
            </div>

            <p className="text-sm text-brand-body leading-relaxed">
              Hands-on engineering using clean, scalable web technologies to construct performant client solutions.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.technicalSkills && profile.technicalSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-lavender text-brand-navy text-xs font-semibold border border-brand-lavender-border"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-lavender-border space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                Core Specializations
              </h4>
              <ul className="space-y-2 text-xs text-brand-body">
                {profile.areasOfExpertise && profile.areasOfExpertise.map((area, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Philosophy and Vision */}
          <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-brand-navy">Development Philosophy</h2>
                </div>
                <blockquote className="text-sm text-brand-body leading-relaxed border-l-2 border-brand-primary pl-4 py-1 italic bg-brand-lavender/30 rounded-r-xl">
                  "{profile.philosophy}"
                </blockquote>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-brand-navy">Leadership Vision</h2>
                </div>
                <p className="text-sm text-brand-body leading-relaxed">
                  {profile.vision}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-lavender-border flex items-center justify-between text-xs text-brand-muted">
              <span>PrimeWeb Studio Leadership</span>
              <span className="font-mono text-brand-primary">Partap Singh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOPage;
