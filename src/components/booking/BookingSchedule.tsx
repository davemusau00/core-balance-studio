import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassSessions } from '../../lib/hooks/useClassSessions';
import { ClassCard } from './ClassCard';
import { Calendar, Filter, Sparkles, Move, HeartPulse, Zap, Dumbbell, Stethoscope, Medal } from 'lucide-react';
import { SCHEDULE_DAYS } from '../../data/mockData';
import type { ServiceType } from '../../types';

export const BookingSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-05-14');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  const navigate = useNavigate();

  const { data: classSessions, isLoading } = useClassSessions({ date: selectedDate, serviceFilter: selectedServiceFilter });

  const serviceFilters: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Classes', icon: <Filter className="w-3.5 h-3.5" /> },
    { id: 'Reformer Pilates', label: 'Reformer', icon: <Move className="w-3.5 h-3.5" /> },
    { id: 'Stretch Therapy', label: 'Stretch', icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'Trapeze Yoga', label: 'Trapeze', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'Strength & Sculpt', label: 'Sculpt', icon: <Dumbbell className="w-3.5 h-3.5" /> },
    { id: 'Clinical Pilates', label: 'Clinical', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'Advanced Pilates', label: 'Advanced', icon: <Medal className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 lg:pt-8">
      {/* Header */}
      <div className="border-b border-[#e5e2eb] pb-4 px-4 sm:px-0">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">Class Schedule</h1>
        <p className="text-xs sm:text-sm text-[#6b7280] mt-0.5">Book your next movement session.</p>
      </div>

      {/* Date Selector (Horizontal Scroll) */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 px-4 sm:px-0 snap-x">
        {SCHEDULE_DAYS.map((day) => {
          const isSelected = selectedDate === day.key;
          return (
            <button
              key={day.key}
              onClick={() => setSelectedDate(day.key)}
              className={`snap-start flex-shrink-0 flex flex-col items-center justify-center w-[72px] sm:w-[84px] py-3 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-[#1c1c2b] text-white border-[#1c1c2b] shadow-md'
                  : 'bg-white text-[#33333f] border-[#e5e2eb] hover:border-[#d3c2f0]'
              }`}
            >
              <span className={`text-[10px] sm:text-xs font-semibold ${isSelected ? 'text-white/80' : 'text-[#6b7280]'}`}>
                {day.shortDay}
              </span>
              <span className="text-base sm:text-lg font-bold mt-0.5">{day.dateNum}</span>
            </button>
          );
        })}
      </div>

      {/* Service Type Filters */}
      <div className="flex flex-wrap items-center gap-2 px-4 sm:px-0">
        {serviceFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedServiceFilter(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedServiceFilter === filter.id
                ? 'bg-[#6b4cc6] text-white border-[#6b4cc6] shadow-md shadow-[#6b4cc6]/20'
                : 'bg-white text-[#6b7280] border-[#e5e2eb] hover:bg-[#f4f0fb] hover:text-[#4e2f80] hover:border-[#d3c2f0]'
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Class List */}
      <div className="space-y-3 px-4 sm:px-0">
        {isLoading ? (
          <div className="py-12 text-center text-[#6b7280] text-sm">Loading schedule...</div>
        ) : classSessions.length > 0 ? (
          classSessions.map((session) => (
            <ClassCard
              key={session.id}
              session={session}
              onBook={() => navigate(`/book/${session.slug}?id=${session.id}`)}
              onWaitlist={() => navigate(`/book/${session.slug}?id=${session.id}&waitlist=true`)}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e5e2eb]">
            <Calendar className="w-10 h-10 text-[#d3c2f0] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#1c1c2b]">No classes available</p>
            <p className="text-xs text-[#6b7280] mt-1">Try selecting a different date or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
