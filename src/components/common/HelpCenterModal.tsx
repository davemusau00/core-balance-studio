import React, { useState } from 'react';
import { Search, X, BookOpen, HelpCircle, Video, FileText, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARTICLES = [
  { id: 'h1', title: 'How to mark Reformer Bed assignments', category: 'Instructor Guide', snippet: 'Open your class roster on the Instructor Portal, click any student name to reassign bed 01–12.', icon: BookOpen },
  { id: 'h2', title: 'M-Pesa B2C Payout Reconciliation', category: 'Admin Operations', snippet: 'Payouts are executed instantly via Safaricom B2C API. Verify transaction refs in /admin/payments.', icon: FileText },
  { id: 'h3', title: 'Managing At-Risk Churn Alerts', category: 'CRM & Retention', snippet: 'Clients inactive for >14 days are automatically flagged. Use 1-click WhatsApp win-back in /admin/crm.', icon: Sparkles },
  { id: 'h4', title: 'Equipment Maintenance Scheduling', category: 'Studio Assets', snippet: 'Schedule spring and carriage checks under /admin/inventory. Equipment gets flagged out-of-order.', icon: Video },
  { id: 'h5', title: 'Sub Coverage & Shift Swaps', category: 'Staff Rota', snippet: 'Instructors can request sub cover directly from their portal. Admins approve in /admin/rota.', icon: HelpCircle },
];

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof ARTICLES[0] | null>(null);

  if (!isOpen) return null;

  const filtered = ARTICLES.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.snippet.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-zoom-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e2eb] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f4f0fb] flex items-center justify-center text-[#6b4cc6]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">Core Balance Help Center</h3>
              <p className="text-xs text-[#6b7280]">Documentation, guides, and studio operating manuals.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help articles, M-Pesa, Reformer guides..."
            className="w-full pl-10 pr-4 py-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {selectedArticle ? (
            <div className="space-y-4 bg-[#fbf9fd] p-5 rounded-2xl border border-[#e5e2eb]">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-[#6b4cc6] hover:underline"
              >
                ← Back to all guides
              </button>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b4cc6] bg-[#f4f0fb] px-2.5 py-1 rounded-full block w-fit">
                {selectedArticle.category}
              </span>
              <h4 className="font-serif text-lg font-bold text-[#1c1c2b]">{selectedArticle.title}</h4>
              <p className="text-xs text-[#33333f] leading-relaxed">{selectedArticle.snippet}</p>
              <div className="pt-3 border-t border-[#e5e2eb] flex items-center justify-between text-xs text-[#6b7280]">
                <span>Was this article helpful?</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-[#e5e2eb] rounded-lg hover:border-[#6b4cc6]">Yes</button>
                  <button className="px-3 py-1 bg-white border border-[#e5e2eb] rounded-lg hover:border-[#6b4cc6]">No</button>
                </div>
              </div>
            </div>
          ) : (
            filtered.map(article => {
              const Icon = article.icon;
              return (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="w-full text-left p-4 bg-white border border-[#e5e2eb] rounded-2xl hover:border-[#6b4cc6] hover:bg-[#fbf9fd] transition-all flex items-start gap-3 shadow-sm group"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#f4f0fb] flex items-center justify-center text-[#6b4cc6] flex-shrink-0 group-hover:bg-[#6b4cc6] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#9ca3af]">{article.category}</span>
                    <h4 className="font-bold text-xs text-[#1c1c2b] group-hover:text-[#6b4cc6] transition-colors">{article.title}</h4>
                    <p className="text-[11px] text-[#6b7280] truncate mt-0.5">{article.snippet}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9ca3af] flex-shrink-0 self-center" />
                </button>
              );
            })
          )}
        </div>

        {/* Support Footer */}
        <div className="pt-3 border-t border-[#e5e2eb] flex items-center justify-between text-xs text-[#6b7280]">
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-[#6b4cc6]" /> Studio Support active
          </span>
          <a href="mailto:support@corebalance.co.ke" className="font-bold text-[#6b4cc6] hover:underline">
            Contact Engineering Team
          </a>
        </div>
      </div>
    </div>
  );
};
