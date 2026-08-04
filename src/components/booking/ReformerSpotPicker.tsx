import React from 'react';
import { Check, Sparkles } from 'lucide-react';

interface ReformerSpotPickerProps {
  totalCapacity?: number;
  occupiedSpots?: number[];
  selectedSpot: number | null;
  onSelectSpot: (spot: number) => void;
}

export const ReformerSpotPicker: React.FC<ReformerSpotPickerProps> = ({
  totalCapacity = 12,
  occupiedSpots = [2, 5, 8],
  selectedSpot,
  onSelectSpot,
}) => {
  const spots = Array.from({ length: totalCapacity }, (_, i) => i + 1);

  return (
    <div className="bg-[#1c1c2b] text-white rounded-3xl p-5 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#b894e6] flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Studio Floor Map
          </span>
          <h3 className="font-serif text-lg font-bold mt-0.5">Select Your Reformer Bed</h3>
        </div>
        <span className="text-xs text-white/60">Studio 1 · Front Mirror</span>
      </div>

      {/* Front of Studio Indicator */}
      <div className="w-full py-1 bg-white/5 rounded-xl text-center text-[10px] uppercase font-bold tracking-widest text-white/40 border border-white/5">
        ✦ Instructor & Front Mirrors ✦
      </div>

      {/* Grid of Reformer Beds */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 py-2">
        {spots.map((spotNum) => {
          const isOccupied = occupiedSpots.includes(spotNum);
          const isSelected = selectedSpot === spotNum;

          return (
            <button
              key={spotNum}
              type="button"
              disabled={isOccupied}
              onClick={() => onSelectSpot(spotNum)}
              className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border transition-all h-24 ${
                isOccupied
                  ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed'
                  : isSelected
                  ? 'bg-[#6b4cc6] border-[#b894e6] text-white ring-2 ring-[#b894e6]/50 shadow-lg scale-105'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-white/30'
              }`}
            >
              {/* Bed Icon/Indicator */}
              <div className="w-full flex items-center justify-between text-[10px] font-bold opacity-80">
                <span>BED</span>
                <span>#{spotNum < 10 ? `0${spotNum}` : spotNum}</span>
              </div>

              {/* Machine Representation */}
              <div className={`w-8 h-10 rounded-lg border-2 flex items-center justify-center transition-colors ${
                isOccupied
                  ? 'border-white/10 bg-white/5'
                  : isSelected
                  ? 'border-white bg-white/20'
                  : 'border-white/30 bg-white/5'
              }`}>
                {isSelected ? (
                  <Check className="w-5 h-5 text-white" />
                ) : isOccupied ? (
                  <span className="text-[9px] font-bold text-white/20">TAKEN</span>
                ) : (
                  <div className="w-3 h-4 rounded bg-white/20" />
                )}
              </div>

              <span className="text-[9px] font-semibold tracking-wide">
                {isOccupied ? 'Reserved' : isSelected ? 'Selected' : 'Available'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-white/60 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[#6b4cc6] border border-[#b894e6]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-white/10 border border-white/20" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-white/5 border border-white/5" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};
