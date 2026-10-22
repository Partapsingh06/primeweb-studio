import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, Search } from 'lucide-react';
import api from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (search) params.search = search;
        const res = await api.get('/blogs', { params });
        if (res.data?.data?.posts) {
          setPosts(res.data.data.posts);
        }
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="pt-32 pb-24 space-y-16 bg-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-lavender border border-brand-lavender-border text-brand-primary text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INSIGHTS & ARTICLES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight max-w-3xl mx-auto">
          Web Engineering & Design Insights.
        </h1>
        <p className="text-lg text-brand-body max-w-2xl mx-auto leading-relaxed">
          Actionable perspectives on modern frontend frameworks, full-stack architecture, web security, and high-performance design.
        </p>

        {/* Search */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles & guides..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 bg-brand-lavender/30 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id || post.slug}
                className="group bg-white rounded-3xl border border-brand-lavender-border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span className="px-3 py-1 rounded-full bg-brand-lavender text-brand-primary font-semibold">
                      {post.category || 'Engineering'}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime || '4 min read'}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-primary transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-brand-lavender-border/60 flex items-center justify-between text-xs">
                  <span className="text-brand-muted">
                    By {post.author || 'PrimeWeb Studio'}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-1 font-semibold text-brand-primary hover:text-brand-secondary group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-lavender/30 rounded-3xl border border-brand-lavender-border space-y-3">
            <BookOpen className="w-10 h-10 text-brand-muted mx-auto" />
            <h4 className="text-base font-bold text-brand-navy">No articles found</h4>
            <p className="text-xs text-brand-muted">Try clearing your search term to see all published posts.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
