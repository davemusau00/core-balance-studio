import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInstructors } from '../../lib/hooks/useInstructors';
import { Logo } from '../common/Logo';
import { MobileMenuDrawer } from '../common/MobileMenuDrawer';
import { ArrowRight, Star, Heart, Menu } from 'lucide-react';

export const PublicWebsite: React.FC = () => {
  const navigate = useNavigate();
  const { data: instructors } = useInstructors();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b] selection:bg-[#6b4cc6] selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-[#e5e2eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link to="/">
            <Logo size="md" />
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-[#6b7280]">
            <Link to="/instructors" className="hover:text-[#1c1c2b] transition-colors">Instructors</Link>
            <Link to="/memberships" className="hover:text-[#1c1c2b] transition-colors">Pricing</Link>
            <Link to="/book" className="hover:text-[#1c1c2b] transition-colors">Schedule</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/signin" className="text-xs font-semibold text-[#6b7280] hover:text-[#1c1c2b]">
              Client Login
            </Link>
            <Link to="/book" className="px-5 py-2.5 bg-[#6b4cc6] text-white rounded-2xl text-xs font-semibold hover:bg-[#5b3894] transition-all shadow-sm">
              Book a Class
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 px-4 sm:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#e9e0f6] to-transparent rounded-full blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
          <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left z-10 pt-4 sm:pt-0">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#f4f0fb] border border-[#d3c2f0] text-xs font-semibold text-[#6b4cc6] mx-auto lg:mx-0 mt-4 sm:mt-0">
              <Star className="w-3.5 h-3.5 fill-[#6b4cc6]" />
              <span>Nairobi's Premier Pilates Studio</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-7xl font-bold leading-[1.1] text-[#1c1c2b] tracking-tight">
              Realign your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b4cc6] to-[#b894e6]">body & mind.</span>
            </h1>
            
            <p className="text-sm sm:text-lg text-[#6b7280] max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance">
              Clinical expertise meets boutique luxury. Build deep core strength, improve posture, and move effortlessly with our signature reformer classes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link to="/book" className="w-full sm:w-auto px-8 py-4 bg-[#6b4cc6] text-white rounded-2xl font-semibold text-sm hover:bg-[#5b3894] transition-all shadow-lg shadow-[#6b4cc6]/25 flex items-center justify-center gap-2 group">
                View Schedule
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/memberships" className="w-full sm:w-auto px-8 py-4 bg-white border border-[#e5e2eb] text-[#1c1c2b] rounded-2xl font-semibold text-sm hover:bg-[#fbf9fd] transition-all text-center">
                Explore Memberships
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
            <div className="relative rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
              <div className="absolute inset-0 bg-[#6b4cc6]/10 mix-blend-multiply z-10" />
              <img 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200"
                alt="Reformer Pilates Studio"
                className="w-full aspect-[4/5] sm:aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="bg-white px-4 sm:px-8 py-20 sm:py-32 border-t border-[#e5e2eb]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1c2b]">Expert Guidance</h2>
              <p className="text-sm text-[#6b7280] max-w-md">Learn from certified clinical specialists dedicated to your physical progression.</p>
            </div>
            <Link to="/instructors" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#6b4cc6] hover:text-[#4e2f80] transition-colors group">
              Meet the team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.slice(0, 4).map((inst) => (
              <Link to="/instructors" key={inst.id} className="group">
                <div className="bg-[#fbf9fd] rounded-[32px] overflow-hidden border border-[#e5e2eb] transition-all group-hover:border-[#d3c2f0] group-hover:shadow-xl">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={inst.avatarUrl} 
                      alt={inst.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-base text-[#1c1c2b]">{inst.name}</h3>
                    <p className="text-xs text-[#6b7280] mt-1">{inst.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/instructors" className="sm:hidden mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#6b4cc6] hover:text-[#4e2f80] transition-colors group w-full py-4 bg-[#f4f0fb] rounded-2xl">
            Meet all instructors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1c2b] text-white px-4 sm:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Logo size="md" light />
            <p className="text-xs text-white/60 leading-relaxed max-w-xs">
              Elevating movement through clinical precision and boutique hospitality. Find your balance today.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Studio</h4>
            <ul className="space-y-3 text-xs text-white/60">
              <li><Link to="/instructors" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/memberships" className="hover:text-white transition-colors">Memberships</Link></li>
              <li><Link to="/book" className="hover:text-white transition-colors">Class Schedule</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Visit Us</h4>
            <ul className="space-y-3 text-xs text-white/60 leading-relaxed">
              <li>Westlands, Nairobi</li>
              <li>Mon-Fri: 6am - 8pm</li>
              <li>Sat-Sun: 8am - 2pm</li>
              <li>hello@corebalance.co.ke</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Mobile Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeId="home"
        onItemClick={(id) => navigate('/' + (id === 'home' ? '' : id))}
        items={[
          { id: 'home', label: 'Home' },
          { id: 'instructors', label: 'Instructors' },
          { id: 'memberships', label: 'Memberships' },
          { id: 'book', label: 'Book a Class' },
        ]}
        ctaLabel="Client Login"
        onCta={() => navigate('/signin')}
      />
    </div>
  );
};
