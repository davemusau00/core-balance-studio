import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastInfo, clearToast } = useApp();

  if (!toastInfo) return null;

  const { title, message, type = 'success' } = toastInfo;

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-[#6b4cc6]" />,
    info: <Info className="w-6 h-6 text-[#4f72c7]" />,
    warning: <AlertTriangle className="w-6 h-6 text-[#d97706]" />
  };

  const bgStyles = {
    success: 'bg-white border-[#d3c2f0]',
    info: 'bg-white border-blue-200',
    warning: 'bg-white border-amber-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-2xl border shadow-xl flex items-start gap-3.5 ${bgStyles[type]}`}>
        <div className="p-2 rounded-xl bg-[#f4f0fb] flex-shrink-0">
          {icons[type]}
        </div>
        
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-semibold text-sm text-[#1c1c2b]">{title}</h4>
          <p className="text-xs text-[#6b7280] mt-0.5 leading-relaxed">{message}</p>
        </div>

        <button
          onClick={clearToast}
          className="text-[#9ca3af] hover:text-[#1c1c2b] p-1 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
