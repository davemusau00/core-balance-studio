import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePackages } from '../../lib/hooks/usePackages';
import { Logo } from '../../components/common/Logo';
import { MobileMenuDrawer } from '../../components/common/MobileMenuDrawer';
import { ArrowRight, CheckCircle, Zap, Infinity, Star, Menu } from 'lucide-react';

const packageFeatures: Record<string, string[]> = {
  pkg_single: ['1 class session', 'Any class type', 'Valid 30 days', 'Flexible scheduling'],
  pkg_5: ['5 class credits', 'All class types', 'Valid 60 days', 'Priority booking', 'Save 12%'],
  pkg_10: ['10 class credits', 'All class types', 'Valid 90 days', 'Priority booking', 'Waitlist priority', 'Save 20%'],
  pkg_unlimited: ['Unlimited classes', 'All class types', 'Monthly renewal', 'Priority waitlist', 'Guest passes (×2)', 'Nutrition consultation'],
};

const packageIcons: Record<string, React.ReactNode> = {
  pkg_single: <Star className="w-6 h-6 text-[#6b4cc6]" />,
  pkg_5: <Zap className="w-6 h-6 text-[#6b4cc6]" />,
  pkg_10: <CheckCircle className="w-6 h-6 text-[#6b4cc6]" />,
  pkg_unlimited: <Infinity className="w-6 h-6 text-[#6b4cc6]" />,
};

export const MembershipsPage: React.FC = () => {
  const { data: packages } = usePackages();
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
            <Link to="/signin" className="hidden sm:block text-xs font-semibold text-[#6b7280] hover:text-[#1c1c2b] px-3 py-2">Log in</Link>
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
        <span className="inline-block text-xs font-semibold text-[#6b4cc6] uppercase tracking-wider mb-3">TRANSPARENT PRICING</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1c2b] mb-4 text-balance">
          Plans for every journey
        </h1>
        <p className="text-sm sm:text-base text-[#6b7280] max-w-lg mx-auto leading-relaxed">
          From a first class to an unlimited monthly membership — find the plan that fits your schedule and goals.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="px-4 sm:px-8 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {packages.map((pkg) => {
            const features = packageFeatures[pkg.id] || [];
            const isUnlimited = pkg.id === 'pkg_unlimited';
            const isBest = pkg.isBestValue;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-3xl border p-6 transition-all card-hover ${
                  isUnlimited
                    ? 'bg-[#1c1c2b] border-[#1c1c2b] text-white shadow-2xl scale-[1.01]'
                    : isBest
                    ? 'bg-white border-[#6b4cc6] ring-2 ring-[#6b4cc6] shadow-xl'
                    : 'bg-white border-[#e5e2eb] shadow-sm'
                }`}
              >
                {isBest && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#6b4cc6] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isUnlimited ? 'bg-white/10' : 'bg-[#f4f0fb]'}`}>
                    {React.cloneElement(packageIcons[pkg.id] as React.ReactElement<{ className?: string }>, {
                      className: `w-6 h-6 ${isUnlimited ? 'text-white' : 'text-[#6b4cc6]'}`
                    })}
                  </div>
                  <h2 className={`font-bold text-base ${isUnlimited ? 'text-white' : 'text-[#1c1c2b]'}`}>{pkg.name}</h2>
                  {pkg.badgeText && (
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mt-1 inline-block ${
                      isUnlimited ? 'bg-white/20 text-white' : 'bg-[#f4f0fb] text-[#6b4cc6]'
                    }`}>
                      {pkg.badgeText}
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-serif text-3xl font-bold ${isUnlimited ? 'text-white' : 'text-[#1c1c2b]'}`}>
                      KES {pkg.priceKES.toLocaleString()}
                    </span>
                  </div>
                  {pkg.validityDays && (
                    <p className={`text-xs mt-1 ${isUnlimited ? 'text-white/60' : 'text-[#6b7280]'}`}>
                      Valid for {pkg.validityDays} days
                    </p>
                  )}
                  {pkg.savingsPercent && (
                    <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Save {pkg.savingsPercent}%
                    </span>
                  )}
                </div>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-xs font-medium ${isUnlimited ? 'text-white/80' : 'text-[#33333f]'}`}>
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isUnlimited ? 'text-[#b894e6]' : 'text-[#6b4cc6]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signin"
                  className={`w-full py-3 text-center rounded-2xl font-semibold text-sm transition-all block ${
                    isUnlimited
                      ? 'bg-white text-[#1c1c2b] hover:bg-white/90'
                      : 'bg-[#6b4cc6] text-white hover:bg-[#5b3894] shadow-md shadow-[#6b4cc6]/20'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white border-t border-[#e5e2eb] px-4 sm:px-8 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b] text-center mb-8">Common Questions</h2>
          {[
            { q: 'Can I use my credits for any class type?', a: 'Yes — all packs (5, 10 and Monthly) cover Reformer, Clinical, Stretch, Trapeze, and Sculpt classes.' },
            { q: 'What is your cancellation policy?', a: 'Cancel up to 12 hours before class with no penalty and your credit is fully restored.' },
            { q: 'Do credits roll over if I don\'t use them?', a: 'Credits are valid for the stated validity period and do not roll over. The Monthly plan renews automatically.' },
            { q: 'Can I share my pack with a friend?', a: 'Class packs are personal and non-transferable. We do offer Gift Vouchers — contact us for details.' },
          ].map(({ q, a }) => (
            <div key={q} className="border border-[#e5e2eb] rounded-2xl p-5 space-y-2">
              <h3 className="font-semibold text-sm text-[#1c1c2b]">{q}</h3>
              <p className="text-xs text-[#6b7280] leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeId="memberships"
        onItemClick={(id) => navigate('/' + (id === 'home' ? '' : id))}
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
