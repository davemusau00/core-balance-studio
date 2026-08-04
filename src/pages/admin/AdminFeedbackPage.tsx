import React, { useState } from 'react';
import { Star, MessageSquare, TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, Minus, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const NPS_TREND = [
  { week: 'W1 Jul', score: 62 },
  { week: 'W2 Jul', score: 68 },
  { week: 'W3 Jul', score: 71 },
  { week: 'W4 Jul', score: 74 },
  { week: 'W1 Aug', score: 78 },
];

const FEEDBACK = [
  { id: 'f1', client: 'Wambui N.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80', class: 'Reformer Flow', instructor: 'Amara Osei', date: 'Aug 5', classRating: 5, instructorRating: 5, nps: 10, comment: 'Amara is exceptional. The cues were specific and she noticed my alignment issues before I even felt them!', type: 'promoter' },
  { id: 'f2', client: 'Brian O.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80', class: 'Clinical Pilates', instructor: 'Dr. Siti Rahmat', date: 'Aug 5', classRating: 4, instructorRating: 5, nps: 9, comment: 'Very clinical and personalised. Would love a slightly longer cooldown.', type: 'promoter' },
  { id: 'f3', client: 'Logan M.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80', class: 'Stretch Therapy', instructor: 'Marcus Ferreira', date: 'Aug 4', classRating: 3, instructorRating: 3, nps: 6, comment: 'The session was decent but the room was quite warm. Also arrived 5 mins late.', type: 'passive' },
  { id: 'f4', client: 'Sarah W.', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80', class: 'Mat Pilates', instructor: 'Amara Osei', date: 'Aug 3', classRating: 2, instructorRating: 3, nps: 4, comment: 'The class felt overcrowded. Couldn\'t get proper correction. I felt like a number not a client.', type: 'detractor' },
  { id: 'f5', client: 'Emeka O.', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80', class: 'Reformer Flow', instructor: 'Amara Osei', date: 'Aug 3', classRating: 5, instructorRating: 5, nps: 10, comment: 'Consistent excellence. Core Balance is the best studio decision I\'ve made.', type: 'promoter' },
];

const typeConfig = {
  promoter: { label: 'Promoter', icon: ThumbsUp,   color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  passive:  { label: 'Passive',  icon: Minus,       color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200' },
  detractor:{ label: 'Detractor',icon: ThumbsDown,  color: 'text-rose-700',   bg: 'bg-rose-50',    border: 'border-rose-200' },
};

export const AdminFeedbackPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'promoter' | 'passive' | 'detractor'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const latestNPS = NPS_TREND[NPS_TREND.length - 1].score;
  const promoters = FEEDBACK.filter(f => f.type === 'promoter').length;
  const passives  = FEEDBACK.filter(f => f.type === 'passive').length;
  const detractors = FEEDBACK.filter(f => f.type === 'detractor').length;
  const total = FEEDBACK.length;

  const filtered = filter === 'all' ? FEEDBACK : FEEDBACK.filter(f => f.type === filter);

  return (
    <main className="p-4 sm:p-8 space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Feedback & NPS</h1>
        <p className="text-sm text-[#6b7280] mt-0.5">Post-class client satisfaction and Net Promoter Score tracking.</p>
      </div>

      {/* NPS Gauge + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Gauge */}
        <div className="bg-[#1c1c2b] text-white rounded-3xl p-6 text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#6b4cc6]/20 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Net Promoter Score</p>
          <div className="relative z-10">
            <span className="font-serif text-7xl font-bold text-[#b894e6]">{latestNPS}</span>
            <span className="text-white/60 text-lg">/100</span>
          </div>
          <div className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${latestNPS >= 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
            <TrendingUp className="w-3.5 h-3.5" /> +{latestNPS - NPS_TREND[0].score} pts vs 4 weeks ago · <strong>{latestNPS >= 70 ? 'Excellent' : 'Good'}</strong>
          </div>
          <div className="flex justify-center gap-4 text-xs pt-2 text-white/70">
            <div><ThumbsUp className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />{promoters} Promoters</div>
            <div><Minus className="w-3.5 h-3.5 text-amber-400 inline mr-1" />{passives} Passive</div>
            <div><ThumbsDown className="w-3.5 h-3.5 text-rose-400 inline mr-1" />{detractors} Detractor</div>
          </div>
        </div>

        {/* Trend chart */}
        <div className="lg:col-span-2 bg-white border border-[#e5e2eb] rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-[#1c1c2b] mb-4">NPS Weekly Trend</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={NPS_TREND} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#6b4cc6" strokeWidth={3} dot={{ fill: '#6b4cc6', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Promoter bar */}
          <div className="mt-4 h-3 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 transition-all" style={{ width: `${(promoters / total) * 100}%` }} />
            <div className="bg-amber-400 transition-all" style={{ width: `${(passives / total) * 100}%` }} />
            <div className="bg-rose-500 transition-all" style={{ width: `${(detractors / total) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-[#9ca3af] mt-1 font-medium">
            <span>Promoters {Math.round((promoters / total) * 100)}%</span>
            <span>Passive {Math.round((passives / total) * 100)}%</span>
            <span>Detractors {Math.round((detractors / total) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Feedback filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'promoter', 'passive', 'detractor'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all ${
              filter === f ? 'bg-[#6b4cc6] text-white border-[#6b4cc6]' : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'
            }`}
          >
            {f === 'all' ? 'All Reviews' : f}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#9ca3af] font-medium self-center">{filtered.length} reviews</span>
      </div>

      {/* Feedback cards */}
      <div className="space-y-3">
        {filtered.map(fb => {
          const tc = typeConfig[fb.type as keyof typeof typeConfig];
          const TypeIcon = tc.icon;
          const isExpanded = expanded === fb.id;
          return (
            <div key={fb.id} className={`bg-white border rounded-3xl overflow-hidden shadow-sm ${tc.border}`}>
              <button
                className="w-full text-left p-5 flex items-start gap-4"
                onClick={() => setExpanded(isExpanded ? null : fb.id)}
              >
                <img src={fb.avatar} alt={fb.client} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#1c1c2b]">{fb.client}</span>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>
                      <TypeIcon className="w-2.5 h-2.5" /> {tc.label}
                    </span>
                    <span className="text-[10px] text-[#9ca3af]">{fb.class} · {fb.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < fb.classRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 fill-neutral-200'}`} />
                    ))}
                    <span className="text-[10px] text-[#9ca3af] ml-1">Class · Instructor: {fb.instructorRating}/5 · NPS: {fb.nps}/10</span>
                  </div>
                  <p className="text-xs text-[#6b7280] line-clamp-1">"{fb.comment}"</p>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-1" />}
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-[#f4f0fb] pt-4 space-y-3">
                  <p className="text-sm text-[#33333f] italic">"{fb.comment}"</p>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#f4f0fb] text-[#6b4cc6] rounded-xl text-xs font-semibold hover:bg-[#e9e0f6] transition-colors">
                      <Reply className="w-3.5 h-3.5" /> Respond
                    </button>
                    {fb.type === 'detractor' && (
                      <button className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold border border-rose-200 hover:bg-rose-100 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" /> Escalate to Manager
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};
