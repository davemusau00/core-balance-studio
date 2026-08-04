import React, { useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, Download } from 'lucide-react';

const REVENUE_DATA = [
  { month: 'Mar', revenue: 320000, bookings: 88, newClients: 14 },
  { month: 'Apr', revenue: 410000, bookings: 112, newClients: 21 },
  { month: 'May', revenue: 395000, bookings: 104, newClients: 18 },
  { month: 'Jun', revenue: 480000, bookings: 138, newClients: 27 },
  { month: 'Jul', revenue: 520000, bookings: 152, newClients: 33 },
  { month: 'Aug', revenue: 495000, bookings: 144, newClients: 29 },
];

const CLASS_POPULARITY = [
  { name: 'Reformer Flow', bookings: 248, color: '#6b4cc6' },
  { name: 'Clinical Pilates', bookings: 182, color: '#8b67d6' },
  { name: 'Stretch Therapy', bookings: 156, color: '#1f9d62' },
  { name: 'Breathwork', bookings: 94, color: '#d97706' },
  { name: 'Mat Pilates', bookings: 88, color: '#0891b2' },
];

const RETENTION_DATA = [
  { month: 'Mar', retained: 72, churned: 28 },
  { month: 'Apr', retained: 78, churned: 22 },
  { month: 'May', retained: 75, churned: 25 },
  { month: 'Jun', retained: 82, churned: 18 },
  { month: 'Jul', retained: 85, churned: 15 },
  { month: 'Aug', retained: 87, churned: 13 },
];

const KPI = [
  { label: 'Avg. Revenue / Client', value: 'KES 5,780', delta: '+9%', up: true },
  { label: 'Class Fill Rate', value: '84%', delta: '+6%', up: true },
  { label: 'Client Retention (30d)', value: '87%', delta: '+2%', up: true },
  { label: 'Avg. Bookings / Client', value: '4.2', delta: '-0.3', up: false },
];

export const AdminReportsPage: React.FC = () => {
  const [period, setPeriod] = useState<'6m' | '1y'>('6m');

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Reports & Analytics</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Studio performance at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          {(['6m', '1y'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                period === p
                  ? 'bg-[#6b4cc6] text-white border-[#6b4cc6]'
                  : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'
              }`}
            >
              {p === '6m' ? 'Last 6 Months' : 'Last Year'}
            </button>
          ))}
          <button className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#e5e2eb] bg-white text-[#6b7280] flex items-center gap-1.5 hover:bg-neutral-50">
            <Download className="w-3.5 h-3.5 text-[#6b4cc6]" /> Export
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map(kpi => (
          <div key={kpi.label} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{kpi.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1c1c2b] mt-1">{kpi.value}</p>
            <div className={`flex items-center gap-1 mt-1.5 text-xs font-semibold ${kpi.up ? 'text-emerald-600' : 'text-rose-600'}`}>
              {kpi.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {kpi.delta} vs last period
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-base text-[#1c1c2b]">Revenue Over Time</h3>
            <p className="text-xs text-[#6b7280] mt-0.5">Monthly revenue vs. total bookings</p>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 0, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b4cc6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6b4cc6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => [`KES ${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#6b4cc6" fill="url(#revGradient)" strokeWidth={3} />
              <Area type="monotone" dataKey="bookings" stroke="#1f9d62" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two column charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class popularity */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-base text-[#1c1c2b] mb-5">Class Popularity</h3>
          <div className="space-y-3">
            {CLASS_POPULARITY.map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#1c1c2b]">{c.name}</span>
                  <span className="text-xs font-bold text-[#4e2f80]">{c.bookings}</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(c.bookings / CLASS_POPULARITY[0].bookings) * 100}%`,
                      backgroundColor: c.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retention stacked bar */}
        <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-base text-[#1c1c2b] mb-1">Client Retention</h3>
          <p className="text-xs text-[#6b7280] mb-5">% retained vs. churned per month</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RETENTION_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="retained" name="Retained" fill="#6b4cc6" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="churned" name="Churned" fill="#e5e2eb" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New clients bar */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-base text-[#1c1c2b]">New Client Acquisition</h3>
            <p className="text-xs text-[#6b7280] mt-0.5">How many new members joined each month</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#f4f0fb] text-[#6b4cc6] text-xs font-bold px-3 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5" /> 142 YTD
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="newClients" name="New Clients" fill="#1f9d62" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};
