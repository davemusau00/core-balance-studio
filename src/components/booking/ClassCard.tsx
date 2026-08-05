import React from 'react';
import { Clock, Users } from 'lucide-react';
import { ClassSession } from '../../types';

interface ClassCardProps {
  session: ClassSession;
  onBook: (session: ClassSession) => void;
  onJoinWaitlist?: (session: ClassSession) => void;
  onWaitlist?: (session: ClassSession) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({ session, onBook, onJoinWaitlist, onWaitlist }) => {
  const spotsLeft = session.capacity - session.bookedCount;
  const isFull = spotsLeft <= 0;

  const categoryBadges: Record<string, { bg: string; label: string }> = {
    classic: { bg: 'bg-[#e9e0f6] text-[#6b4cc6]', label: 'CLASSIC' },
    therapy: { bg: 'bg-emerald-100 text-emerald-800', label: 'THERAPY' },
    power: { bg: 'bg-amber-100 text-amber-800', label: 'POWER' },
    sculpt: { bg: 'bg-purple-100 text-purple-800', label: 'SCULPT' },
    clinical: { bg: 'bg-blue-100 text-blue-800', label: 'CLINICAL' },
    advanced: { bg: 'bg-[#f4f0fb] text-[#4e2f80]', label: 'ADVANCED' }
  };

  const badge = categoryBadges[session.category] || categoryBadges.classic;

  return (
    <div className="bg-white rounded-2xl border border-[#e5e2eb] p-4 card-hover group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Time & Duration */}
        <div className="flex items-center sm:block gap-3 flex-shrink-0">
          <div>
            <span className="font-semibold text-base sm:text-lg text-[#1c1c2b] block group-hover:text-[#6b4cc6] transition-colors">
              {session.startTime}
            </span>
            <span className="text-xs text-[#6b7280] flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-[#9ca3af]" />
              {session.durationMinutes} min
            </span>
          </div>
        </div>

        {/* Middle: Instructor & Class Title */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          <img
            src={session.instructor.avatarUrl}
            alt={session.instructor.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#f4f0fb] flex-shrink-0"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm sm:text-base text-[#1c1c2b] truncate">
                {session.title}
              </h3>
              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${badge.bg}`}>
                {badge.label}
              </span>
            </div>

            <div className="text-xs text-[#6b7280] flex flex-wrap items-center gap-2">
              <span className="font-medium text-[#33333f]">{session.instructor.name}</span>
              <span>•</span>
              <span>{session.difficulty}</span>
            </div>

            <div className="mt-1.5 font-semibold text-sm text-[#4e2f80]">
              KES {session.priceKES.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Right: Availability & Action Button */}
        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-3 pt-3 mt-1 sm:pt-0 sm:mt-0 border-t sm:border-0 border-[#e5e2eb] flex-shrink-0">
          <div className="text-right">
            {isFull ? (
              <span className="text-[11px] sm:text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full inline-block">
                Waitlist Only
              </span>
            ) : spotsLeft <= 3 ? (
              <span className="text-[11px] sm:text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full inline-block">
                {spotsLeft} spot{spotsLeft === 1 ? '' : 's'} left
              </span>
            ) : (
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
                {spotsLeft} spots left
              </span>
            )}
          </div>

          {isFull ? (
            <button
              onClick={() => (onJoinWaitlist || onWaitlist)?.(session)}
              aria-label={`Join Waitlist for ${session.title} at ${session.startTime}`}
              className="min-h-[44px] min-w-[120px] px-4 py-2 text-xs font-semibold text-[#6b4cc6] bg-[#f4f0fb] hover:bg-[#e9e0f6] rounded-xl border border-[#d3c2f0] transition-colors"
            >
              Join Waitlist
            </button>
          ) : (
            <button
              onClick={() => onBook(session)}
              aria-label={`Book ${session.title} at ${session.startTime}`}
              className="min-h-[44px] min-w-[120px] px-5 py-2 text-xs font-semibold text-white bg-[#6b4cc6] hover:bg-[#5b3894] active:scale-95 rounded-xl transition-all shadow-sm shadow-[#6b4cc6]/20"
            >
              Book
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
