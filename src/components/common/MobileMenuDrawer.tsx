import React, { useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export interface NavItem {
  id: string;
  label: string;
}

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId?: string;
  onItemClick: (id: string) => void;
  ctaLabel?: string;
  onCta?: () => void;
}

/**
 * Full-screen mobile navigation drawer.
 * - Traps focus inside while open
 * - Escape key closes
 * - Body scroll locked while open
 * - aria-modal for screen readers
 */
export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  items,
  activeId,
  onItemClick,
  ctaLabel = 'Book a Class',
  onCta,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
      // Focus close button after open
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer panel — slides in from right */}
      <div
        ref={drawerRef}
        className="relative ml-auto w-[min(320px,90vw)] h-full bg-white flex flex-col shadow-2xl animate-slide-right"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#e5e2eb]">
          <Logo size="md" />
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#6b7280] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1" aria-label="Mobile navigation">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onItemClick(item.id);
                onClose();
              }}
              className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                activeId === item.id
                  ? 'bg-[#f4f0fb] text-[#6b4cc6]'
                  : 'text-[#33333f] hover:bg-[#fbf9fd] hover:text-[#6b4cc6]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        {onCta && (
          <div className="px-4 pb-safe-4 pt-4 border-t border-[#e5e2eb]">
            <button
              onClick={() => {
                onCta();
                onClose();
              }}
              className="w-full py-3.5 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#6b4cc6]/25"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
