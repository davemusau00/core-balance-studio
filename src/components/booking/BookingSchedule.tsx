import React from 'react';
import { ChevronLeft, ChevronRight, Filter, Search, Calendar, Info, Layers, Activity, Heart, Wind, Dumbbell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SCHEDULE_DAYS } from '../../data/mockData';
import { ClassCard } from './ClassCard';

export const BookingSchedule: React.FC = () => {
  const { 
    selectedDate, 
    setSelectedDate, 
    selectedServiceFilter, 
    setSelectedServiceFilter,
    classSessions,
    handleBookSession,
    handleJoinWaitlist
  } = useApp();

  const serviceCategories = [
    { id: 'all', label: 'All Services', icon: <Layers className="w-4 h-4" /> },
    { id: 'Reformer Pilates', label: 'Reformer Pilates', icon: <Activity className="w-4 h-4" /> },
    { id: 'Clinical Pilates', label: 'Clinical Pilates', icon: <Heart className="w-4 h-4" /> },
    { id: 'Stretch Therapy', label: 'Stretch Therapy', icon: <Wind className="w-4 h-4" /> },
    { id: 'Trapeze Yoga', label: 'Trapeze Yoga', icon: <ChevronRight className="w-4 h-4" /> }, // Keeping this simple, could use a custom icon
    { id: 'Strength & Sculpt', label: 'Strength & Sculpt', icon: <Dumbbell className="w-4 h-4" /> },
  ];

  const filteredSessions = classSessions.filter((s) => {
    if (selectedServiceFilter !== 'all' && s.serviceType !== selectedServiceFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Title & Top Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2eb] pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">
            Book a Class
          </h1>
          <p className="text-xs sm:text-sm text-[#6b7280] mt-0.5">
            Select a date & service to reserve your reformer or wellness session.
          </p>
        </div>

        {/* Top Segmented Controls: All Services | Today | Packages */}
        <div className="flex items-center gap-1 bg-[#f4f0fb] p-1 rounded-2xl border border-[#d3c2f0]">
          <button
            onClick={() => setSelectedServiceFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedServiceFilter === 'all'
                ? 'bg-[#6b4cc6] text-white shadow-sm'
                : 'text-[#4e2f80] hover:bg-white/50'
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setSelectedDate('2026-05-14')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedDate === '2026-05-14'
                ? 'bg-[#6b4cc6] text-white shadow-sm'
                : 'text-[#4e2f80] hover:bg-white/50'
            }`}
          >
            Today
          </button>
        </div>
      </div>

      {/* Week Date Strip Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button 
          className="w-9 h-9 rounded-2xl border border-[#e5e2eb] bg-white flex items-center justify-center text-[#6b7280] hover:text-[#1c1c2b] transition-colors flex-shrink-0"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2 py-1">
          {SCHEDULE_DAYS.map((day) => {
            const isSelected = selectedDate === day.key;
            return (
              <button
                key={day.key}
                onClick={() => setSelectedDate(day.key)}
                className={`flex-1 min-w-[68px] sm:min-w-[90px] py-2.5 px-1.5 sm:px-2 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-[#6b4cc6] border-[#6b4cc6] text-white shadow-md shadow-[#6b4cc6]/20'
                    : 'bg-white border-[#e5e2eb] text-[#33333f] hover:border-[#b894e6]'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold block tracking-wider opacity-80">
                  {day.shortDay}
                </span>
                <span className="font-bold text-sm block mt-0.5">
                  {day.dateNum} May
                </span>
              </button>
            );
          })}
        </div>

        <button 
          className="w-9 h-9 rounded-2xl border border-[#e5e2eb] bg-white flex items-center justify-center text-[#6b7280] hover:text-[#1c1c2b] transition-colors flex-shrink-0"
          aria-label="Next week"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Service Category Pills */}
      <div className="overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
        {serviceCategories.map((cat) => {
          const isSelected = selectedServiceFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedServiceFilter(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#f4f0fb] border-[#6b4cc6] text-[#4e2f80] ring-1 ring-[#6b4cc6]'
                  : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#d3c2f0] hover:text-[#1c1c2b]'
              }`}
            >
              <span className={isSelected ? 'text-[#6b4cc6]' : 'text-[#9ca3af]'}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Schedule Classes List */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#e5e2eb] p-6 space-y-3">
            <Info className="w-8 h-8 text-[#9ca3af] mx-auto" />
            <h3 className="font-semibold text-base text-[#1c1c2b]">No classes match your filter</h3>
            <p className="text-xs text-[#6b7280]">Try selecting another service category or date.</p>
            <button
              onClick={() => setSelectedServiceFilter('all')}
              className="px-4 py-2 bg-[#6b4cc6] text-white text-xs font-semibold rounded-xl hover:bg-[#5b3894] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <ClassCard
              key={session.id}
              session={session}
              onBook={handleBookSession}
              onJoinWaitlist={handleJoinWaitlist}
            />
          ))
        )}
      </div>

      {/* Bottom Studio Policy Reminder Box */}
      <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-2xl p-4 flex items-start sm:items-center gap-3.5 text-xs text-[#4e2f80]">
        <Calendar className="w-5 h-5 text-[#6b4cc6] flex-shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <span className="font-bold block text-sm text-[#1c1c2b]">Studio Policy Reminder</span>
          <span className="text-[#6b7280] text-balance block mt-0.5">
            Arrive 10–15 minutes early for grip sock setup & instructor consultation. Late arrivals may not be admitted once doors close.
          </span>
        </div>
      </div>

    </div>
  );
};
