import React, { useState } from 'react';
import { User, Phone, Building, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const ClientProfile = () => {
  const { user, updateProfile } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    company: user?.company || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    setProfileMsg('');
    setProfileErr('');

    try {
      await updateProfile(profileData);
      setProfileMsg('Profile information updated successfully.');
    } catch (err) {
      setProfileErr(err.message || 'Failed to update profile.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword.length < 8) {
      setPassErr('New password must be at least 8 characters long.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPassErr('New passwords do not match.');
      return;
    }

    setLoadingPass(true);
    setPassMsg('');
    setPassErr('');

    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPassMsg('Password changed successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPassErr(err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-navy">Account Settings</h1>
        <p className="text-xs text-brand-muted">
          Manage your personal details and account security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information Form */}
        <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-5">
          <div className="flex items-center space-x-3 border-b border-brand-lavender-border pb-4">
            <div className="w-9 h-9 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-brand-navy">Personal Details</h3>
              <p className="text-[11px] text-brand-muted">Update your contact profile</p>
            </div>
          </div>

          {profileMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{profileMsg}</span>
            </div>
          )}

          {profileErr && (
            <div className="p-3 bg-red-50 border border-red-200 text-brand-error text-xs rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{profileErr}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">Account Email</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-brand-muted mt-1 block">Email address cannot be changed directly.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                placeholder="+91..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">Company / Brand</label>
              <input
                type="text"
                value={profileData.company}
                onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                placeholder="Company Name"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loadingProfile}
                className="w-full py-2.5 rounded-xl bg-gradient-purple text-white text-xs font-semibold shadow-soft hover:opacity-95 disabled:opacity-60"
              >
                {loadingProfile ? 'Saving Changes...' : 'Save Profile Details'}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-3xl p-8 border border-brand-lavender-border shadow-soft space-y-5">
          <div className="flex items-center space-x-3 border-b border-brand-lavender-border pb-4">
            <div className="w-9 h-9 rounded-xl bg-brand-lavender text-brand-primary flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-brand-navy">Change Password</h3>
              <p className="text-[11px] text-brand-muted">Update your security credentials</p>
            </div>
          </div>

          {passMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{passMsg}</span>
            </div>
          )}

          {passErr && (
            <div className="p-3 bg-red-50 border border-red-200 text-brand-error text-xs rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passErr}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">New Password (Min 8 Chars)</label>
              <input
                type="password"
                required
                minLength={8}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-navy mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-brand-lavender-border focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loadingPass}
                className="w-full py-2.5 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-60 transition-colors"
              >
                {loadingPass ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
