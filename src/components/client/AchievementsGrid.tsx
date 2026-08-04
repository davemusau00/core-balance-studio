import React from 'react';
import { Award, Flame, Sun, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: 'reformer' | 'streak' | 'morning' | 'century';
  unlocked: boolean;
  unlockedDate?: string;
  progress?: { current: number; total: number };
}

const BADGES: AchievementBadge[] = [
  {
    id: 'b1',
    title: 'Reformer Pioneer',
    description: 'Completed first Reformer Flow session at Core Balance.',
    iconName: 'reformer',
    unlocked: true,
    unlockedDate: 'May 2026',
  },
  {
    id: 'b2',
    title: '5-Week Streak',
    description: 'Attended at least 1 class per week for 5 consecutive weeks.',
    iconName: 'streak',
    unlocked: true,
    unlockedDate: 'Jun 2026',
  },
  {
    id: 'b3',
    title: 'Sunrise Movement',
    description: 'Booked and attended 3 morning classes (7:00 AM slots).',
    iconName: 'morning',
    unlocked: false,
    progress: { current: 2, total: 3 },
  },
  {
    id: 'b4',
    title: 'Century Club',
    description: 'Complete 100 total Pilates & Wellness classes.',
    iconName: 'century',
    unlocked: false,
    progress: { current: 14, total: 100 },
  },
];

export const AchievementsGrid: React.FC = () => {
  return (
    <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b4cc6] block">Gamification</span>
          <h3 className="font-serif text-lg font-bold text-[#1c1c2b]">Milestones & Badges</h3>
        </div>
        <span className="text-xs font-bold text-[#4e2f80] bg-[#f4f0fb] px-3 py-1 rounded-full">
          2 of 4 Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BADGES.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
              badge.unlocked
                ? 'bg-gradient-to-br from-[#f4f0fb] to-white border-[#d3c2f0]'
                : 'bg-neutral-50 border-[#e5e2eb] opacity-75'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              badge.unlocked ? 'bg-[#6b4cc6] text-white shadow-md shadow-[#6b4cc6]/20' : 'bg-neutral-200 text-neutral-400'
            }`}>
              {badge.iconName === 'reformer' && <Sparkles className="w-5 h-5" />}
              {badge.iconName === 'streak' && <Flame className="w-5 h-5" />}
              {badge.iconName === 'morning' && <Sun className="w-5 h-5" />}
              {badge.iconName === 'century' && <Award className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-xs text-[#1c1c2b] truncate">{badge.title}</h4>
                {badge.unlocked ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                )}
              </div>

              <p className="text-[11px] text-[#6b7280] mt-0.5 leading-tight">{badge.description}</p>

              {badge.unlocked ? (
                <span className="text-[10px] font-semibold text-[#6b4cc6] block mt-2">Unlocked · {badge.unlockedDate}</span>
              ) : (
                badge.progress && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[9px] font-bold text-[#6b7280]">
                      <span>Progress</span>
                      <span>{badge.progress.current} / {badge.progress.total}</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6b4cc6] rounded-full transition-all"
                        style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
