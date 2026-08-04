import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Clock, 
  Award, 
  ShieldCheck, 
  ChevronRight,
  Heart,
  Calendar,
  MessageCircle,
  Menu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_INSTRUCTORS, INITIAL_CLASS_SESSIONS } from '../../data/mockData';
import { Logo } from '../common/Logo';
import { MobileMenuDrawer } from '../common/MobileMenuDrawer';

export const PublicWebsite: React.FC = () => {
  const { setViewMode, setActiveTab, handleBookSession } = useApp();
  const [activeSection, setActiveSection] = useState<'home' | 'classes' | 'programs' | 'instructors' | 'memberships' | 'about' | 'contact'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b]">
      
      {/* Public Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e5e2eb] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <Logo size="md" showTagline />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#6b7280]">
            {[
              { id: 'home', label: 'Home' },
              { id: 'classes', label: 'Classes' },
              { id: 'programs', label: 'Programs' },
              { id: 'instructors', label: 'Instructors' },
              { id: 'memberships', label: 'Memberships' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id as any);
                  if (tab.id === 'classes') {
                    setViewMode('client');
                    setActiveTab('book');
                  }
                }}
                className={`transition-colors hover:text-[#1c1c2b] ${
                  activeSection === tab.id ? 'text-[#6b4cc6] font-bold' : ''
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setViewMode('client');
                setActiveTab('profile');
              }}
              className="hidden sm:block text-xs font-semibold text-[#6b7280] hover:text-[#1c1c2b] px-3 py-2 rounded-xl transition-colors"
            >
              Log in
            </button>

            <button
              onClick={() => {
                setViewMode('client');
                setActiveTab('book');
              }}
              className="hidden sm:flex px-4 py-2.5 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-2xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Book a Class</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -mr-2 text-neutral-600 hover:bg-neutral-100 rounded-xl"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-8 pt-8 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4f0fb] border border-[#d3c2f0] text-xs font-semibold text-[#6b4cc6]">
              <Sparkles className="w-3.5 h-3.5 text-[#6b4cc6]" />
              <span>Boutique Reformer Pilates Studio in Spring Valley, Nairobi</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1c1c2b] leading-[1.15] text-balance">
              Movement with <br />
              <span className="italic text-[#6b4cc6]">intention.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#33333f] max-w-lg font-light leading-relaxed text-pretty">
              Reformer Pilates, Clinical Pilates & Wellness in Nairobi. Experience medical precision wrapped in boutique hospitality.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setViewMode('client');
                  setActiveTab('book');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-2xl font-semibold text-sm transition-all shadow-md shadow-[#6b4cc6]/25 flex items-center justify-center gap-2"
              >
                <span>Book a Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setViewMode('client');
                  setActiveTab('programs');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#d3c2f0] text-[#6b4cc6] hover:bg-[#f4f0fb] rounded-2xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center"
              >
                Explore Programs
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-4 lg:mt-0">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#e5e2eb]">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=900"
                alt="Reformer Pilates session"
                className="w-full h-[320px] sm:h-[500px] object-cover"
              />
            </div>
            
            {/* Overlay badge - Moved out of the clipping area on mobile */}
            <div className="relative -mt-6 mx-4 sm:mx-0 sm:absolute sm:-bottom-5 sm:left-6 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#e5e2eb] shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f0fb] flex items-center justify-center text-[#6b4cc6] font-bold shrink-0">
                ★
              </div>
              <div>
                <span className="font-bold text-sm text-[#1c1c2b] block leading-tight">5.0 Star Rated Studio</span>
                <span className="text-xs text-[#6b7280] leading-tight">120+ Client Reviews on Google</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Services Navigation Row */}
      <section className="bg-white border-y border-[#e5e2eb] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">
              Our Core Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-[#6b7280] text-balance">
              Custom spring resistance equipment designed to isolate deep core stabilizers and lengthen muscles.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: 'Reformer Pilates', icon: '🧘‍♀️', desc: 'Full-body reformer spring work' },
              { title: 'Clinical Pilates', icon: '⚕️', desc: 'Rehab & spinal alignment' },
              { title: 'Stretch Therapy', icon: '🤸‍♀️', desc: 'Myofascial decompression' },
              { title: 'Trapeze Yoga', icon: '🧘‍♂️', desc: 'Suspended aerial inversions' },
              { title: 'Strength & Sculpt', icon: '🏋️‍♀️', desc: 'Resistive muscle tone' },
            ].map((srv) => (
              <div
                key={srv.title}
                onClick={() => {
                  setViewMode('client');
                  setActiveTab('book');
                }}
                className="bg-[#fbf9fd] border border-[#e5e2eb] p-5 rounded-3xl hover:border-[#6b4cc6] card-hover cursor-pointer text-center group space-y-2"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{srv.icon}</div>
                <h3 className="font-semibold text-sm text-[#1c1c2b] group-hover:text-[#6b4cc6] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#6b7280]">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#6b4cc6] uppercase tracking-wider block mb-1">
              WORLD-CLASS LEADERSHIP
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1c1c2b]">
              Featured Instructors
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7280] max-w-md text-balance sm:text-right">
            Certified clinical specialists and movement experts leading every session with personal attention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_INSTRUCTORS.slice(0, 3).map((inst) => (
            <div key={inst.id} className="bg-white border border-[#e5e2eb] rounded-3xl p-5 shadow-sm space-y-3 card-hover">
              <img
                src={inst.avatarUrl}
                alt={inst.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#f4f0fb] mx-auto shadow-sm"
              />
              <div className="text-center space-y-1">
                <h3 className="font-bold text-base text-[#1c1c2b]">{inst.name}</h3>
                <p className="text-xs text-[#6b4cc6] font-semibold">{inst.title}</p>
                <p className="text-xs text-[#6b7280]">{inst.experienceYears}+ yrs exp · {inst.classesLedCount}+ classes</p>
              </div>
            </div>
          ))}

          {/* Inspirational Quote Box */}
          <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-3xl p-6 flex flex-col justify-center text-center space-y-3 card-hover h-full min-h-[200px]">
            <Heart className="w-8 h-8 text-[#6b4cc6] mx-auto fill-[#e9e0f6]" />
            <p className="font-serif italic text-sm sm:text-base text-[#4e2f80] text-balance">
              “Expert guidance. Intentional movement. Real results.”
            </p>
          </div>
        </div>
      </section>

      {/* Today's Schedule Preview */}
      <section className="bg-white border-y border-[#e5e2eb] py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">
                Today’s Schedule
              </h2>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-0.5">
                Join an upcoming class session at our Spring Valley studio.
              </p>
            </div>

            <button
              onClick={() => {
                setViewMode('client');
                setActiveTab('book');
              }}
              className="text-xs font-semibold text-[#6b4cc6] hover:underline flex items-center gap-1 shrink-0"
            >
              <span className="hidden sm:inline">View full schedule</span>
              <span className="sm:hidden">View all</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_CLASS_SESSIONS.slice(0, 3).map((session) => (
              <div key={session.id} className="p-4 rounded-2xl border border-[#e5e2eb] bg-[#fbf9fd] flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-hover">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-semibold text-sm text-[#6b4cc6] w-16 shrink-0">{session.startTime}</span>
                  <div>
                    <h3 className="font-bold text-sm text-[#1c1c2b]">{session.title}</h3>
                    <p className="text-xs text-[#6b7280]">
                      {session.durationMinutes} min · {session.instructor.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setViewMode('client');
                    handleBookSession(session);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#6b4cc6] text-white text-xs font-semibold rounded-xl hover:bg-[#5b3894] transition-colors"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Highlight Badges */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-5 bg-white border border-[#e5e2eb] rounded-3xl space-y-2 card-hover">
            <Award className="w-6 h-6 text-[#6b4cc6] mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm text-[#1c1c2b]">Expert Instructors</h4>
            <p className="text-xs text-[#6b7280]">Certified & Experienced</p>
          </div>

          <div className="p-5 bg-white border border-[#e5e2eb] rounded-3xl space-y-2 card-hover">
            <ShieldCheck className="w-6 h-6 text-[#6b4cc6] mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm text-[#1c1c2b]">Clinical Approach</h4>
            <p className="text-xs text-[#6b7280]">Safe. Smart. Effective.</p>
          </div>

          <div className="p-5 bg-white border border-[#e5e2eb] rounded-3xl space-y-2 card-hover">
            <Calendar className="w-6 h-6 text-[#6b4cc6] mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm text-[#1c1c2b]">Easy Booking</h4>
            <p className="text-xs text-[#6b7280]">Plans that fit you</p>
          </div>

          <div className="p-5 bg-white border border-[#e5e2eb] rounded-3xl space-y-2 card-hover">
            <MapPin className="w-6 h-6 text-[#6b4cc6] mx-auto" />
            <h4 className="font-bold text-xs sm:text-sm text-[#1c1c2b]">Nairobi Based</h4>
            <p className="text-xs text-[#6b7280]">Spring Valley, Nairobi</p>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="bg-[#1c1c2b] text-white pt-16 pb-safe px-4 sm:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Logo size="lg" className="text-white" />
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed text-balance">
              Boutique Reformer Pilates, Clinical Pilates & Wellness studio in Spring Valley, Nairobi.
            </p>
          </div>

          <div className="space-y-2 text-xs text-neutral-300">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Studio Location</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#6b4cc6] shrink-0 mt-0.5" />
              <span>Spring Valley, Lower Kabete Rd, Nairobi</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#6b4cc6] shrink-0" />
              <span>+254 712 345 678</span>
            </p>
            <p className="flex items-center gap-2 text-[#1f9d62]">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp Booking Support Active</span>
            </p>
          </div>

          <div className="space-y-2 text-xs text-neutral-300">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Opening Hours</h4>
            <p>Monday – Friday: 6:00 AM – 7:30 PM</p>
            <p>Saturday: 7:00 AM – 5:00 PM</p>
            <p>Sunday: 8:00 AM – 2:00 PM</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Client Booking</h4>
            <button
              onClick={() => {
                setViewMode('client');
                setActiveTab('book');
              }}
              className="w-full py-3.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] transition-colors shadow-sm"
            >
              Open Booking App
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-12 pb-4 border-t border-white/10 text-center text-[11px] text-neutral-500">
          © {new Date().getFullYear()} Core Balance Studio Ltd. All rights reserved. Built for Nairobi Wellness.
        </div>
      </footer>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeId={activeSection}
        onItemClick={(id) => {
          setActiveSection(id as any);
          if (id === 'classes') {
            setViewMode('client');
            setActiveTab('book');
          }
        }}
        items={[
          { id: 'home', label: 'Home' },
          { id: 'classes', label: 'Classes' },
          { id: 'programs', label: 'Programs' },
          { id: 'instructors', label: 'Instructors' },
          { id: 'memberships', label: 'Memberships' },
          { id: 'about', label: 'About' },
          { id: 'contact', label: 'Contact' }
        ]}
        ctaLabel="Log in to Client Portal"
        onCta={() => {
          setViewMode('client');
          setActiveTab('profile');
        }}
      />
    </div>
  );
};
