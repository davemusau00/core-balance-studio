import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, Download, Users, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DAYS = ['Mon 4', 'Tue 5', 'Wed 6', 'Thu 7', 'Fri 8', 'Sat 9', 'Sun 10'];
const TODAY_COL = 1; // Tuesday

interface Shift {
  type: 'teaching' | 'admin' | 'off' | 'sub';
  label?: string;
}

type ShiftType = 'teaching' | 'admin' | 'off' | 'sub';

interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  phone: string;
  rota: Shift[];
  attendance: Record<string, 'present' | 'late' | 'absent' | 'off'>;
  hoursThisWeek: number;
}

const ROTA: StaffMember[] = [
  {
    id: 's1', name: 'Amara Osei', role: 'Senior Instructor',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80', phone: '0712 345 678',
    rota: [
      { type: 'teaching', label: '07:00 & 09:00' },
      { type: 'teaching', label: '07:00' },
      { type: 'admin' },
      { type: 'teaching', label: '07:00 & 10:30' },
      { type: 'teaching', label: '09:00' },
      { type: 'teaching', label: '08:00 & 10:00' },
      { type: 'off' },
    ],
    attendance: { 'Mon 4': 'present', 'Tue 5': 'present' },
    hoursThisWeek: 14,
  },
  {
    id: 's2', name: 'Dr. Siti Rahmat', role: 'Clinical Specialist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80', phone: '0722 987 654',
    rota: [
      { type: 'off' },
      { type: 'teaching', label: '09:00' },
      { type: 'teaching', label: '09:00' },
      { type: 'off' },
      { type: 'teaching', label: '09:00' },
      { type: 'sub', label: 'Sub for Amara' },
      { type: 'off' },
    ],
    attendance: { 'Mon 4': 'off', 'Tue 5': 'present' },
    hoursThisWeek: 8,
  },
  {
    id: 's3', name: 'Marcus Ferreira', role: 'Stretch & Mobility Coach',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80', phone: '0733 456 789',
    rota: [
      { type: 'teaching', label: '10:30' },
      { type: 'teaching', label: '10:30' },
      { type: 'teaching', label: '10:30' },
      { type: 'admin' },
      { type: 'off' },
      { type: 'teaching', label: '10:30' },
      { type: 'teaching', label: '10:30' },
    ],
    attendance: { 'Mon 4': 'present', 'Tue 5': 'late' },
    hoursThisWeek: 12,
  },
  {
    id: 's4', name: 'Yuki Tanaka', role: 'Breathwork Facilitator',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80', phone: '0700 111 222',
    rota: [
      { type: 'off' },
      { type: 'off' },
      { type: 'teaching', label: '17:30' },
      { type: 'teaching', label: '17:30' },
      { type: 'teaching', label: '17:30' },
      { type: 'off' },
      { type: 'teaching', label: '09:00' },
    ],
    attendance: { 'Mon 4': 'off', 'Tue 5': 'absent' },
    hoursThisWeek: 6,
  },
];

const SHIFT_STYLES: Record<ShiftType, string> = {
  teaching: 'bg-[#6b4cc6] text-white border-[#5b3894]',
  admin:    'bg-sky-100 text-sky-800 border-sky-200',
  off:      'bg-neutral-100 text-neutral-400 border-neutral-200',
  sub:      'bg-amber-100 text-amber-800 border-amber-200',
};

const ATTENDANCE_CONFIG = {
  present: { label: 'Present', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  late:    { label: 'Late',    icon: Clock,        color: 'text-amber-600',   bg: 'bg-amber-50' },
  absent:  { label: 'Absent',  icon: XCircle,      color: 'text-rose-600',   bg: 'bg-rose-50' },
  off:     { label: 'Day Off', icon: Calendar,     color: 'text-neutral-400', bg: 'bg-neutral-100' },
};

type AttendanceStatus = 'present' | 'late' | 'absent' | 'off';

export const AdminRotaPage: React.FC = () => {
  const { showToast } = useApp();
  const [staff, setStaff] = useState(ROTA);
  const [view, setView] = useState<'rota' | 'attendance'>('rota');

  const markAttendance = (staffId: string, day: string, status: AttendanceStatus) => {
    setStaff(prev => prev.map(s =>
      s.id === staffId ? { ...s, attendance: { ...s.attendance, [day]: status } } : s
    ));
    showToast('Attendance Updated', `Marked as ${status} for ${day}.`, 'success');
  };

  const todayAbsent = staff.filter(s => s.attendance['Tue 5'] === 'absent');
  const todayLate = staff.filter(s => s.attendance['Tue 5'] === 'late');

  return (
    <main className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Staff Rota & Attendance</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Week of Aug 4–10, 2026 · Instructor scheduling and live check-in.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('rota')} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${view === 'rota' ? 'bg-[#6b4cc6] text-white border-[#6b4cc6]' : 'bg-white border-[#e5e2eb] text-[#6b7280]'}`}>
            Weekly Rota
          </button>
          <button onClick={() => setView('attendance')} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${view === 'attendance' ? 'bg-[#6b4cc6] text-white border-[#6b4cc6]' : 'bg-white border-[#e5e2eb] text-[#6b7280]'}`}>
            Attendance
          </button>
          <button className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#e5e2eb] bg-white flex items-center gap-1.5 text-[#6b7280] hover:bg-neutral-50">
            <Download className="w-3.5 h-3.5 text-[#6b4cc6]" /> Export
          </button>
        </div>
      </div>

      {/* Alerts */}
      {(todayAbsent.length > 0 || todayLate.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="text-amber-800 font-medium">
            Today: {todayAbsent.length > 0 && <strong>{todayAbsent.length} absent</strong>}
            {todayAbsent.length > 0 && todayLate.length > 0 && ', '}
            {todayLate.length > 0 && <strong>{todayLate.length} late</strong>}
            {' — verify coverage for all classes.'}
          </span>
        </div>
      )}

      {/* Legend */}
      {view === 'rota' && (
        <div className="flex flex-wrap gap-3 text-[10px] font-semibold">
          {(['teaching', 'admin', 'sub', 'off'] as ShiftType[]).map(t => (
            <span key={t} className={`px-2.5 py-1 rounded-full border capitalize ${SHIFT_STYLES[t]}`}>
              {t === 'sub' ? 'Substitute' : t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          ))}
        </div>
      )}

      {view === 'rota' ? (
        /* Rota Grid */
        <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#fbf9fd] border-b border-[#e5e2eb]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-[#6b7280] uppercase w-48">Instructor</th>
                  {DAYS.map((d, i) => (
                    <th key={d} className={`px-3 py-3 text-center text-[10px] font-bold uppercase ${i === TODAY_COL ? 'text-[#6b4cc6]' : 'text-[#6b7280]'}`}>
                      {d}
                      {i === TODAY_COL && <span className="ml-1 text-[8px] bg-[#6b4cc6] text-white px-1 rounded-sm">TODAY</span>}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center text-[10px] font-bold text-[#6b7280] uppercase">Hrs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4f0fb]">
                {staff.map(s => (
                  <tr key={s.id} className="hover:bg-[#fbf9fd] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1c1c2b] truncate">{s.name.split(' ')[0]}</p>
                          <p className="text-[9px] text-[#9ca3af] truncate">{s.role}</p>
                        </div>
                      </div>
                    </td>
                    {s.rota.map((shift, i) => (
                      <td key={i} className="px-2 py-3 text-center">
                        <div className={`rounded-xl border px-2 py-1.5 text-[9px] font-bold ${SHIFT_STYLES[shift.type]}`}>
                          <div>{shift.type === 'off' ? '—' : shift.type === 'admin' ? 'Admin' : shift.type === 'sub' ? 'SUB' : '🎓'}</div>
                          {shift.label && <div className="text-[8px] opacity-80 mt-0.5">{shift.label}</div>}
                        </div>
                      </td>
                    ))}
                    <td className="px-3 py-4 text-center font-bold text-[#6b4cc6]">{s.hoursThisWeek}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Attendance View */
        <div className="space-y-4">
          {staff.map(s => (
            <div key={s.id} className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-sm text-[#1c1c2b]">{s.name}</h3>
                  <p className="text-xs text-[#6b7280]">{s.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-[#6b7280]">
                  <Users className="w-3.5 h-3.5" /> {s.hoursThisWeek}h this week
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {DAYS.map(day => {
                  const status = (s.attendance[day] || 'off') as AttendanceStatus;
                  const cfg = ATTENDANCE_CONFIG[status];
                  const Icon = cfg.icon;
                  const isToday = day === 'Tue 5';
                  return (
                    <div key={day} className={`rounded-2xl border p-2.5 text-center ${isToday ? 'ring-2 ring-[#6b4cc6]' : ''} ${cfg.bg}`}>
                      <p className={`text-[9px] font-bold uppercase mb-1.5 ${isToday ? 'text-[#6b4cc6]' : 'text-[#9ca3af]'}`}>{day}</p>
                      <Icon className={`w-4 h-4 mx-auto mb-1 ${cfg.color}`} />
                      <p className={`text-[9px] font-bold ${cfg.color}`}>{cfg.label}</p>
                      {isToday && status !== 'off' && (
                        <div className="mt-2 flex flex-col gap-1">
                          {(['present', 'late', 'absent'] as const).map(a => (
                            <button
                              key={a}
                              onClick={() => markAttendance(s.id, day, a)}
                              className={`text-[8px] font-bold rounded-lg px-1 py-0.5 capitalize transition-all ${status === a ? 'bg-[#6b4cc6] text-white' : 'bg-white border border-[#e5e2eb] text-[#6b7280] hover:border-[#6b4cc6]'}`}
                            >
                              {a}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
