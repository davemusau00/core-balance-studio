import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle, Calendar, CheckCircle, Clock, DollarSign, FileText, MessageSquare,
  Plus, Save, ShieldAlert, UserCheck, Users, X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  addDemoNotification, addDemoSubRequest, completeDemoSession, getDemoSessions,
  updateDemoBooking, useDemoState,
} from '../../lib/demoStore';
import type { DemoAttendanceStatus, DemoBooking } from '../../lib/demoStore';

const formatKES = (value: number) => `KES ${value.toLocaleString()}`;

export const InstructorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useApp();
  const [params, setParams] = useSearchParams();
  const state = useDemoState();
  const sessions = getDemoSessions();
  const [selectedSessionId, setSelectedSessionId] = useState('session_1');
  const [selectedBooking, setSelectedBooking] = useState<DemoBooking | null>(null);
  const [noteText, setNoteText] = useState('');
  const [subReason, setSubReason] = useState('');
  const [showSubModal, setShowSubModal] = useState(false);

  const activeTab = params.get('tab') || 'overview';
  const selectedSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];
  const roster = useMemo(() => state.bookings.filter(b => b.sessionId === selectedSession.id && b.status === 'confirmed'), [state.bookings, selectedSession.id]);
  const presentCount = roster.filter(b => b.attendance === 'present' || b.attendance === 'late').length;
  const notes = roster.filter(b => b.clinicalNote);
  const monthClasses = 28 + state.completedSessions.length;
  const estimatedEarnings = monthClasses * 2800 + roster.length * 350;

  const setTab = (tab: string) => setParams(tab === 'overview' ? {} : { tab });

  const setAttendance = (booking: DemoBooking, attendance: DemoAttendanceStatus) => {
    updateDemoBooking(booking.id, { attendance });
    showToast('Attendance updated', `${booking.clientName} marked ${attendance}.`, 'success');
  };

  const saveNote = () => {
    if (!selectedBooking || !noteText.trim()) return;
    updateDemoBooking(selectedBooking.id, { clinicalNote: noteText.trim() });
    addDemoNotification({ id: `note-${Date.now()}`, title: 'Clinical note updated', message: `${selectedBooking.clientName}'s modification note was updated.`, audience: 'admin', read: false, createdAt: new Date().toISOString() });
    showToast('Clinical note saved', 'The note is now visible to the studio team.', 'success');
    setSelectedBooking(null);
  };

  const finishClass = () => {
    completeDemoSession(selectedSession.id);
    roster.filter(b => b.attendance === 'pending').forEach(b => updateDemoBooking(b.id, { attendance: 'no-show' }));
    showToast('Class completed', `${selectedSession.title} was closed and attendance was recorded.`, 'success');
  };

  const requestCover = () => {
    if (!subReason.trim()) return;
    addDemoSubRequest({ id: `sub-${Date.now()}`, sessionTitle: selectedSession.title, dateLabel: selectedSession.dayLabel, time: selectedSession.startTime, requestedBy: user?.name || 'Instructor', reason: subReason.trim(), status: 'open', createdAt: new Date().toISOString() });
    addDemoNotification({ id: `sub-note-${Date.now()}`, title: 'Cover request received', message: `${user?.name || 'An instructor'} requested cover for ${selectedSession.title}.`, audience: 'admin', read: false, createdAt: new Date().toISOString() });
    showToast('Cover request sent', 'The admin team and eligible instructors have been notified.', 'success');
    setSubReason('');
    setShowSubModal(false);
  };

  return (
    <main className="p-4 sm:p-8 space-y-6 max-w-7xl">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b4cc6] bg-[#f4f0fb] px-3 py-1 rounded-full">Instructor Command Center</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b] mt-2">Welcome back, {user?.name?.split(' ')[0] || 'Instructor'}</h1>
          <p className="text-xs text-[#6b7280] mt-1">Manage your teaching day, student safety, and earnings from one place.</p>
        </div>
        <button onClick={() => setShowSubModal(true)} className="px-4 py-2.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-100"><AlertCircle className="w-4 h-4 text-amber-700" /> Request shift cover</button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {([
          { label: 'Today\'s roster', value: `${presentCount}/${roster.length} present`, Icon: UserCheck, color: '#6b4cc6' },
          { label: 'Classes this month', value: `${monthClasses} sessions`, Icon: Calendar, color: '#d97706' },
          { label: 'Instructor rating', value: '4.9 ★', Icon: CheckCircle, color: '#1f9d62' },
          { label: 'Estimated earnings', value: formatKES(estimatedEarnings), Icon: DollarSign, color: '#0891b2' },
        ]).map(({ label, value, Icon, color }) => <div key={label} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm"><Icon className="w-4 h-4 mb-3" style={{ color }} /><p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{label}</p><p className="font-serif text-xl font-bold mt-1" style={{ color }}>{value}</p></div>)}
      </div>

      <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {[['overview', 'Today'], ['injuries', 'Clinical notes'], ['earnings', 'Earnings'], ['requests', 'Cover requests']].map(([id, label]) => <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${activeTab === id ? 'bg-[#1c1c2b] text-white border-[#1c1c2b]' : 'bg-white text-[#6b7280] border-[#e5e2eb]'}`}>{label}</button>)}
      </nav>

      {activeTab === 'overview' && <>
        <section className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#e5e2eb] pb-4">
            <div><h2 className="font-serif text-xl font-bold">Teaching agenda</h2><p className="text-xs text-[#6b7280] mt-1">Select a class to open its live roster and bed map.</p></div>
            <select value={selectedSessionId} onChange={e => setSelectedSessionId(e.target.value)} className="px-3 py-2.5 rounded-xl border border-[#e5e2eb] text-xs font-semibold bg-white"><option value="">Choose session</option>{sessions.map(s => <option key={s.id} value={s.id}>{s.startTime} · {s.title}</option>)}</select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">{sessions.slice(0, 4).map(s => <button key={s.id} onClick={() => setSelectedSessionId(s.id)} className={`text-left p-3 rounded-2xl border ${s.id === selectedSession.id ? 'border-[#6b4cc6] bg-[#f4f0fb]' : 'border-[#e5e2eb] bg-[#fbf9fd]'}`}><span className="text-[10px] font-bold text-[#6b4cc6]">{s.startTime}</span><p className="font-semibold text-xs mt-1">{s.title}</p><p className="text-[10px] text-[#6b7280] mt-1">{s.bookedCount}/{s.capacity} booked · {s.instructor.name}</p></button>)}</div>
        </section>

        <section className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><h2 className="font-serif text-xl font-bold">{selectedSession.title}</h2><p className="text-xs text-[#6b7280] mt-1">{selectedSession.dayLabel} · {selectedSession.startTime}–{selectedSession.endTime} · Studio 1</p></div><div className="flex items-center gap-2"><span className="text-xs font-bold text-[#6b4cc6] bg-[#f4f0fb] px-3 py-1 rounded-full">{presentCount}/{roster.length} present</span><button onClick={finishClass} className="px-3 py-2 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold">Complete class</button></div></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">{roster.map(booking => <RosterCard key={booking.id} booking={booking} onAttendance={setAttendance} onEditNote={() => { setSelectedBooking(booking); setNoteText(booking.clinicalNote || ''); }} />)}</div>
          {roster.length === 0 && <div className="p-8 text-center border border-dashed border-[#d3c2f0] rounded-2xl"><Users className="w-8 h-8 mx-auto text-[#b894e6]" /><p className="text-sm font-semibold mt-2">No bookings in this session</p></div>}
        </section>
      </>}

      {activeTab === 'injuries' && <section className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4"><div><h2 className="font-serif text-xl font-bold">Clinical notes & safety board</h2><p className="text-xs text-[#6b7280] mt-1">Review the latest modification guidance before each class.</p></div>{notes.map(note => <RosterCard key={note.id} booking={note} onAttendance={setAttendance} onEditNote={() => { setSelectedBooking(note); setNoteText(note.clinicalNote || ''); }} />)}{notes.length === 0 && <p className="text-sm text-[#6b7280] py-8 text-center">No active clinical notes for today.</p>}</section>}

      {activeTab === 'earnings' && <EarningsPanel monthClasses={monthClasses} earnings={estimatedEarnings} />}

      {activeTab === 'requests' && <section className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm"><div className="flex items-center justify-between mb-4"><div><h2 className="font-serif text-xl font-bold">Shift cover requests</h2><p className="text-xs text-[#6b7280] mt-1">Requests are visible to studio admins and eligible staff.</p></div><button onClick={() => setShowSubModal(true)} className="px-3 py-2 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold">New request</button></div>{state.subRequests.length === 0 ? <p className="text-sm text-[#6b7280] py-8 text-center">No open requests.</p> : <div className="space-y-3">{state.subRequests.map(request => <div key={request.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 flex items-start justify-between gap-3"><div><p className="font-semibold text-sm">{request.sessionTitle} · {request.time}</p><p className="text-xs text-[#6b7280] mt-1">{request.dateLabel} · Requested by {request.requestedBy}</p><p className="text-xs text-amber-900 mt-2">{request.reason}</p></div><span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-white text-amber-800">{request.status}</span></div>)}</div>}</section>}

      {selectedBooking && <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"><div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"><div className="flex items-center justify-between"><div><h3 className="font-serif text-lg font-bold">Clinical note</h3><p className="text-xs text-[#6b7280]">{selectedBooking.clientName}</p></div><button onClick={() => setSelectedBooking(null)}><X className="w-5 h-5 text-neutral-400" /></button></div><textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={5} placeholder="Add movement restrictions, pregnancy guidance, or modifications..." className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]" /><button onClick={saveNote} disabled={!noteText.trim()} className="w-full py-3 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold disabled:opacity-50 flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save clinical note</button></div></div>}
      {showSubModal && <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"><div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"><div className="flex items-center justify-between"><h3 className="font-serif text-lg font-bold">Request shift cover</h3><button onClick={() => setShowSubModal(false)}><X className="w-5 h-5 text-neutral-400" /></button></div><p className="text-xs text-[#6b7280]">Broadcast a request for {selectedSession.title} on {selectedSession.dayLabel} at {selectedSession.startTime}.</p><textarea value={subReason} onChange={e => setSubReason(e.target.value)} rows={4} placeholder="Tell the team why cover is needed..." className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]" /><button onClick={requestCover} disabled={!subReason.trim()} className="w-full py-3 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold disabled:opacity-50 flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" /> Broadcast request</button></div></div>}
    </main>
  );
};

const RosterCard: React.FC<{ booking: DemoBooking; onAttendance: (booking: DemoBooking, status: DemoAttendanceStatus) => void; onEditNote: () => void }> = ({ booking, onAttendance, onEditNote }) => {
  const statusStyle = booking.attendance === 'present' ? 'bg-emerald-100 text-emerald-800' : booking.attendance === 'late' ? 'bg-amber-100 text-amber-800' : booking.attendance === 'no-show' ? 'bg-rose-100 text-rose-800' : 'bg-neutral-100 text-[#6b7280]';
  return <article className={`p-4 rounded-2xl border ${booking.clinicalNote ? 'border-amber-200 bg-amber-50/30' : 'border-[#e5e2eb]'}`}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#f4f0fb] flex items-center justify-center text-[#6b4cc6] font-bold text-xs">{booking.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}</div><div><h3 className="font-semibold text-sm">{booking.clientName}</h3><p className="text-[10px] text-[#6b7280]">Bed #{String(booking.bedNumber).padStart(2, '0')} · {booking.packageName}</p></div></div><span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusStyle}`}>{booking.attendance}</span></div>{booking.clinicalNote && <div className="mt-3 p-2.5 rounded-xl bg-amber-100/80 text-xs text-amber-900 flex gap-2"><ShieldAlert className="w-4 h-4 flex-shrink-0" /><span>{booking.clinicalNote}</span></div>}<div className="mt-3 flex flex-wrap items-center gap-2"><button onClick={() => onAttendance(booking, 'present')} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-emerald-600 text-white">Present</button><button onClick={() => onAttendance(booking, 'late')} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800">Late</button><button onClick={() => onAttendance(booking, 'no-show')} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-rose-100 text-rose-800">No-show</button><button onClick={onEditNote} className="ml-auto px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-[#e5e2eb] text-[#6b4cc6] flex items-center gap-1"><FileText className="w-3 h-3" /> {booking.clinicalNote ? 'Edit note' : 'Add note'}</button></div></article>;
};

const EarningsPanel: React.FC<{ monthClasses: number; earnings: number }> = ({ monthClasses, earnings }) => <section className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{[['Base teaching', 28 * 2500], ['Attendance bonuses', 28 * 350], ['Total estimate', earnings]].map(([label, value]) => <div key={String(label)} className="bg-white border border-[#e5e2eb] rounded-2xl p-5"><p className="text-[10px] text-[#6b7280] uppercase font-bold tracking-wider">{label}</p><p className="font-serif text-2xl font-bold text-[#4e2f80] mt-2">{formatKES(Number(value))}</p></div>)}</div><div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm"><div className="flex items-center gap-2 mb-4"><DollarSign className="w-4 h-4 text-[#6b4cc6]" /><h2 className="font-serif text-xl font-bold">August payout summary</h2></div><div className="space-y-3 text-xs"><div className="flex justify-between"><span className="text-[#6b7280]">Completed sessions</span><strong>{monthClasses}</strong></div><div className="flex justify-between"><span className="text-[#6b7280]">Average per session</span><strong>{formatKES(Math.round(earnings / Math.max(1, monthClasses)))}</strong></div><div className="flex justify-between border-t border-[#e5e2eb] pt-3"><span className="font-semibold">Payout status</span><span className="text-amber-700 font-bold">Pending approval</span></div></div></div></section>;
