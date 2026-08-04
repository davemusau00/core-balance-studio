import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClassSessions } from '../../lib/hooks/useClassSessions';
import { Calendar, Clock, Users, ChevronRight, Filter } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DATES = ['4', '5', '6', '7', '8', '9', '10'];
const TODAY_IDX = 1; // Tuesday

const CATEGORIES = ['All', 'Reformer', 'Clinical', 'Stretch', 'Breathwork'];

export const ClientSchedulePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(TODAY_IDX);
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: sessions, isLoading } = useClassSessions({});

  const filtered = sessions.filter(s => {
    const catMatch = activeCategory === 'All' || s.category?.toLowerCase().includes(activeCategory.toLowerCase());
    return catMatch;
  });

  const difficultyColor = (d?: string) => {
    if (d === 'Beginner') return 'text-emerald-600 bg-emerald-50';
    if (d === 'Intermediate') return 'text-amber-600 bg-amber-50';
    if (d === 'Advanced') return 'text-rose-600 bg-rose-50';
    return 'text-[#6b4cc6] bg-[#f4f0fb]';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">Class Schedule</h1>
        <p className="text-sm text-[#6b7280] mt-1">Browse and book upcoming classes.</p>
      </div>

      {/* Day picker */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {DAYS.map((day, i) => {
          const isToday = i === TODAY_IDX;
          const isActive = i === activeDay;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 w-12 py-2.5 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-[#6b4cc6] border-[#6b4cc6] text-white shadow-md shadow-[#6b4cc6]/20'
                  : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{day}</span>
              <span className={`text-base font-bold leading-none ${isActive ? 'text-white' : 'text-[#1c1c2b]'}`}>
                {DATES[i]}
              </span>
              {isToday && (
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white/60' : 'bg-[#6b4cc6]'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeCategory === cat
                ? 'bg-[#1c1c2b] border-[#1c1c2b] text-white'
                : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#1c1c2b]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Session list */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-[#e5e2eb] rounded-2xl p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-neutral-100 rounded-full w-3/4" />
                  <div className="h-2.5 bg-neutral-100 rounded-full w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#d3c2f0]">
          <Calendar className="w-10 h-10 text-[#b894e6] mx-auto mb-3" />
          <p className="font-semibold text-sm text-[#4e2f80]">No classes for this filter</p>
          <p className="text-xs text-[#6b7280] mt-1">Try selecting a different category or day.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(session => {
            const spotsLeft = session.capacity - session.bookedCount;
            const isFull = spotsLeft <= 0;
            return (
              <div
                key={session.id}
                className="bg-white border border-[#e5e2eb] rounded-[24px] p-4 sm:p-5 hover:border-[#b894e6] transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Time badge */}
                  <div className="bg-[#f4f0fb] w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 border border-[#d3c2f0]">
                    <span className="text-[10px] font-bold text-[#6b4cc6] leading-none">
                      {session.startTime?.split(':')[0]}
                    </span>
                    <span className="text-[10px] text-[#6b4cc6] font-semibold">
                      {parseInt(session.startTime || '0') < 12 ? 'AM' : 'PM'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${difficultyColor(session.difficulty)}`}>
                        {session.difficulty}
                      </span>
                      <span className="text-[10px] text-[#6b7280] bg-neutral-100 px-2 py-0.5 rounded-md font-medium">
                        {session.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-[#1c1c2b]">{session.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#6b7280]">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {session.durationMinutes} min</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {isFull ? (
                          <span className="text-amber-600 font-semibold">Full — Waitlist</span>
                        ) : (
                          <span>{spotsLeft} spot{spotsLeft !== 1 && 's'} left</span>
                        )}
                      </span>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={session.instructor.avatarUrl}
                        alt={session.instructor.name}
                        className="w-6 h-6 rounded-full object-cover border border-[#e5e2eb]"
                      />
                      <span className="text-xs text-[#6b7280] font-medium">{session.instructor.name}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/book/${session.slug}?id=${session.id}`}
                    className={`flex-shrink-0 flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all mt-1 ${
                      isFull
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        : 'bg-[#6b4cc6] text-white hover:bg-[#5b3894] shadow-sm'
                    }`}
                  >
                    {isFull ? 'Waitlist' : 'Book'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
