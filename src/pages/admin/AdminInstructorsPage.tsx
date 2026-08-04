import React, { useState } from 'react';
import { useInstructors } from '../../lib/hooks/useInstructors';
import { Search, Star, Award, Plus, Edit3, Users } from 'lucide-react';
import type { Instructor } from '../../types';

export const AdminInstructorsPage: React.FC = () => {
  const { data: instructors, isLoading } = useInstructors();
  const [selected, setSelected] = useState<Instructor | null>(null);

  return (
    <main className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Instructor Roster</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Manage studio instructors and their schedules.</p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#5b3894] transition-all">
          <Plus className="w-4 h-4" /> Add Instructor
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-[#e5e2eb] rounded-3xl p-6 space-y-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-200 flex-shrink-0" />
                <div className="space-y-2 flex-1"><div className="h-3 bg-neutral-200 rounded-full w-3/4" /><div className="h-2.5 bg-neutral-100 rounded-full w-1/2" /></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {instructors.map(inst => (
            <div key={inst.id} className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm hover:border-[#b894e6] transition-colors group">
              <div className="flex items-start gap-4">
                <img src={inst.avatarUrl} alt={inst.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#f4f0fb] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base text-[#1c1c2b] truncate">{inst.name}</h3>
                  <p className="text-xs text-[#6b4cc6] font-semibold mt-0.5">{inst.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-[#1c1c2b]">{inst.rating?.toFixed(1)}</span>
                    <span className="text-xs text-[#6b7280]">· {inst.classesLedCount}+ classes</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#6b7280] mt-4 line-clamp-2 leading-relaxed">{inst.bio}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {inst.specialties.slice(0, 3).map(s => (
                  <span key={s} className="text-[10px] font-medium bg-[#f4f0fb] text-[#4e2f80] px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e5e2eb]">
                <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                  <Award className="w-3.5 h-3.5 text-[#6b4cc6]" />
                  <span>{inst.experienceYears}+ yrs experience</span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-[#6b7280] hover:text-[#6b4cc6] hover:bg-[#f4f0fb] rounded-lg transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-[#6b7280] hover:text-[#6b4cc6] hover:bg-[#f4f0fb] rounded-lg transition-colors"><Users className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
