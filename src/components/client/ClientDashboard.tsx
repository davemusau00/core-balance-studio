import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useActivities } from '../../lib/hooks/useActivities';
import { Calendar, ChevronRight, Activity, Bell, Settings, Plus, MapPin } from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: activities } = useActivities(user?.id || null);

  const upcomingBooking = user?.upcomingBooking;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 lg:pt-8">
      {/* Welcome Banner */}
      <div className="relative bg-[#1c1c2b] text-white rounded-[32px] overflow-hidden p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6b4cc6]/40 to-transparent rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
          alt="Studio Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay z-0"
        />

        <div className="relative z-20 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src={user?.avatarUrl} alt={user?.name} className="w-12 h-12 rounded-full border-2 border-white/20 shadow-sm object-cover bg-neutral-800" />
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Welcome back</p>
              <h1 className="font-serif text-2xl font-bold">{user?.name?.split(' ')[0]}</h1>
            </div>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm z-30">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#1c1c2b]" />
          </button>
        </div>

        <div className="relative z-10 mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Classes Left</p>
            <div className="flex items-end gap-2">
              <span className="font-serif text-3xl font-bold">{user?.classesRemaining}</span>
              <span className="text-xs text-white/60 pb-1">/ {user?.totalClassesPurchased}</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full" 
                style={{ width: `${(user?.classesRemaining || 0) / Math.max(1, user?.totalClassesPurchased || 1) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Current Streak</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-bold text-[#b894e6]">{user?.currentStreakWeeks}</span>
                <span className="text-xs font-semibold text-white/80">Weeks</span>
              </div>
            </div>
            <Link to="/dashboard/history" className="text-[10px] text-white/60 hover:text-white transition-colors underline underline-offset-2 w-max">
              View History
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Class */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-serif text-xl font-bold text-[#1c1c2b]">Next Up</h2>
          <Link to="/book" className="text-xs font-semibold text-[#6b4cc6] flex items-center gap-1 hover:underline">
            View Schedule <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {upcomingBooking ? (
          <div className="bg-white border border-[#e5e2eb] rounded-[24px] p-4 sm:p-5 shadow-sm card-hover flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-[#f4f0fb] w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 border border-[#d3c2f0]">
                <span className="text-[10px] font-bold text-[#6b4cc6] uppercase">{upcomingBooking.dateLabel.split(' ')[0]}</span>
                <span className="text-lg font-bold text-[#4e2f80] leading-none mt-0.5">{upcomingBooking.dateLabel.split(' ')[1]}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                  {upcomingBooking.category}
                </span>
                <h3 className="font-bold text-base text-[#1c1c2b] mt-1">{upcomingBooking.classTitle}</h3>
                <p className="text-xs text-[#6b7280] font-medium mt-0.5">{upcomingBooking.time} · {upcomingBooking.durationMinutes} min</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-[#6b7280]">
                  <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded-md">
                    <User className="w-3 h-3" />
                    {upcomingBooking.instructorName}
                  </div>
                  <div className="flex items-center gap-1 bg-neutral-100 px-2 py-1 rounded-md">
                    <MapPin className="w-3 h-3" />
                    Studio 1
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0">
              <button className="flex-1 sm:flex-none px-4 py-2 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] transition-colors shadow-sm text-center">
                Check In
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-[#e5e2eb] text-[#33333f] rounded-xl text-xs font-semibold hover:bg-[#fbf9fd] transition-colors text-center">
                Manage
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#d3c2f0] rounded-[24px] p-8 text-center bg-[#f4f0fb]/30">
            <Calendar className="w-10 h-10 text-[#b894e6] mx-auto mb-3" />
            <h3 className="font-bold text-sm text-[#4e2f80]">No upcoming classes</h3>
            <p className="text-xs text-[#6b7280] mt-1 mb-4">Book your next session to keep your streak alive!</p>
            <Link to="/book" className="inline-flex px-5 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] transition-colors shadow-sm">
              Book a Class
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <Plus />, label: 'Buy Pack', to: '/memberships' },
          { icon: <Calendar />, label: 'Schedule', to: '/book' },
          { icon: <Settings />, label: 'Profile', to: '/dashboard/profile' },
        ].map(({ icon, label, to }) => (
          <Link key={label} to={to} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#fbf9fd] hover:border-[#d3c2f0] transition-colors card-hover">
            <div className="text-[#6b4cc6]">{React.cloneElement(icon as any, { className: 'w-6 h-6' })}</div>
            <span className="text-xs font-semibold text-[#33333f]">{label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-serif text-xl font-bold text-[#1c1c2b]">Recent Activity</h2>
          <Link to="/dashboard/history" className="text-xs font-semibold text-[#6b4cc6] hover:underline">
            View All
          </Link>
        </div>
        
        <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
          {activities.slice(0, 3).map((activity, i) => (
            <div key={activity.id} className={`p-4 flex gap-4 ${i !== activities.length - 1 ? 'border-b border-[#e5e2eb]' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-[#f4f0fb] flex items-center justify-center flex-shrink-0 text-[#6b4cc6]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#1c1c2b] truncate">{activity.title}</h4>
                  <span className="text-[10px] text-[#9ca3af] whitespace-nowrap">{activity.timestamp}</span>
                </div>
                <p className="text-xs text-[#6b7280] mt-0.5 truncate">{activity.subtitle}</p>
                {activity.statusBadge && (
                  <span className="inline-block mt-2 text-[10px] font-bold bg-[#f4f0fb] text-[#6b4cc6] px-2 py-0.5 rounded-full">
                    {activity.statusBadge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
