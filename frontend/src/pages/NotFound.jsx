import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-36 pb-24 min-h-[80vh] flex items-center justify-center bg-lavender-mesh px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-brand-lavender-border shadow-elevated text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-lavender text-brand-primary flex items-center justify-center text-4xl font-extrabold mx-auto border border-brand-lavender-border shadow-sm">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">Page Not Found</h1>
          <p className="text-sm text-brand-body leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl border border-brand-lavender-border bg-white text-brand-navy hover:bg-brand-lavender font-semibold text-sm transition-colors"
          >
            <span>Explore Work</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
