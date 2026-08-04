import React from 'react';
import { X, QrCode, Sparkles, ShieldCheck, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  const memberId = user?.id ? `CBS-${user.id.substring(0, 8).toUpperCase()}` : 'CBS-8849102';

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#1c1c2b] text-white rounded-[32px] max-w-sm w-full p-6 space-y-6 border border-white/10 shadow-2xl relative overflow-hidden animate-zoom-in">
        {/* Ambient Glow background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#6b4cc6]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#6b4cc6] flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm tracking-tight">Core Balance Studio</h3>
              <p className="text-[10px] text-white/60">Digital Studio Pass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pass Card Container */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/15 rounded-3xl p-6 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Active Member Pass
          </div>

          {/* Member Info */}
          <div>
            <img
              src={user?.avatarUrl}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/20 mx-auto shadow-md"
            />
            <h4 className="font-serif text-xl font-bold mt-2">{user?.name}</h4>
            <p className="text-xs text-[#b894e6] font-semibold">{user?.membershipName || '10 Class Pack Member'}</p>
          </div>

          {/* Generated QR Code Box */}
          <div className="bg-white p-4 rounded-2xl mx-auto w-44 h-44 flex flex-col items-center justify-center shadow-lg relative group">
            <QrCode className="w-32 h-32 text-[#1c1c2b]" />
            <div className="absolute inset-0 bg-[#6b4cc6]/10 rounded-2xl animate-pulse pointer-events-none" />
          </div>

          {/* Pass Details */}
          <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-white/50 uppercase font-bold block">Member ID</span>
              <span className="font-mono font-bold text-white/90">{memberId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/50 uppercase font-bold block">Classes Left</span>
              <span className="font-serif font-bold text-[#b894e6] text-sm">{user?.classesRemaining ?? 6} Credits</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-white/50 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-[#b894e6]" /> Hold near studio check-in kiosk on arrival
        </p>
      </div>
    </div>
  );
};
