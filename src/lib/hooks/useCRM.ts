import { useState } from 'react';

export type LifecycleStage = 'lead' | 'trial' | 'active' | 'vip' | 'at_risk' | 'churned';

export interface CRMInteraction {
  id: string;
  timestamp: string;
  type: 'whatsapp' | 'call' | 'email' | 'clinical_note';
  author: string;
  content: string;
}

export interface CRMClient {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  lastClass: string;
  totalClasses: number;
  ltv: number;
  stage: LifecycleStage;
  daysInactive: number;
  membershipName: string;
  injuryNotes?: string;
  interactions: CRMInteraction[];
}

const INITIAL_CLIENTS: CRMClient[] = [
  {
    id: 'c1', name: 'Wambui Njeri', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80',
    email: 'wambui@example.com', phone: '+254 712 345 678', lastClass: '2 days ago', totalClasses: 64, ltv: 128000,
    stage: 'vip', daysInactive: 2, membershipName: 'Unlimited Monthly', injuryNotes: 'Lumbar disc herniation (L4-L5)',
    interactions: [
      { id: 'i1', timestamp: 'Aug 3, 2026', type: 'clinical_note', author: 'Amara Osei', content: 'Noticed tightness in hamstrings. Modified Reformer footbar height.' },
      { id: 'i2', timestamp: 'Jul 28, 2026', type: 'whatsapp', author: 'System', content: 'Sent VIP membership renewal confirmation.' },
    ],
  },
  {
    id: 'c2', name: 'Logan Mensah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80',
    email: 'logan@example.com', phone: '+254 722 987 654', lastClass: '18 days ago', totalClasses: 12, ltv: 26400,
    stage: 'at_risk', daysInactive: 18, membershipName: '10 Class Pack', injuryNotes: 'Right shoulder impingement',
    interactions: [
      { id: 'i3', timestamp: 'Jul 18, 2026', type: 'whatsapp', author: 'Front Desk', content: 'Automated At-Risk check-in sent.' },
    ],
  },
  {
    id: 'c3', name: 'Aisha Kamau', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80',
    email: 'aisha@example.com', phone: '+254 733 456 789', lastClass: '1 day ago', totalClasses: 31, ltv: 62000,
    stage: 'active', daysInactive: 1, membershipName: 'Unlimited Monthly',
    interactions: [],
  },
  {
    id: 'c4', name: 'Brian Otieno', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80',
    email: 'brian@example.com', phone: '+254 700 111 222', lastClass: '5 days ago', totalClasses: 5, ltv: 11000,
    stage: 'trial', daysInactive: 5, membershipName: '5 Class Pack',
    interactions: [],
  },
  {
    id: 'c5', name: 'Sarah Wanjiku', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80',
    email: 'sarah@example.com', phone: '+254 711 222 333', lastClass: '35 days ago', totalClasses: 3, ltv: 6600,
    stage: 'churned', daysInactive: 35, membershipName: 'None', injuryNotes: 'Prenatal Trimester 2',
    interactions: [],
  },
];

export const useCRM = () => {
  const [clients, setClients] = useState<CRMClient[]>(INITIAL_CLIENTS);

  const moveClientStage = (clientId: string, newStage: LifecycleStage) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const isReactivated = newStage === 'active' || newStage === 'vip';
        return {
          ...c,
          stage: newStage,
          daysInactive: isReactivated ? 0 : c.daysInactive,
          interactions: [
            {
              id: `int_${Date.now()}`,
              timestamp: 'Just now',
              type: 'whatsapp',
              author: 'Studio Admin',
              content: `Stage updated to ${newStage.toUpperCase()}`,
            },
            ...c.interactions,
          ],
        };
      }
      return c;
    }));
  };

  const addInteraction = (clientId: string, type: CRMInteraction['type'], content: string, author = 'Studio Admin') => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          interactions: [
            { id: `int_${Date.now()}`, timestamp: 'Just now', type, author, content },
            ...c.interactions,
          ],
        };
      }
      return c;
    }));
  };

  const updateInjuryNotes = (clientId: string, notes: string) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, injuryNotes: notes } : c));
  };

  return {
    clients,
    moveClientStage,
    addInteraction,
    updateInjuryNotes,
  };
};
