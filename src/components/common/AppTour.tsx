import React, { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, X, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TourStep {
  title: string;
  description: string;
  targetArea: string;
}

const TOUR_STEPS: TourStep[] = [
  { title: 'Welcome to Core Balance Studio', description: 'This is your studio operating command center. Manage clients, bookings, staff payroll, and Reformer equipment from one place.', targetArea: 'Top Header' },
  { title: 'Client CRM & At-Risk Radar', description: 'Track client lifecycles from Trial to VIP. The At-Risk radar flags clients inactive for >14 days with 1-click WhatsApp win-backs.', targetArea: 'CRM Pipeline' },
  { title: 'Staff Payroll & M-Pesa B2C', description: 'Automate instructor base rates + per-head class bonuses. Approve payroll and execute M-Pesa payouts in seconds.', targetArea: 'Payroll Module' },
  { title: 'Reformer Bed Spot Picker', description: 'Clients can pick their specific Reformer Bed (01–12) during checkout, which maps straight to instructor class rosters.', targetArea: 'Booking Engine' },
  { title: 'Interactive Help & Settings', description: 'Access studio manuals anytime via "Visit Help Center". You can toggle this guided tour on or off in Studio Settings.', targetArea: 'Settings & Help' },
];

interface AppTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppTour: React.FC<AppTourProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      showToast('Tour Completed', 'You can restart the tour anytime from Studio Settings.', 'success');
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#1c1c2b] text-white rounded-[32px] max-w-md w-full p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl relative overflow-hidden animate-zoom-in">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#6b4cc6]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Tour Header */}
        <div className="flex items-center justify-between relative z-10">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#6b4cc6] text-white px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Studio Tour · Step {currentStep + 1} of {TOUR_STEPS.length}
          </span>
          <button onClick={onClose} className="p-1 text-white/60 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Card Content */}
        <div className="relative z-10 space-y-3 pt-2">
          <h3 className="font-serif text-2xl font-bold">{step.title}</h3>
          <p className="text-xs text-white/70 leading-relaxed">{step.description}</p>

          <div className="bg-white/10 rounded-2xl p-3 text-[11px] text-[#b894e6] font-semibold flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#b894e6] animate-ping" />
            <span>Highlights: {step.targetArea}</span>
          </div>
        </div>

        {/* Step Dots & Controls */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${idx === currentStep ? 'w-6 bg-[#b894e6]' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2.5 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>{isLast ? 'Complete Tour' : 'Next Step'}</span>
              {isLast ? <CheckCircle className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
