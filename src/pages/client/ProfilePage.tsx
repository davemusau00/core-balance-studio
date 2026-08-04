import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  User, Phone, Mail, CreditCard, Bell, Gift, LogOut,
  ChevronRight, Copy, CheckCircle, Shield, Pause, Trash2, Camera, X
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, signOut, updateProfile } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [referralCopied, setReferralCopied] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, whatsapp: true, sms: false });

  const referralCode = `CORE-${(user?.name?.split(' ')[0] || 'FRIEND').toUpperCase()}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handlePauseMembership = async () => {
    setShowPauseModal(false);
    // Simulate updating backend
    if (updateProfile) {
      await updateProfile({ membershipStatus: 'PAUSED' });
    }
    showToast('Membership Paused', 'Your membership has been paused. You will not be billed.', 'success');
  };

  const membershipStatusColor = {
    ACTIVE: 'bg-emerald-100 text-emerald-800',
    EXPIRED: 'bg-rose-100 text-rose-700',
    PAUSED: 'bg-amber-100 text-amber-800',
  }[user?.membershipStatus || 'ACTIVE'];

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#f4f0fb] via-white to-[#fbf9fd] border border-[#e5e2eb] rounded-3xl p-6 text-center relative">
        <div className="relative inline-block mb-3">
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
          />
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#6b4cc6] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#5b3894] transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">{user?.name}</h1>
        <p className="text-xs text-[#6b7280] mt-0.5">{user?.email}</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${membershipStatusColor}`}>
            {user?.membershipStatus}
          </span>
          <span className="text-xs text-[#6b7280] font-medium">{user?.membershipName}</span>
        </div>
      </div>

      {/* Membership Card */}
      <div className="bg-[#1c1c2b] rounded-3xl p-6 text-white space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Membership</span>
          <CreditCard className="w-5 h-5 text-white/40" />
        </div>
        <div>
          <p className="font-serif text-2xl font-bold">{user?.membershipName}</p>
          <p className="text-xs text-white/60 mt-0.5">Renews {user?.membershipRenewalDate}</p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-[#b894e6]">{user?.classesRemaining}</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">Classes Left</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-[#b894e6]">{user?.currentStreakWeeks}w</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">Streak</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-[#b894e6]">{user?.classesThisMonth}</p>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">This Month</p>
          </div>
        </div>
      </div>

      {/* Edit Profile */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e2eb]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#6b4cc6]" />
            <span className="font-semibold text-sm text-[#1c1c2b]">Personal Details</span>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-semibold text-[#6b4cc6] hover:underline"
          >
            {isEditing ? 'Save Changes' : 'Edit'}
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#6b7280]">Full Name</label>
            {isEditing ? (
              <input value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#fbf9fd] rounded-xl border border-[#e5e2eb] text-sm text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]" />
            ) : (
              <p className="text-sm font-medium text-[#1c1c2b]">{name || user?.name}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#6b7280]">Phone Number</label>
            {isEditing ? (
              <input value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#fbf9fd] rounded-xl border border-[#e5e2eb] text-sm text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]" />
            ) : (
              <p className="text-sm font-medium text-[#1c1c2b]">{phone || user?.phone}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#6b7280]">Email Address</label>
            <p className="text-sm font-medium text-[#6b7280]">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#e5e2eb]">
          <Bell className="w-4 h-4 text-[#6b4cc6]" />
          <span className="font-semibold text-sm text-[#1c1c2b]">Notifications</span>
        </div>
        <div className="divide-y divide-[#e5e2eb]">
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-[#1c1c2b] capitalize">{key === 'whatsapp' ? 'WhatsApp' : key.charAt(0).toUpperCase() + key.slice(1)} Notifications</span>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${val ? 'bg-[#6b4cc6]' : 'bg-neutral-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Referral */}
      <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#6b4cc6]" />
          <span className="font-semibold text-sm text-[#1c1c2b]">Refer a Friend</span>
        </div>
        <p className="text-xs text-[#6b7280]">
          Share your code and earn 1 free class for every friend who books their first session.
        </p>
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#d3c2f0] p-3">
          <span className="font-mono font-bold text-[#4e2f80] text-sm flex-1">{referralCode}</span>
          <button
            onClick={handleCopyReferral}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#6b4cc6] hover:text-[#4e2f80] transition-colors"
          >
            {referralCopied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {referralCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden">
        {[
          { icon: <Shield className="w-4 h-4 text-[#6b4cc6]" />, label: 'Privacy & Security', action: () => {} },
          { icon: <Pause className="w-4 h-4 text-amber-600" />, label: 'Pause Membership', action: () => setShowPauseModal(true) },
        ].map(({ icon, label, action }) => (
          <button key={label} onClick={action} className="flex items-center justify-between w-full px-6 py-4 border-b border-[#e5e2eb] last:border-0 hover:bg-[#fbf9fd] transition-colors">
            <div className="flex items-center gap-3">
              {icon}
              <span className="text-sm font-medium text-[#1c1c2b]">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[#e5e2eb] text-[#1c1c2b] rounded-2xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold hover:bg-rose-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      {/* Pause Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
              <Pause className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">Pause Membership?</h3>
            <p className="text-sm text-[#6b7280]">
              Pausing your membership will freeze your remaining classes and billing cycle for up to 30 days. You can resume at any time.
            </p>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setShowPauseModal(false)}
                className="flex-1 py-3 bg-neutral-100 text-[#1c1c2b] font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Keep Active
              </button>
              <button 
                onClick={handlePauseMembership}
                className="flex-1 py-3 bg-amber-500 text-white font-semibold text-xs rounded-xl hover:bg-amber-600 transition-colors"
              >
                Confirm Pause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
