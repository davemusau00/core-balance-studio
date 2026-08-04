import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, Clock, ShieldAlert, Sparkles, UserCheck, 
  Plus, Send, X, Star, DollarSign, Smartphone, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface StudentRosterItem {
  id: string;
  name: string;
  avatar: string;
  bedNumber: number;
  status: 'present' | 'absent' | 'pending';
  injuryNote?: string;
  packName: string;
}

const INITIAL_ROSTER: StudentRosterItem[] = [
  { id: 's1', name: 'Wambui Njeri', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80', bedNumber: 4, status: 'present', injuryNote: 'Lumbar disc herniation (L4-L5). Avoid deep spinal flexion.', packName: '10 Class Pack' },
  { id: 's2', name: 'Aisha Kamau', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80', bedNumber: 2, status: 'present', packName: 'Unlimited Monthly' },
  { id: 's3', name: 'Logan Mensah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80', bedNumber: 5, status: 'pending', injuryNote: 'Shoulder impingement (Right side). Keep arm springs light.', packName: '10 Class Pack' },
  { id: 's4', name: 'Brian Otieno', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80', bedNumber: 8, status: 'pending', packName: '5 Class Pack' },
  { id: 's5', name: 'Sarah Wanjiku', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80', bedNumber: 1, status: 'pending', injuryNote: 'Prenatal Trimester 2. Use wedge pillow for supine work.', packName: '10 Class Pack' },
];

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [roster, setRoster] = useState(INITIAL_ROSTER);
  const [selectedStudentNote, setSelectedStudentNote] = useState<StudentRosterItem | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [showSubModal, setShowSubModal] = useState(false);
  const [subReason, setSubReason] = useState('');

  const toggleCheckIn = (id: string) => {
    setRoster(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'present' ? 'pending' : 'present';
        showToast('Roster Updated', `${s.name.split(' ')[0]} marked as ${nextStatus}.`, 'success');
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleSaveNote = () => {
    if (!selectedStudentNote) return;
    setRoster(prev => prev.map(s => s.id === selectedStudentNote.id ? { ...s, injuryNote: newNoteText } : s));
    showToast('Clinical Note Saved', `Updated medical warning for ${selectedStudentNote.name.split(' ')[0]}.`, 'success');
    setSelectedStudentNote(null);
    setNewNoteText('');
  };

  const handleSendSubRequest = () => {
    setShowSubModal(false);
    setSubReason('');
    showToast('Sub Request Broadcast', 'Notification sent to available instructors for shift cover.', 'success');
  };

  const presentCount = roster.filter(r => r.status === 'present').length;

  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b4cc6] bg-[#f4f0fb] px-3 py-1 rounded-full">
            Instructor Command Center
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b] mt-1">
            Welcome back, {user?.name?.split(' ')[0] || 'Amara'}
          </h1>
          <p className="text-xs text-[#6b7280]">Studio 1 · Reformer Flow · 07:00 AM Session</p>
        </div>

        <button
          onClick={() => setShowSubModal(true)}
          className="w-full sm:w-auto px-4 py-2.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-100 transition-all"
        >
          <AlertCircle className="w-4 h-4 text-amber-700" /> Request Shift Cover (Sub)
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Today\'s Roster', value: `${presentCount}/${roster.length} Checked In`, color: '#6b4cc6' },
          { label: 'Instructor Rating', value: '4.9 ★', color: '#1f9d62' },
          { label: 'Classes This Month', value: '28 Sessions', color: '#d97706' },
          { label: 'Estimated Earnings', value: 'KES 112K', color: '#0891b2' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{s.label}</p>
            <p className="font-serif text-xl sm:text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Class Roster & Injury Warning Board */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e2eb] pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1c1c2b]">Class Roster & Bed Assignments</h3>
            <p className="text-xs text-[#6b7280]">Reformer Beds 01–12 · Tap checkmark to confirm attendance</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6b4cc6] bg-[#f4f0fb] px-3 py-1 rounded-full">
              {presentCount} of {roster.length} Present
            </span>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="space-y-3">
          {roster.map(student => {
            const isPresent = student.status === 'present';
            return (
              <div
                key={student.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  student.injuryNote ? 'border-amber-200 bg-amber-50/30' : 'border-[#e5e2eb] bg-white'
                }`}
              >
                {/* Student Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <img src={student.avatar} alt={student.name} className="w-11 h-11 rounded-full object-cover border border-white shadow-sm flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1c1c2b]">{student.name}</h4>
                      <span className="text-[10px] font-bold bg-[#1c1c2b] text-white px-2 py-0.5 rounded-full">
                        BED #{student.bedNumber < 10 ? `0${student.bedNumber}` : student.bedNumber}
                      </span>
                      <span className="text-[10px] font-semibold text-[#6b7280] bg-neutral-100 px-2 py-0.5 rounded-full">
                        {student.packName}
                      </span>
                    </div>

                    {/* Injury Warning Banner */}
                    {student.injuryNote ? (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-900 bg-amber-100/80 p-2 rounded-xl border border-amber-200">
                        <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-[10px] uppercase block tracking-wider text-amber-800">Clinical Warning / Injury Note</span>
                          <span className="text-xs">{student.injuryNote}</span>
                        </div>
                        <button
                          onClick={() => { setSelectedStudentNote(student); setNewNoteText(student.injuryNote || ''); }}
                          className="text-[10px] font-bold text-amber-800 underline hover:text-amber-950"
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setSelectedStudentNote(student); setNewNoteText(''); }}
                        className="mt-1.5 text-[10px] font-bold text-[#6b4cc6] hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Clinical Note / Injury Warning
                      </button>
                    )}
                  </div>
                </div>

                {/* Check-In Action Button */}
                <button
                  onClick={() => toggleCheckIn(student.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                    isPresent
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-[#e5e2eb] text-[#6b7280] hover:border-[#6b4cc6] hover:text-[#6b4cc6]'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {isPresent ? 'Checked In' : 'Mark Present'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Editing Modal */}
      {selectedStudentNote && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e5e2eb] pb-3">
              <h3 className="font-serif font-bold text-base text-[#1c1c2b]">
                Clinical Note: {selectedStudentNote.name}
              </h3>
              <button onClick={() => setSelectedStudentNote(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>

            <p className="text-xs text-[#6b7280]">
              Add spinal, joint, prenatal, or physical restrictions to guide Reformer modifications during class.
            </p>

            <textarea
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              placeholder="e.g. Lumbar disc herniation L4-L5. Avoid deep flexion, keep footbar on high setting."
              rows={4}
              className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
            />

            <div className="flex gap-2">
              <button onClick={() => setSelectedStudentNote(null)} className="flex-1 py-2.5 border border-[#e5e2eb] rounded-xl text-xs font-semibold text-[#6b7280]">
                Cancel
              </button>
              <button onClick={handleSaveNote} className="flex-1 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894]">
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub Request Modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e5e2eb] pb-3">
              <h3 className="font-serif font-bold text-base text-[#1c1c2b]">Request Shift Cover (Sub)</h3>
              <button onClick={() => setShowSubModal(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>

            <p className="text-xs text-[#6b7280]">
              Broadcast a sub request for <strong>07:00 AM Reformer Flow</strong>. All eligible instructors will be notified.
            </p>

            <textarea
              value={subReason}
              onChange={e => setSubReason(e.target.value)}
              placeholder="Reason for sub request (e.g. Medical emergency, studio conflict)..."
              rows={3}
              className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
            />

            <div className="flex gap-2">
              <button onClick={() => setShowSubModal(false)} className="flex-1 py-2.5 border border-[#e5e2eb] rounded-xl text-xs font-semibold text-[#6b7280]">
                Cancel
              </button>
              <button
                onClick={handleSendSubRequest}
                disabled={!subReason}
                className="flex-1 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] disabled:opacity-50"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
