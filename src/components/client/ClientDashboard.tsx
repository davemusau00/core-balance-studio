import React, { useState } from 'react';
import { 
  Calendar, 
  Flame, 
  RotateCcw, 
  XCircle, 
  ShoppingBag, 
  Gift, 
  Users, 
  Clock, 
  MapPin, 
  Bell, 
  ChevronRight, 
  CheckCircle2, 
  Quote, 
  ArrowRight,
  Sparkles,
  CreditCard,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAVED_PROGRAMS, MOCK_PACKAGES } from '../../data/mockData';

export const ClientDashboard: React.FC = () => {
  const { 
    clientProfile, 
    bookings, 
    activities, 
    handleCancelBooking, 
    setActiveTab,
    showToast
  } = useApp();

  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [showBuyPackageModal, setShowBuyPackageModal] = useState<boolean>(false);

  const upcoming = clientProfile.upcomingBooking;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in">
      
      {/* Welcome Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#f4f0fb] via-white to-[#fbf9fd] border border-[#e5e2eb] rounded-3xl p-6 sm:p-8">
        
        {/* Hero Background Pilates Pose Image Accent */}
        <div className="absolute top-0 right-0 h-full w-1/3 hidden sm:block opacity-20 pointer-events-none overflow-hidden rounded-r-3xl z-0">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600"
            alt="Pilates reformer pose"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-lg space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b] text-balance pr-4">
              Welcome back, {clientProfile.name} <span className="inline-block animate-bounce-subtle">👋</span>
            </h1>
            <button 
              onClick={() => showToast('Notifications', 'You have no new unread notifications.', 'info')}
              className="w-10 h-10 flex-shrink-0 rounded-full bg-white border border-[#e5e2eb] flex items-center justify-center text-[#6b4cc6] hover:bg-[#f4f0fb] shadow-sm relative z-30"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#6b4cc6]" />
            </button>
          </div>
          
          <p className="text-xs sm:text-sm text-[#6b7280] text-balance">
            Let’s keep your movement journey strong. You’re currently on a 6-week streak!
          </p>
        </div>
      </div>

      {/* Upcoming Booking Card */}
      {upcoming ? (
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#6b4cc6] uppercase tracking-wider">
              Upcoming Booking
            </span>
            <button
              onClick={() => setActiveTab('book')}
              className="text-xs font-semibold text-[#6b4cc6] hover:underline flex items-center gap-1"
            >
              View all schedule <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#fbf9fd] border border-[#e5e2eb] p-4 rounded-2xl">
            <div className="flex items-center gap-4 min-w-0">
              {/* Date Box Tile */}
              <div className="bg-[#f4f0fb] border border-[#d3c2f0] p-3 rounded-2xl text-center min-w-[70px] flex-shrink-0">
                <span className="text-[10px] font-bold uppercase text-[#6b4cc6] block tracking-wider">
                  FRI
                </span>
                <span className="font-serif text-2xl font-bold text-[#4e2f80] block leading-tight">
                  23
                </span>
                <span className="text-[10px] font-semibold text-[#6b4cc6] uppercase block">
                  MAY
                </span>
              </div>

              {/* Booking Info */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-base text-[#1c1c2b] truncate">{upcoming.classTitle}</h3>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#e9e0f6] text-[#6b4cc6] flex-shrink-0">
                    CLASSIC
                  </span>
                </div>

                <div className="text-xs text-[#6b7280] space-y-1 mt-1">
                  <p className="flex items-center gap-2 truncate">
                    <Clock className="w-3.5 h-3.5 text-[#9ca3af] flex-shrink-0" />
                    <span className="truncate">{upcoming.time} · {upcoming.durationMinutes} min · Coach {upcoming.instructorName}</span>
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#9ca3af] flex-shrink-0" />
                    <span className="truncate">{upcoming.location}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowManageModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#d3c2f0] text-[#6b4cc6] hover:bg-[#f4f0fb] font-semibold text-xs rounded-xl transition-colors shadow-sm flex-shrink-0"
            >
              Manage Booking
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 text-center space-y-3">
          <Calendar className="w-8 h-8 text-[#6b4cc6] mx-auto" />
          <h3 className="font-semibold text-base text-[#1c1c2b]">No upcoming class booked</h3>
          <p className="text-xs text-[#6b7280]">Book your next Reformer or Clinical Pilates session now.</p>
          <button
            onClick={() => setActiveTab('book')}
            className="px-5 py-2.5 bg-[#6b4cc6] text-white text-xs font-semibold rounded-xl shadow-md card-hover inline-block"
          >
            Browse Class Schedule
          </button>
        </div>
      )}

      {/* Grid: Classes Remaining & Membership Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Classes Remaining Card */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm flex items-center justify-between card-hover">
          <div>
            <span className="text-xs text-[#6b7280] font-medium block">Classes Remaining</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-serif text-3xl font-bold text-[#1c1c2b]">
                {clientProfile.classesRemaining}
              </span>
              <span className="text-xs text-[#6b7280]">
                of {clientProfile.totalClassesPurchased} classes
              </span>
            </div>
            <p className="text-xs text-amber-700 mt-1 font-medium">
              Expires in 28 days
            </p>
          </div>

          {/* SVG Progress Ring */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-neutral-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#6b4cc6]"
                strokeDasharray={`${(clientProfile.classesRemaining / clientProfile.totalClassesPurchased) * 100}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#4e2f80]">
              {Math.round((clientProfile.classesRemaining / clientProfile.totalClassesPurchased) * 100)}%
            </div>
          </div>
        </div>

        {/* Membership Status Card */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm flex items-center justify-between card-hover">
          <div>
            <span className="text-xs text-[#6b7280] font-medium block">Membership</span>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <h4 className="font-bold text-base text-[#1c1c2b]">{clientProfile.membershipName}</h4>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex-shrink-0">
                {clientProfile.membershipStatus}
              </span>
            </div>
            <p className="text-xs text-[#6b7280] mt-1">
              Renews on {clientProfile.membershipRenewalDate}
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#f4f0fb] flex items-center justify-center text-[#6b4cc6] flex-shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Streak Banner */}
      <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 card-hover">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#6b4cc6] shadow-sm flex-shrink-0">
            <Flame className="w-6 h-6 fill-[#6b4cc6]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-[#1c1c2b] truncate">You’re on a roll!</h4>
            <p className="text-xs text-[#6b7280] mt-0.5 text-balance">
              {clientProfile.classesThisMonth} classes this month. Keep it up, you’re building something strong.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#d3c2f0] flex-shrink-0">
          <span className="text-xs text-[#6b7280] font-medium hidden xs:inline">Current Streak:</span>
          <span className="font-serif text-lg font-bold text-[#4e2f80]">
            {clientProfile.currentStreakWeeks} <span className="text-xs font-sans font-medium">weeks</span>
          </span>
        </div>
      </div>

      {/* Saved Programs Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-[#1c1c2b]">Saved Programs</h3>
          <button className="text-xs text-[#6b4cc6] font-semibold hover:underline">
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAVED_PROGRAMS.map((prog) => (
            <div 
              key={prog.id}
              className="group bg-white rounded-2xl border border-[#e5e2eb] overflow-hidden hover:shadow-md transition-all cursor-pointer"
            >
              <div className="h-28 overflow-hidden relative">
                <img
                  src={prog.imageUrl}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {prog.level}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-xs text-[#1c1c2b] group-hover:text-[#6b4cc6] transition-colors truncate">
                  {prog.title}
                </h4>
                <p className="text-[11px] text-[#6b7280] mt-0.5">
                  {prog.sessionsCount} sessions
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-bold text-base text-[#1c1c2b] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          <button
            onClick={() => setActiveTab('book')}
            className="p-3 sm:p-4 bg-white rounded-2xl border border-[#e5e2eb] hover:border-[#6b4cc6] hover:bg-[#f4f0fb] text-center transition-all group"
          >
            <RotateCcw className="w-5 h-5 text-[#6b4cc6] mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#1c1c2b] block leading-tight">Reschedule</span>
          </button>

          <button
            onClick={() => setShowManageModal(true)}
            className="p-3 sm:p-4 bg-white rounded-2xl border border-[#e5e2eb] hover:border-[#6b4cc6] hover:bg-[#f4f0fb] text-center transition-all group"
          >
            <XCircle className="w-5 h-5 text-rose-500 mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#1c1c2b] block leading-tight">Cancel</span>
          </button>

          <button
            onClick={() => setShowBuyPackageModal(true)}
            className="p-3 sm:p-4 bg-white rounded-2xl border border-[#e5e2eb] hover:border-[#6b4cc6] hover:bg-[#f4f0fb] text-center transition-all group"
          >
            <ShoppingBag className="w-5 h-5 text-[#6b4cc6] mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#1c1c2b] block leading-tight">Buy Pack</span>
          </button>

          <button
            onClick={() => showToast('Gift a Class', 'Gift voucher purchase link sent to your clipboard!', 'info')}
            className="p-3 sm:p-4 bg-white rounded-2xl border border-[#e5e2eb] hover:border-[#6b4cc6] hover:bg-[#f4f0fb] text-center transition-all group"
          >
            <Gift className="w-5 h-5 text-[#6b4cc6] mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#1c1c2b] block leading-tight">Gift a Class</span>
          </button>

          <button
            onClick={() => showToast('Referral Link', 'Your unique referral code is CORE-WAMBUI. You get 1 free class per referral!', 'success')}
            className="p-3 sm:p-4 bg-white rounded-2xl border border-[#e5e2eb] hover:border-[#6b4cc6] hover:bg-[#f4f0fb] text-center transition-all group"
          >
            <Users className="w-5 h-5 text-[#6b4cc6] mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#1c1c2b] block leading-tight">Refer a Friend</span>
          </button>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-[#1c1c2b]">Recent Activity</h3>
          <button className="text-xs text-[#6b4cc6] font-semibold hover:underline">
            View all
          </button>
        </div>

        <div className="bg-white border border-[#e5e2eb] rounded-3xl divide-y divide-[#e5e2eb]">
          {activities.map((act) => (
            <div key={act.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#f4f0fb] text-[#6b4cc6] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs text-[#1c1c2b] truncate">{act.title}</h4>
                  <p className="text-[11px] text-[#6b7280] mt-0.5 truncate">{act.subtitle}</p>
                </div>
              </div>

              {act.statusBadge && (
                <span className="text-[10px] font-semibold text-[#6b4cc6] bg-[#f4f0fb] px-2.5 py-1 rounded-full flex-shrink-0">
                  {act.statusBadge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inspirational Quote Box */}
      <div className="bg-[#fbf9fd] border border-[#e5e2eb] rounded-3xl p-6 relative overflow-hidden card-hover">
        <Quote className="w-12 h-12 text-[#d3c2f0]/40 absolute top-4 right-4 pointer-events-none" />
        <p className="font-serif italic text-sm sm:text-base text-[#4e2f80] max-w-xl relative z-10 text-balance">
          “Pilates is not just exercise, it’s a return to yourself.”
        </p>
        <span className="text-xs text-[#6b7280] font-medium block mt-2 relative z-10">
          — Joseph Pilates
        </span>
      </div>

      {/* Manage Booking Dialog */}
      {showManageModal && upcoming && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-zoom-in">
            <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">
              Manage Booking
            </h3>
            <p className="text-xs text-[#6b7280] text-balance">
              You are managing your upcoming {upcoming.classTitle} session on {upcoming.dateLabel} at {upcoming.time}.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setShowManageModal(false);
                  setActiveTab('book');
                }}
                className="w-full py-3 px-4 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] transition-colors"
              >
                Reschedule to Another Slot
              </button>

              <button
                onClick={() => {
                  handleCancelBooking(upcoming.id);
                  setShowManageModal(false);
                }}
                className="w-full py-3 px-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-colors"
              >
                Cancel Booking & Restore Credit
              </button>

              <button
                onClick={() => setShowManageModal(false)}
                className="w-full py-2 px-4 text-xs font-semibold text-[#6b7280] hover:text-[#1c1c2b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buy Package Modal */}
      {showBuyPackageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-zoom-in flex flex-col">
            <div className="flex items-center justify-between shrink-0">
              <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">
                Buy Class Package
              </h3>
              <button onClick={() => setShowBuyPackageModal(false)} aria-label="Close modal" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 text-[#6b7280]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {MOCK_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-4 rounded-2xl border border-[#e5e2eb] bg-[#fbf9fd] space-y-2 card-hover">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold text-sm text-[#1c1c2b] leading-tight">{pkg.name}</h4>
                    <span className="font-bold text-sm text-[#6b4cc6] whitespace-nowrap">KES {pkg.priceKES.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-[#6b7280] text-balance">{pkg.description}</p>
                  <button
                    onClick={() => {
                      setShowBuyPackageModal(false);
                      showToast('Package Purchased!', `You have added ${pkg.name} to your account.`, 'success');
                    }}
                    className="w-full py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold mt-2 hover:bg-[#5b3894] transition-colors"
                  >
                    Buy via M-Pesa
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
