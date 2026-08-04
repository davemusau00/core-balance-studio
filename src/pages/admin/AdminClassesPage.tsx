import React, { useState } from 'react';
import { useClassSessions } from '../../lib/hooks/useClassSessions';
import { Plus, Search, Calendar, Users, Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminClassesPage: React.FC = () => {
  const { data: classSessions } = useClassSessions({ date: '2026-05-14' });
  const { showToast } = useApp();
  
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  return (
    <main className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Class Schedule</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Manage classes, capacity, and assignments.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search classes..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#e5e2eb] rounded-2xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]" />
          </div>
          <button onClick={() => setShowAddClassModal(true)} className="px-4 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#5b3894] transition-all whitespace-nowrap">
            <Plus className="w-4 h-4" /><span>Add Class</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classSessions.map((session) => (
          <div key={session.id} className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4 hover:border-[#b894e6] transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6b4cc6] uppercase tracking-wider">{session.category}</span>
                <h3 className="font-bold text-base text-[#1c1c2b] mt-0.5">{session.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${session.status === 'in-progress' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-700'}`}>
                {session.status}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-[#6b7280]">
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{session.startTime} - {session.endTime}</div>
              <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{session.bookedCount}/{session.capacity} Booked</div>
            </div>

            <div className="pt-4 border-t border-[#e5e2eb] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={session.instructor.avatarUrl} alt={session.instructor.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-medium text-[#1c1c2b]">{session.instructor.name}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-neutral-400 hover:text-[#6b4cc6] transition-colors"><Edit3 className="w-4 h-4" /></button>
                <button className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddClassModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">Add Class Session</h3>
            <p className="text-sm text-[#6b7280]">This action would normally open the creation form. We will simulate success.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowAddClassModal(false)} className="flex-1 py-3 bg-neutral-100 text-[#1c1c2b] font-semibold text-xs rounded-xl hover:bg-neutral-200">Cancel</button>
              <button onClick={() => { setShowAddClassModal(false); showToast('Class Created', 'New session added', 'success'); }} className="flex-1 py-3 bg-[#6b4cc6] text-white font-semibold text-xs rounded-xl hover:bg-[#5b3894]">Create</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
