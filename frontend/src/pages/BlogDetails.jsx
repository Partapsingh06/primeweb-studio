import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag, Share2, Sparkles } from 'lucide-react';
import api from '../services/api';

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/blogs/${slug}`);
        if (res.data?.data?.post) {
          setPost(res.data.data.post);
          setRelated(res.data.data.related || []);
        }
      } catch (err) {
        setError(err.message || 'Article could not be found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center max-w-3xl mx-auto px-4">
        <div className="h-8 w-48 bg-brand-lavender mx-auto rounded animate-pulse mb-6" />
        <div className="h-64 bg-brand-lavender/40 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-40 pb-24 text-center max-w-xl mx-auto px-4 space-y-4">
        <h2 className="text-2xl font-bold text-brand-navy">Article Not Found</h2>
        <p className="text-sm text-brand-body">{error || 'The requested article could not be loaded.'}</p>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 space-y-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-muted hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights & Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs text-brand-muted">
            <span className="px-3 py-1 rounded-full bg-brand-lavender text-brand-primary font-semibold">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-body leading-relaxed italic border-l-2 border-brand-primary pl-4 py-1 bg-brand-lavender/30 rounded-r-xl">
            {post.excerpt}
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-purple max-w-none text-brand-body text-sm sm:text-base leading-relaxed space-y-6 pt-4 border-t border-brand-lavender-border">
          <div className="whitespace-pre-line font-sans text-brand-body leading-relaxed space-y-4">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-brand-lavender-border flex items-center space-x-2">
            <Tag className="w-4 h-4 text-brand-muted" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-brand-lavender text-brand-navy text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-brand-lavender-border space-y-6">
            <h3 className="text-xl font-bold text-brand-navy">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="p-5 rounded-2xl bg-brand-lavender/30 border border-brand-lavender-border hover:bg-white hover:border-brand-primary/40 transition-all space-y-2 block"
                >
                  <span className="text-[11px] font-semibold text-brand-primary">{r.category}</span>
                  <h4 className="font-bold text-sm text-brand-navy line-clamp-2">{r.title}</h4>
                  <p className="text-xs text-brand-muted line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
