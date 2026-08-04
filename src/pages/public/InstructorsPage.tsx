import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstructors } from '../../lib/hooks/useInstructors';
import { InstructorCardSkeleton } from '../../components/common/Skeleton';
import { Logo } from '../../components/common/Logo';
import { MobileMenuDrawer } from '../../components/common/MobileMenuDrawer';
import { ArrowRight, Star, Award, Users, ChevronRight, Menu } from 'lucide-react';
import type { Instructor } from '../../types';

const InstructorDetailDrawer: React.FC<{ instructor: Instructor | null; onClose: () => void }> = ({ instructor, onClose }) => {
  const navigate = useNavigate();
  if (!instructor) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <img src={instructor.avatarUrl} alt={instructor.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#f4f0fb] shadow-md" />
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-[#6b7280] hover:bg-neutral-200 transition-colors">✕</button>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1c1c2b]">{instructor.name}</h2>
          <p className="text-[#6b4cc6] font-semibold text-sm mt-0.5">{instructor.title}</p>
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#6b7280]">
            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />{instructor.rating.toFixed(2)}
            </span>
            <span className="bg-neutral-100 px-2.5 py-1 rounded-lg">{instructor.experienceYears}+ yrs exp</span>
            <span className="bg-neutral-100 px-2.5 py-1 rounded-lg">{instructor.classesLedCount}+ classes</span>
          </div>
        </div>
        <p className="text-sm text-[#33333f] leading-relaxed">{instructor.bio}</p>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {instructor.specialties.map(s => (
              <span key={s} className="px-3 py-1.5 bg-[#f4f0fb] text-[#4e2f80] text-xs font-semibold rounded-full">{s}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => { onClose(); navigate('/book'); }}
          className="w-full py-3.5 bg-[#6b4cc6] text-white rounded-2xl font-semibold text-sm hover:bg-[#5b3894] transition-all shadow-lg shadow-[#6b4cc6]/25 flex items-center justify-center gap-2"
        >
          Book with {instructor.name.split(' ')[0]} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const InstructorsPage: React.FC = () => {
  const { data: instructors, isLoading } = useInstructors();
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e5e2eb] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link to="/"><Logo size="md" /></Link>
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#6b7280]">
            {[['/', 'Home'], ['/instructors', 'Instructors'], ['/memberships', 'Memberships'], ['/book', 'Book a Class']].map(([href, label]) => (
              <Link key={href} to={href} className="hover:text-[#1c1c2b] transition-colors">{label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/book" className="hidden sm:flex px-4 py-2.5 bg-[#6b4cc6] text-white rounded-2xl text-xs font-semibold hover:bg-[#5b3894] transition-all shadow-sm items-center gap-1.5">
              Book a Class <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-8 pt-16 pb-12 max-w-7xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold text-[#6b4cc6] uppercase tracking-wider mb-3">WORLD-CLASS LEADERSHIP</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1c2b] mb-4 text-balance">
          Meet Our Instructors
        </h1>
        <p className="text-sm sm:text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed text-balance">
          Each instructor brings deep clinical expertise and genuine passion for movement. Every session is led with focused, personal attention.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-sm text-[#33333f]">
            <Award className="w-5 h-5 text-[#6b4cc6]" />
            <span className="font-semibold">Certified Specialists</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#33333f]">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-semibold">4.9+ Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#33333f]">
            <Users className="w-5 h-5 text-[#6b4cc6]" />
            <span className="font-semibold">4,000+ Classes Led</span>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="px-4 sm:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [...Array(5)].map((_, i) => <InstructorCardSkeleton key={i} />)
            : instructors.map((inst) => (
              <div
                key={inst.id}
                onClick={() => setSelectedInstructor(inst)}
                className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden cursor-pointer group card-hover"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={inst.avatarUrl}
                    alt={inst.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c2b]/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-bold">{inst.rating.toFixed(2)}</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h2 className="font-bold text-lg text-[#1c1c2b] group-hover:text-[#6b4cc6] transition-colors">{inst.name}</h2>
                    <p className="text-xs text-[#6b4cc6] font-semibold mt-0.5">{inst.title}</p>
                  </div>
                  <p className="text-xs text-[#6b7280] line-clamp-2 leading-relaxed">{inst.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.specialties.slice(0, 2).map(s => (
                      <span key={s} className="text-[10px] px-2 py-1 bg-[#f4f0fb] text-[#6b4cc6] rounded-full font-semibold">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#e5e2eb]">
                    <div className="text-xs text-[#6b7280]">
                      <span className="font-semibold text-[#1c1c2b]">{inst.experienceYears}+ yrs</span> · <span className="font-semibold text-[#1c1c2b]">{inst.classesLedCount}+</span> classes
                    </div>
                    <span className="text-xs text-[#6b4cc6] font-semibold flex items-center gap-1">
                      View Profile <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#1c1c2b] px-4 sm:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="font-serif text-3xl font-bold text-white">Ready to start?</h2>
          <p className="text-sm text-neutral-400">Browse today's schedule and book a session with your preferred instructor.</p>
          <Link to="/book" className="inline-flex items-center gap-2 px-8 py-4 bg-[#6b4cc6] text-white rounded-2xl font-semibold text-sm hover:bg-[#5b3894] transition-all shadow-lg shadow-[#6b4cc6]/25">
            Browse Class Schedule <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <InstructorDetailDrawer instructor={selectedInstructor} onClose={() => setSelectedInstructor(null)} />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeId="instructors"
        onItemClick={(id) => { navigate('/' + (id === 'home' ? '' : id)); }}
        items={[
          { id: 'home', label: 'Home' },
          { id: 'instructors', label: 'Instructors' },
          { id: 'memberships', label: 'Memberships' },
          { id: 'book', label: 'Book a Class' },
        ]}
        ctaLabel="Book a Class"
        onCta={() => navigate('/book')}
      />
    </div>
  );
};
