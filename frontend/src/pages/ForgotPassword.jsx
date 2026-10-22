import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [devToken, setDevToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setDevToken(null);

    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'If that email exists in our records, instructions have been sent.');
      if (res.data.devResetToken) {
        setDevToken(res.data.devResetToken);
      }
    } catch (err) {
      setError(err.message || 'Failed to process request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-36 pb-24 min-h-[85vh] flex items-center justify-center bg-lavender-mesh px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-brand-lavender-border shadow-elevated space-y-6">
        <div>
          <Link
            to="/login"
            className="inline-flex items-center space-x-1.5 text-xs text-brand-muted hover:text-brand-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-brand-navy">Reset Password</h1>
          <p className="text-xs text-brand-muted leading-relaxed">
            Enter your account email address and we will provide a secure password reset link.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-brand-error text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-4 bg-brand-lavender border border-brand-lavender-border rounded-xl text-brand-navy text-xs space-y-2">
            <div className="flex items-center space-x-2 font-semibold text-brand-primary">
              <CheckCircle2 className="w-4 h-4" />
              <span>Request Processed</span>
            </div>
            <p>{message}</p>
            {devToken && (
              <div className="pt-2 border-t border-brand-lavender-border">
                <p className="text-[11px] font-mono text-brand-secondary break-all">
                  Development Mode Direct Reset Link:
                  <br />
                  <Link to={`/reset-password/${devToken}`} className="underline font-bold text-brand-primary">
                    /reset-password/{devToken}
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">
                Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-purple text-white font-semibold text-sm shadow-soft hover:opacity-95 disabled:opacity-60 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Generating Reset Token...</span>
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
