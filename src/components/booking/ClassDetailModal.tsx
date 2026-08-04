import React, { useState } from 'react';
import { X, Clock, Award, Shield, CheckCircle, ArrowRight, Smartphone, CreditCard, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_PACKAGES } from '../../data/mockData';
import { PackageOption } from '../../types';

export const ClassDetailModal: React.FC = () => {
  const { 
    selectedSession, 
    isClassDetailOpen, 
    setIsClassDetailOpen,
    selectedPackage,
    setSelectedPackage,
    handleConfirmBooking,
    clientProfile
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'CARD'>('MPESA');
  const [mpesaPhone, setMpesaPhone] = useState<string>(clientProfile.phone || '0712345678');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showStkPushScreen, setShowStkPushScreen] = useState<boolean>(false);
  const [stkStatus, setStkStatus] = useState<'prompting' | 'pin' | 'verifying' | 'success'>('prompting');

  if (!isClassDetailOpen || !selectedSession) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (paymentMethod === 'MPESA') {
      setShowStkPushScreen(true);
      setStkStatus('prompting');

      // STK Push simulation flow
      setTimeout(() => setStkStatus('pin'), 1200);
      setTimeout(() => setStkStatus('verifying'), 2500);
      setTimeout(async () => {
        setStkStatus('success');
        await handleConfirmBooking('MPESA', mpesaPhone);
        setIsSubmitting(false);
        setShowStkPushScreen(false);
      }, 3800);
    } else {
      await handleConfirmBooking('CARD');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#e5e2eb] text-[#1c1c2b] relative overflow-hidden animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Top Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#e5e2eb] flex items-center justify-between z-20 shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f4f0fb] text-[#6b4cc6]">
              {selectedSession.category}
            </span>
            <span className="text-xs text-[#6b7280]">Class Details</span>
          </div>

          <button
            onClick={() => setIsClassDetailOpen(false)}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#6b7280] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Class Hero Header */}
          <div>
            <span className="text-xs font-medium uppercase text-[#6b4cc6] tracking-wider block mb-1">
              REFORMER PILATES
            </span>
            <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b] text-balance">
              {selectedSession.title} <span className="italic font-normal text-[#6b4cc6]">with {selectedSession.instructor.name.split(' ')[0]}</span>
            </h2>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-xs text-[#6b7280]">
              <span className="flex items-center gap-1 font-medium bg-neutral-100 px-2.5 py-1.5 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-[#6b4cc6]" />
                {selectedSession.durationMinutes} min
              </span>
              <span className="flex items-center gap-1 font-medium bg-neutral-100 px-2.5 py-1.5 rounded-lg">
                <Award className="w-3.5 h-3.5 text-[#6b4cc6]" />
                {selectedSession.difficulty}
              </span>
              <span className="flex items-center gap-1 font-medium bg-neutral-100 px-2.5 py-1.5 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-[#6b4cc6]" />
                Small Class (Max {selectedSession.capacity})
              </span>
            </div>

            <p className="text-sm text-[#33333f] mt-4 leading-relaxed">
              {selectedSession.description || 'Flow with control. Build strength, improve posture and feel amazing in this signature Reformer class.'}
            </p>
          </div>

          {/* Benefit Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="bg-[#f4f0fb] p-3 rounded-2xl flex items-start gap-2 text-xs font-medium text-[#4e2f80]">
              <Sparkles className="w-4 h-4 text-[#6b4cc6] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">Improve posture & alignment</span>
            </div>
            <div className="bg-[#f4f0fb] p-3 rounded-2xl flex items-start gap-2 text-xs font-medium text-[#4e2f80]">
              <Sparkles className="w-4 h-4 text-[#6b4cc6] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">Build lean core strength</span>
            </div>
            <div className="bg-[#f4f0fb] p-3 rounded-2xl flex items-start gap-2 text-xs font-medium text-[#4e2f80] col-span-2 sm:col-span-1">
              <Sparkles className="w-4 h-4 text-[#6b4cc6] flex-shrink-0 mt-0.5" />
              <span className="leading-tight">Enhance mobility & length</span>
            </div>
          </div>

          {/* About Your Instructor Card */}
          <div className="bg-[#fbf9fd] border border-[#e5e2eb] p-4 rounded-2xl flex items-center justify-between gap-4 card-hover">
            <div className="flex items-center gap-3">
              <img
                src={selectedSession.instructor.avatarUrl}
                alt={selectedSession.instructor.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-sm text-[#1c1c2b]">{selectedSession.instructor.name}</h4>
                  <span className="text-[10px] bg-[#e9e0f6] text-[#6b4cc6] px-2 py-0.5 rounded-full font-semibold">
                    {selectedSession.instructor.title}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#6b7280] mt-1">
                  {selectedSession.instructor.experienceYears}+ years exp • {selectedSession.instructor.classesLedCount}+ classes
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#9ca3af] hidden sm:block" />
          </div>

          {/* Select a Package Options */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-[#1c1c2b]">Select a Package</h3>
              <span className="text-[11px] sm:text-xs text-[#6b4cc6] font-medium bg-[#f4f0fb] px-2 py-0.5 rounded-full">Best value packs</span>
            </div>

            <div className="space-y-2">
              {MOCK_PACKAGES.slice(0, 3).map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#6b4cc6] bg-[#f4f0fb] ring-1 ring-[#6b4cc6]'
                        : 'border-[#e5e2eb] bg-white hover:border-[#b894e6]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#6b4cc6] bg-[#6b4cc6]' : 'border-[#9ca3af]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-xs sm:text-sm text-[#1c1c2b] truncate">{pkg.name}</span>
                          {pkg.savingsPercent && (
                            <span className="text-[9px] sm:text-[10px] font-bold bg-pink-100 text-pink-700 px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                              Save {pkg.savingsPercent}%
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-[#6b7280] block mt-0.5">
                          Valid for {pkg.validityDays} days
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-sm text-[#1c1c2b]">
                        KES {pkg.priceKES.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-[#fbf9fd] border border-[#e5e2eb] p-4 rounded-2xl space-y-2 text-xs">
            <h4 className="font-semibold text-[10px] sm:text-xs uppercase text-[#6b7280] tracking-wider mb-2">
              Payment Summary
            </h4>
            <div className="flex justify-between text-[#6b7280] gap-4">
              <span className="flex-shrink-0">Class</span>
              <span className="font-medium text-[#1c1c2b] text-right">{selectedSession.title}</span>
            </div>
            <div className="flex justify-between text-[#6b7280] gap-4 mt-1.5">
              <span className="flex-shrink-0">Date & Time</span>
              <span className="font-medium text-[#1c1c2b] text-right">{selectedSession.dayLabel} · {selectedSession.startTime}</span>
            </div>
            <div className="flex justify-between text-[#6b7280] gap-4 mt-1.5">
              <span className="flex-shrink-0">Package Selected</span>
              <span className="font-medium text-[#1c1c2b] text-right">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between text-[#6b7280] gap-4 mt-1.5">
              <span className="flex-shrink-0">Studio Location</span>
              <span className="font-medium text-[#1c1c2b] text-right">Spring Valley, Nairobi</span>
            </div>

            <div className="pt-3 mt-3 border-t border-[#e5e2eb] flex justify-between items-center text-sm">
              <span className="font-bold text-[#1c1c2b]">Total Amount</span>
              <span className="font-bold text-base text-[#4e2f80]">
                KES {selectedPackage.priceKES.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Choose Payment Method */}
          <div>
            <h3 className="font-semibold text-sm text-[#1c1c2b] mb-2.5">Choose Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('MPESA')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 transition-all font-medium text-xs ${
                  paymentMethod === 'MPESA'
                    ? 'border-[#1f9d62] bg-emerald-50 text-emerald-900 ring-2 ring-[#1f9d62]'
                    : 'border-[#e5e2eb] bg-white text-[#6b7280] hover:border-emerald-300'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#1f9d62]" />
                <span className="font-bold text-[#1f9d62]">M-PESA</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 transition-all font-medium text-xs ${
                  paymentMethod === 'CARD'
                    ? 'border-[#6b4cc6] bg-[#f4f0fb] text-[#4e2f80] ring-2 ring-[#6b4cc6]'
                    : 'border-[#e5e2eb] bg-white text-[#6b7280] hover:border-[#b894e6]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#6b4cc6]" />
                <span className="text-center leading-tight">Debit / Credit Card</span>
              </button>
            </div>

            {/* M-Pesa Phone Input */}
            {paymentMethod === 'MPESA' && (
              <div className="mt-3 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-200/60 animate-fade-in">
                <label className="block text-xs font-semibold text-emerald-900 mb-1.5">
                  M-Pesa Mobile Number (STK Push)
                </label>
                <input
                  type="text"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="e.g. 0712345678"
                  className="w-full px-3 py-2.5 bg-white rounded-xl border border-emerald-300 text-xs font-medium text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#1f9d62]"
                />
                <p className="text-[10px] text-emerald-700 mt-1.5 leading-tight">
                  You will receive a prompt on your phone to enter your M-Pesa PIN.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Footer CTA */}
        <div className="px-4 sm:px-6 py-4 border-t border-[#e5e2eb] bg-white z-20 shrink-0 pb-safe">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full min-h-[52px] px-6 bg-[#6b4cc6] hover:bg-[#5b3894] active:scale-[0.99] text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-[#6b4cc6]/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Initiating M-Pesa Payment...</span>
            ) : (
              <div className="flex items-center gap-2 text-balance text-center">
                <span>Confirm Booking & Pay KES {selectedPackage.priceKES.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 hidden xs:block" />
              </div>
            )}
          </button>
        </div>

      </div>

      {/* STK Push Simulation Overlay */}
      {showStkPushScreen && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-zoom-in">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#1f9d62]">
              <Smartphone className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">
              Check Your Phone
            </h3>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-emerald-800">Merchant</span>
                <span className="font-bold text-emerald-950">CORE BALANCE STUDIO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800">Amount</span>
                <span className="font-bold text-emerald-950">KES {selectedPackage.priceKES.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800">Phone</span>
                <span className="font-bold text-emerald-950">{mpesaPhone}</span>
              </div>
            </div>

            <div className="text-xs text-[#6b7280] space-y-1">
              {stkStatus === 'prompting' && <p>Sending M-Pesa STK push prompt...</p>}
              {stkStatus === 'pin' && <p className="font-semibold text-emerald-700 animate-pulse">Enter M-Pesa PIN on your phone handset.</p>}
              {stkStatus === 'verifying' && <p>Verifying Daraja payment response...</p>}
              {stkStatus === 'success' && <p className="font-semibold text-[#6b4cc6]">Payment Verified! Issuing confirmation...</p>}
            </div>

            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div className={`bg-[#1f9d62] h-full transition-all duration-500 ease-out ${
                stkStatus === 'prompting' ? 'w-1/4 animate-pulse' :
                stkStatus === 'pin' ? 'w-1/2' :
                stkStatus === 'verifying' ? 'w-3/4' : 'w-full'
              }`} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
