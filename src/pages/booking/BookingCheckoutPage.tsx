import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { usePackages } from '../../lib/hooks/usePackages';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Clock, Award, Shield, Sparkles, ChevronRight, Smartphone, CreditCard, ArrowRight, Share2 } from 'lucide-react';
import type { ClassSession, PackageOption } from '../../types';
import confetti from 'canvas-confetti';

export const BookingCheckoutPage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('id');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useApp();
  const { data: packages, isLoading: pkgsLoading } = usePackages();

  const [session, setSession] = useState<ClassSession | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'CARD'>('MPESA');
  const [mpesaPhone, setMpesaPhone] = useState<string>(user?.phone || '0712345678');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStkPushScreen, setShowStkPushScreen] = useState(false);
  const [stkStatus, setStkStatus] = useState<'prompting' | 'pin' | 'verifying' | 'success'>('prompting');

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      try {
        const { data, error } = await supabase
          .from('class_sessions')
          .select('*, instructor:instructors(*)')
          .eq('id', sessionId)
          .single();
          
        if (error) throw error;
        if (data) {
          // Manual mapping
          setSession({
            id: data.id,
            title: data.title,
            slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
            category: data.category,
            serviceType: data.service_type,
            instructor: {
              id: data.instructor.id,
              name: data.instructor.name,
              title: data.instructor.title,
              avatarUrl: data.instructor.avatar_url,
              specialties: data.instructor.specialties || [],
              experienceYears: data.instructor.experience_years,
              classesLedCount: data.instructor.classes_led_count,
              rating: data.instructor.rating,
              bio: data.instructor.bio,
            },
            startTime: data.start_time,
            endTime: data.end_time,
            date: data.session_date,
            dayLabel: data.session_date
              ? new Date(data.session_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
              : '',
            durationMinutes: data.duration_minutes,
            difficulty: data.difficulty,
            priceKES: data.price_kes,
            capacity: data.capacity,
            bookedCount: data.booked_count ?? 0,
            waitlistCount: data.waitlist_count ?? 0,
            status: data.status || 'available',
            location: data.location,
            description: data.description,
            benefits: data.benefits,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSession(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages.find(p => p.isBestValue) || packages[0]);
    }
  }, [packages, selectedPackage]);

  if (loadingSession || pkgsLoading) {
    return <div className="min-h-screen bg-[#fbf9fd] flex items-center justify-center">Loading...</div>;
  }
  if (!session) {
    return <div className="min-h-screen bg-[#fbf9fd] flex items-center justify-center">Class not found.</div>;
  }

  const isFull = session.bookedCount >= session.capacity;

  const handleConfirmBooking = async () => {
    // Fake success for actual booking
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6b4cc6', '#b894e6', '#1f9d62']
    });
    showToast('Booking Confirmed', `You are booked for ${session.title}!`, 'success');
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    if (!user) {
      // Must sign in first
      navigate('/signin', { state: { from: { pathname: `/book/${slug}?id=${sessionId}` } } });
      return;
    }

    setIsSubmitting(true);
    
    if (isFull) {
      // Waitlist flow - bypass payment
      setTimeout(() => {
        showToast('Waitlist Joined', `You have joined the waitlist for ${session.title}. We'll notify you if a spot opens!`, 'success');
        navigate('/dashboard');
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    if (paymentMethod === 'MPESA') {
      setShowStkPushScreen(true);
      setStkStatus('prompting');
      setTimeout(() => setStkStatus('pin'), 1200);
      setTimeout(() => setStkStatus('verifying'), 2500);
      setTimeout(async () => {
        setStkStatus('success');
        await handleConfirmBooking();
        setIsSubmitting(false);
        setShowStkPushScreen(false);
      }, 3800);
    } else {
      await handleConfirmBooking();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e5e2eb] px-4 py-4 flex items-center gap-4">
        <Link to="/book" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[#6b7280]">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="font-semibold text-sm">Checkout</span>
      </header>

      <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Class Hero Header */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium uppercase text-[#6b4cc6] tracking-wider block">
              {session.category}
            </span>
            <a 
              href={`https://wa.me/?text=Join%20me%20for%20${encodeURIComponent(session.title)}%20at%20Core%20Balance!%20Check%20it%20out:%20https://corebalance.demo/book/${slug}`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#6b4cc6] bg-[#f4f0fb] px-2 py-1 rounded-lg hover:bg-[#e9e0f6] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </a>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b] text-balance">
            {session.title} <span className="italic font-normal text-[#6b4cc6]">with {session.instructor.name.split(' ')[0]}</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-xs text-[#6b7280]">
            <span className="flex items-center gap-1 font-medium bg-neutral-100 px-2.5 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-[#6b4cc6]" />
              {session.durationMinutes} min
            </span>
            <span className="flex items-center gap-1 font-medium bg-neutral-100 px-2.5 py-1.5 rounded-lg">
              <Award className="w-3.5 h-3.5 text-[#6b4cc6]" />
              {session.difficulty}
            </span>
            <span className="flex items-center gap-1 font-medium bg-neutral-100 px-2.5 py-1.5 rounded-lg">
              <Shield className="w-3.5 h-3.5 text-[#6b4cc6]" />
              Max {session.capacity}
            </span>
          </div>
          <p className="text-sm text-[#33333f] mt-4 leading-relaxed">{session.description}</p>
        </div>

        {/* Benefit Pills */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#f4f0fb] p-3 rounded-2xl flex items-start gap-2 text-xs font-medium text-[#4e2f80]">
            <Sparkles className="w-4 h-4 text-[#6b4cc6] flex-shrink-0 mt-0.5" />
            <span className="leading-tight">Improve posture & alignment</span>
          </div>
          <div className="bg-[#f4f0fb] p-3 rounded-2xl flex items-start gap-2 text-xs font-medium text-[#4e2f80]">
            <Sparkles className="w-4 h-4 text-[#6b4cc6] flex-shrink-0 mt-0.5" />
            <span className="leading-tight">Build lean core strength</span>
          </div>
        </div>

        {/* Instructor Card */}
        <div className="bg-white border border-[#e5e2eb] p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={session.instructor.avatarUrl} alt={session.instructor.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-sm text-[#1c1c2b]">{session.instructor.name}</h4>
                <span className="text-[10px] bg-[#e9e0f6] text-[#6b4cc6] px-2 py-0.5 rounded-full font-semibold">{session.instructor.title}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6b7280] mt-1">{session.instructor.experienceYears}+ years exp • {session.instructor.classesLedCount}+ classes</p>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[#1c1c2b]">Select a Package</h3>
          </div>
          <div className="space-y-2">
            {packages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div key={pkg.id} onClick={() => setSelectedPackage(pkg)} className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${isSelected ? 'border-[#6b4cc6] bg-[#f4f0fb] ring-1 ring-[#6b4cc6]' : 'border-[#e5e2eb] bg-white hover:border-[#b894e6]'}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#6b4cc6] bg-[#6b4cc6]' : 'border-[#9ca3af]'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-xs sm:text-sm text-[#1c1c2b] truncate">{pkg.name}</span>
                        {pkg.savingsPercent && <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full flex-shrink-0">Save {pkg.savingsPercent}%</span>}
                      </div>
                      <span className="text-[10px] text-[#6b7280] block mt-0.5">Valid for {pkg.validityDays} days</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-bold text-sm text-[#1c1c2b]">KES {pkg.priceKES.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment */}
        {!isFull && (
          <div>
            <h3 className="font-semibold text-sm text-[#1c1c2b] mb-2.5">Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setPaymentMethod('MPESA')} className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 transition-all font-medium text-xs ${paymentMethod === 'MPESA' ? 'border-[#1f9d62] bg-emerald-50 text-emerald-900 ring-2 ring-[#1f9d62]' : 'border-[#e5e2eb] bg-white text-[#6b7280]'}`}>
                <Smartphone className="w-4 h-4 text-[#1f9d62]" />
                <span className="font-bold text-[#1f9d62]">M-PESA</span>
              </button>
              <button type="button" onClick={() => setPaymentMethod('CARD')} className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 transition-all font-medium text-xs ${paymentMethod === 'CARD' ? 'border-[#6b4cc6] bg-[#f4f0fb] text-[#4e2f80] ring-2 ring-[#6b4cc6]' : 'border-[#e5e2eb] bg-white text-[#6b7280]'}`}>
                <CreditCard className="w-4 h-4 text-[#6b4cc6]" />
                <span className="text-center leading-tight">Card</span>
              </button>
            </div>
            {paymentMethod === 'MPESA' && (
              <div className="mt-3 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-200/60">
                <label className="block text-xs font-semibold text-emerald-900 mb-1.5">M-Pesa Mobile Number</label>
                <input type="text" value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} placeholder="0712345678" className="w-full px-3 py-2.5 bg-white rounded-xl border border-emerald-300 text-xs font-medium text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#1f9d62]" />
              </div>
            )}
          </div>
        )}

        {isFull && (
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-amber-900">Class is Full</h4>
              <p className="text-xs text-amber-700 mt-1">This class is currently at full capacity. Join the waitlist, and we'll notify you immediately if a spot opens up. You will not be charged unless you secure a spot.</p>
            </div>
          </div>
        )}

        {/* Checkout CTA */}
        <button onClick={handleSubmit} disabled={isSubmitting || (!selectedPackage && !isFull)} className="w-full py-4 bg-[#6b4cc6] text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 mt-4 hover:bg-[#5b3894] disabled:opacity-50">
          {isSubmitting ? 'Processing...' : (isFull ? 'Join Waitlist' : `Pay KES ${selectedPackage?.priceKES.toLocaleString()}`)} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* STK Push Overlay */}
      {showStkPushScreen && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#1f9d62]"><Smartphone className="w-8 h-8 animate-bounce" /></div>
            <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">Check Your Phone</h3>
            <div className="text-xs text-[#6b7280] space-y-1">
              {stkStatus === 'prompting' && <p>Sending STK push...</p>}
              {stkStatus === 'pin' && <p className="font-semibold text-emerald-700 animate-pulse">Enter PIN on your phone.</p>}
              {stkStatus === 'verifying' && <p>Verifying payment...</p>}
              {stkStatus === 'success' && <p className="font-semibold text-[#6b4cc6]">Success!</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
