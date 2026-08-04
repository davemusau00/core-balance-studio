import { useState } from 'react';

export interface ClassCommissionDetail {
  title: string;
  date: string;
  clients: number;
  baseEarned: number;
  bonusEarned: number;
  totalEarned: number;
}

export interface InstructorPayrollItem {
  id: string;
  name: string;
  avatar: string;
  title: string;
  phone: string;
  baseRate: number;
  bonusPerHead: number;
  threshold: number;
  classes: ClassCommissionDetail[];
  status: 'pending' | 'approved' | 'paid';
  transactionRef?: string;
  paidAt?: string;
}

const INITIAL_PAYROLL: InstructorPayrollItem[] = [
  {
    id: 'i1', name: 'Amara Osei', title: 'Senior Pilates Instructor', phone: '0712345678',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80',
    baseRate: 3500, bonusPerHead: 150, threshold: 6, status: 'pending',
    classes: [
      { title: 'Reformer Flow', date: 'Aug 4', clients: 10, baseEarned: 3500, bonusEarned: 600, totalEarned: 4100 },
      { title: 'Mat Pilates', date: 'Aug 3', clients: 8, baseEarned: 3500, bonusEarned: 300, totalEarned: 3800 },
      { title: 'Reformer Flow', date: 'Aug 1', clients: 12, baseEarned: 3500, bonusEarned: 900, totalEarned: 4400 },
    ],
  },
  {
    id: 'i2', name: 'Dr. Siti Rahmat', title: 'Clinical Specialist', phone: '0722987654',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80',
    baseRate: 5000, bonusPerHead: 200, threshold: 4, status: 'approved',
    classes: [
      { title: 'Clinical Assessment', date: 'Aug 5', clients: 4, baseEarned: 5000, bonusEarned: 0, totalEarned: 5000 },
      { title: 'Clinical Pilates', date: 'Aug 2', clients: 6, baseEarned: 5000, bonusEarned: 400, totalEarned: 5400 },
    ],
  },
  {
    id: 'i3', name: 'Marcus Ferreira', title: 'Stretch & Mobility Coach', phone: '0733456789',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80',
    baseRate: 2800, bonusPerHead: 120, threshold: 5, status: 'paid',
    transactionRef: 'B2C-994812', paidAt: 'Aug 4, 08:30 AM',
    classes: [
      { title: 'Stretch Therapy', date: 'Aug 4', clients: 8, baseEarned: 2800, bonusEarned: 360, totalEarned: 3160 },
      { title: 'Stretch Therapy', date: 'Aug 2', clients: 7, baseEarned: 2800, bonusEarned: 240, totalEarned: 3040 },
    ],
  },
];

export const usePayroll = () => {
  const [payroll, setPayroll] = useState<InstructorPayrollItem[]>(INITIAL_PAYROLL);

  const approveInstructor = (id: string) => {
    setPayroll(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };

  const payoutInstructor = (id: string) => {
    const ref = `B2C-${Math.floor(100000 + Math.random() * 900000)}`;
    setPayroll(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'paid', transactionRef: ref, paidAt: 'Just now' } : p
    ));
    return ref;
  };

  const batchPayoutApproved = () => {
    const refs: Record<string, string> = {};
    setPayroll(prev => prev.map(p => {
      if (p.status === 'approved') {
        const ref = `B2C-${Math.floor(100000 + Math.random() * 900000)}`;
        refs[p.id] = ref;
        return { ...p, status: 'paid', transactionRef: ref, paidAt: 'Just now' };
      }
      return p;
    }));
    return refs;
  };

  return {
    payroll,
    approveInstructor,
    payoutInstructor,
    batchPayoutApproved,
  };
};
