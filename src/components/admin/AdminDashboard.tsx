import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Layers, 
  UserCheck, 
  Package as PackageIcon, 
  CreditCard, 
  BarChart3, 
  Megaphone, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  HelpCircle,
  X,
  Menu
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { MOCK_INSTRUCTORS } from '../../data/mockData';
import { Logo } from '../common/Logo';

export const AdminDashboard: React.FC = () => {
  const { 
    classSessions, 
    waitlist, 
    handleAdminCheckIn, 
    handleAdminNotifyWaitlist, 
    handleAddNewClass, 
    setViewMode,
    showToast 
  } = useApp();

  const [activeAdminNav, setActiveAdminNav] = useState<string>('dashboard');
  const [showAddClassModal, setShowAddClassModal] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Form state for adding new class
  const [newTitle, setNewTitle] = useState<string>('Reformer Flow');
  const [newTime, setNewTime] = useState<string>('09:00 AM');
  const [newCapacity, setNewCapacity] = useState<number>(12);
  const [newPrice, setNewPrice] = useState<number>(2200);

  // Analytics Chart Data
  const revenueChartData = [
    { date: 'Apr 18', bookings: 32, revenue: 1200 },
    { date: 'Apr 25', bookings: 45, revenue: 1800 },
    { date: 'May 02', bookings: 58, revenue: 2400 },
    { date: 'May 09', bookings: 72, revenue: 3100 },
    { date: 'May 16', bookings: 88, revenue: 3850 },
    { date: 'May 24', bookings: 104, revenue: 4600 }
  ];

  const packageSalesData = [
    { name: '10 Class Pack', value: 42, color: '#6b4cc6' },
    { name: '5 Class Pack', value: 27, color: '#8b67d6' },
    { name: 'Unlimited Monthly', value: 20, color: '#b894e6' },
    { name: 'Auto Renewal', value: 11, color: '#d3c2f0' }
  ];

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddNewClass({
      title: newTitle,
      startTime: newTime,
      capacity: newCapacity,
      priceKES: newPrice
    });
    setShowAddClassModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b] flex flex-col md:flex-row relative">
      
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside 
        className={`fixed md:relative z-50 w-64 h-full bg-white border-r border-[#e5e2eb] p-5 flex flex-col justify-between flex-shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="pb-4 border-b border-[#e5e2eb] flex items-center justify-between">
            <Logo size="md" />
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-1 text-neutral-500 hover:bg-neutral-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1" aria-label="Admin navigation">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'classes', label: 'Classes', icon: Layers },
              { id: 'instructors', label: 'Instructors', icon: UserCheck },
              { id: 'packages', label: 'Packages', icon: PackageIcon },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'reports', label: 'Reports', icon: TrendingUp },
              { id: 'marketing', label: 'Marketing', icon: Megaphone },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminNav(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#6b4cc6] text-white shadow-md shadow-[#6b4cc6]/20'
                      : 'text-[#6b7280] hover:text-[#1c1c2b] hover:bg-[#f4f0fb]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Cards */}
        <div className="space-y-3 pt-6 border-t border-[#e5e2eb] mt-6">
          <div className="bg-[#f4f0fb] p-4 rounded-2xl border border-[#d3c2f0] space-y-2">
            <h4 className="font-serif text-xs font-bold text-[#4e2f80]">Movement with intention</h4>
            <p className="text-[11px] text-[#6b7280]">Reformer Pilates, Clinical Pilates & Wellness in Nairobi.</p>
            <button
              onClick={() => setViewMode('public')}
              className="text-xs font-bold text-[#6b4cc6] hover:underline flex items-center gap-1 pt-1"
            >
              <span>View Public Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6b7280] px-2 cursor-pointer hover:text-[#1c1c2b]">
            <HelpCircle className="w-4 h-4 text-[#9ca3af]" />
            <span>Need Help? Visit Help Center</span>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-8 space-y-6 flex flex-col">
        
        {/* Admin Header Topbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">
                Studio Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-0.5">
                Welcome back, Admin. Here’s real-time occupancy, bookings and revenue at Core Balance Studio.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] sm:w-64">
              <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clients, classes... ⌘K"
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#e5e2eb] rounded-2xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
            </div>
            
            {/* Profile & Notifications */}
            <div className="hidden sm:flex items-center gap-3">
              <button className="w-9 h-9 rounded-full border border-[#e5e2eb] bg-white flex items-center justify-center text-[#6b7280] hover:bg-[#f4f0fb] relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#6b4cc6] rounded-full" />
              </button>
              <div className="flex items-center gap-2 px-2 py-1 bg-white border border-[#e5e2eb] rounded-full cursor-pointer hover:bg-neutral-50">
                <img 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100" 
                  alt="Admin" 
                  className="w-7 h-7 rounded-full object-cover" 
                />
                <div className="pr-2 hidden xl:block">
                  <span className="block text-[10px] font-bold text-[#1c1c2b] leading-tight">Admin User</span>
                  <span className="block text-[10px] text-[#6b7280] leading-tight">Studio Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range & Actions (Secondary Bar) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#e5e2eb] p-3 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#33333f]">
            <Calendar className="w-4 h-4 text-[#6b4cc6]" />
            <span>May 18 – May 24, 2025</span>
          </div>

          <button
            onClick={() => setShowAddClassModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class Session</span>
          </button>
        </div>

        {/* 4 Top KPI Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          
          <div className="bg-white border border-[#e5e2eb] p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-w-[200px]">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#6b7280] font-medium block">Total Bookings</span>
              <div className="w-8 h-8 rounded-full bg-[#f4f0fb] flex items-center justify-center text-[#6b4cc6]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-serif text-3xl font-bold text-[#1c1c2b]">1,248</span>
              <span className="text-xs font-semibold text-emerald-600">↑ 18%</span>
            </div>
            <div className="h-10 mt-3 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <Area type="monotone" dataKey="bookings" stroke="#6b4cc6" fill="#e9e0f6" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-[#e5e2eb] p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-w-[200px]">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#6b7280] font-medium block">Active Clients</span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-serif text-3xl font-bold text-[#1c1c2b]">856</span>
              <span className="text-xs font-semibold text-emerald-600">↑ 12%</span>
            </div>
            <div className="h-10 mt-3 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <Area type="monotone" dataKey="bookings" stroke="#1f9d62" fill="#d1fae5" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-[#e5e2eb] p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-w-[200px]">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#6b7280] font-medium block">Occupancy Rate</span>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-serif text-3xl font-bold text-[#1c1c2b]">78%</span>
              <span className="text-xs font-semibold text-emerald-600">↑ 8%</span>
            </div>
            <div className="h-10 mt-3 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <Area type="monotone" dataKey="revenue" stroke="#d97706" fill="#fef3c7" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-[#e5e2eb] p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow min-w-[200px]">
            <div className="flex items-start justify-between">
              <span className="text-xs text-[#6b7280] font-medium block">Monthly Revenue</span>
              <div className="w-8 h-8 rounded-full bg-[#f4f0fb] flex items-center justify-center text-[#4e2f80]">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-serif text-2xl font-bold text-[#4e2f80]">KES 4.95M</span>
              <span className="text-xs font-semibold text-emerald-600">↑ 22%</span>
            </div>
            <div className="h-10 mt-3 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <Area type="monotone" dataKey="revenue" stroke="#4e2f80" fill="#e9e0f6" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Middle Section: Today's Classes + Instructor Schedule + Waitlist Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Today's Classes Check-in */}
          <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#1c1c2b]">Today's Classes</h3>
              <span className="text-[10px] font-semibold text-[#6b4cc6] uppercase tracking-wider bg-[#f4f0fb] px-2 py-0.5 rounded-full">Live Check-in</span>
            </div>

            <div className="space-y-3">
              {classSessions.slice(0, 5).map((session) => (
                <div key={session.id} className="p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#6b4cc6] block">{session.startTime}</span>
                    <h4 className="font-semibold text-xs text-[#1c1c2b]">{session.title}</h4>
                    <p className="text-[11px] text-[#6b7280]">
                      {session.instructor.name} · {session.bookedCount}/{session.capacity}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAdminCheckIn(session.id)}
                    className="px-3 py-1.5 bg-[#6b4cc6] text-white text-[11px] font-semibold rounded-xl hover:bg-[#5b3894] transition-colors"
                  >
                    Check-in
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Instructor Roster */}
          <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#1c1c2b]">Instructor Shifts</h3>
              <button className="text-[10px] font-semibold text-[#6b7280] hover:text-[#1c1c2b]">View All</button>
            </div>

            <div className="space-y-3">
              {MOCK_INSTRUCTORS.map((inst) => (
                <div key={inst.id} className="p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={inst.avatarUrl}
                      alt={inst.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#d3c2f0] flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-[#1c1c2b] truncate">{inst.name}</h4>
                      <p className="text-[10px] text-[#6b7280] truncate">{inst.title}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-[#4e2f80] block">5 Classes</span>
                    <span className="text-[10px] text-[#6b7280]">7am – 5pm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Waitlist Management */}
          <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#1c1c2b]">Waitlist Queue</h3>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                {waitlist.length} Waiting
              </span>
            </div>

            <div className="space-y-3">
              {waitlist.map((wl) => (
                <div key={wl.id} className="p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={wl.clientAvatar}
                      alt={wl.clientName}
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-[#1c1c2b] truncate">{wl.clientName}</h4>
                      <p className="text-[10px] text-[#6b7280] truncate">{wl.classTitle} · {wl.time}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdminNotifyWaitlist(wl.id)}
                    disabled={wl.status === 'notified'}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl transition-colors flex-shrink-0 ${
                      wl.status === 'notified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#f4f0fb] text-[#6b4cc6] border border-[#d3c2f0] hover:bg-[#e9e0f6]'
                    }`}
                  >
                    {wl.status === 'notified' ? 'Notified ✓' : 'Notify'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Analytics & Performance Overview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
          
          {/* Revenue & Bookings Trend Area Chart */}
          <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-[#1c1c2b]">Performance Overview</h3>
                <p className="text-[11px] text-[#6b7280]">Class attendance vs monthly revenue</p>
              </div>
              <span className="text-[10px] font-semibold bg-[#f4f0fb] text-[#6b4cc6] px-3 py-1 rounded-full uppercase tracking-wider">
                This Month
              </span>
            </div>

            <div className="h-64 w-full flex-1 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 10 }} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} width={45} axisLine={false} tickLine={false} tickFormatter={(val) => `KES${val/1000}k`} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6b4cc6" fill="#e9e0f6" strokeWidth={3} />
                  <Area type="monotone" dataKey="bookings" stroke="#1f9d62" fill="#d1fae5" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Package Sales Breakdown Donut Chart */}
          <div className="bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-base text-[#1c1c2b]">Package Sales</h3>
                <p className="text-[11px] text-[#6b7280]">Distribution across packages</p>
              </div>
              <span className="font-bold text-sm text-[#4e2f80]">KES 1.88M</span>
            </div>

            <div className="h-56 w-full flex items-center justify-center flex-1 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageSalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {packageSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-4 mt-2 border-t border-[#e5e2eb]">
              {packageSalesData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[#1c1c2b] font-medium truncate">{item.name} <span className="text-[#6b7280]">({item.value}%)</span></span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Motivational Team Quote */}
        <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-3xl p-5 text-center text-xs text-[#4e2f80] font-medium">
          “Great energy in the studio today! 95% of classes were at or above capacity. Keep inspiring movement. — Core Balance Team”
        </div>

      </main>

      {/* Add New Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateClass}
            className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-zoom-in"
          >
            <div className="flex items-center justify-between border-b border-[#e5e2eb] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#1c1c2b]">
                Add Class Session
              </h3>
              <button type="button" onClick={() => setShowAddClassModal(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1c1c2b] mb-1">Class Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2eb] rounded-xl text-xs focus:ring-2 focus:ring-[#6b4cc6] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1c2b] mb-1">Start Time</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e5e2eb] rounded-xl text-xs focus:ring-2 focus:ring-[#6b4cc6] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1c1c2b] mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#e5e2eb] rounded-xl text-xs focus:ring-2 focus:ring-[#6b4cc6] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1c1c2b] mb-1">Price (KES)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#e5e2eb] rounded-xl text-xs focus:ring-2 focus:ring-[#6b4cc6] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6b4cc6] text-white font-semibold text-xs rounded-xl hover:bg-[#5b3894] transition-colors shadow-md shadow-[#6b4cc6]/20"
            >
              Publish to Studio Schedule
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
