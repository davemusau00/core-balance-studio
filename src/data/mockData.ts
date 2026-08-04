import { Instructor, ClassSession, PackageOption, ClientProfile, SavedProgram, ActivityItem, WaitlistEntry } from '../types';

export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: 'inst_wambui',
    name: 'Wambui M.',
    title: 'Clinical Pilates Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    specialties: ['Clinical Pilates', 'Reformer Foundations', 'Post-injury Rehab'],
    experienceYears: 12,
    classesLedCount: 1420,
    rating: 4.98,
    bio: 'Pioneer in clinical movement and reformer alignment with over 12 years of helping clients regain movement precision and effortless posture.'
  },
  {
    id: 'inst_logan',
    name: 'Logan N.',
    title: 'Reformer & Movement Coach',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    specialties: ['Athletic Reformer', 'Jumpboard Cardio', 'Strength & Sculpt'],
    experienceYears: 8,
    classesLedCount: 980,
    rating: 4.95,
    bio: 'Dynamic reformer specialist focusing on core power, athletic strength, and high-energy low-impact endurance flow.'
  },
  {
    id: 'inst_tami',
    name: 'Tami K.',
    title: 'Stretch & Mobility Expert',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    specialties: ['Trapeze Yoga', 'Mobility Flow', 'Flexibility Training'],
    experienceYears: 6,
    classesLedCount: 750,
    rating: 4.96,
    bio: 'Focuses on decompression, aerial spinal length, and restoring deep mobility for stressed urban bodies.'
  },
  {
    id: 'inst_gloria',
    name: 'Gloria M.',
    title: 'Clinical Pilates Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300',
    specialties: ['Reformer Flow', 'Spinal Health', 'Postural Realignment'],
    experienceYears: 9,
    classesLedCount: 1200,
    rating: 5.0,
    bio: 'Master instructor leading signature reformer classes. Flow with control, build deep strength, and align your posture.'
  },
  {
    id: 'inst_faith',
    name: 'Faith W.',
    title: 'Yoga & Mindfulness Coach',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    specialties: ['Mindful Movement', 'Trapeze Yoga', 'Breathwork'],
    experienceYears: 5,
    classesLedCount: 610,
    rating: 4.92,
    bio: 'Passionate about integrating mindful breathing with restorative posture flows to leave you calm, light, and renewed.'
  }
];

export const MOCK_PACKAGES: PackageOption[] = [
  {
    id: 'pkg_single',
    name: 'Single Class',
    classCount: 1,
    validityDays: 30,
    priceKES: 2500,
    description: 'Valid for 1 class session. Perfect for trying out a new instructor or drop-in visits.'
  },
  {
    id: 'pkg_5',
    name: '5 Class Pack',
    classCount: 5,
    validityDays: 60,
    priceKES: 11000,
    savingsPercent: 12,
    description: 'Valid for 60 days across all Reformer, Clinical, and Stretch classes.'
  },
  {
    id: 'pkg_10',
    name: '10 Class Pack',
    classCount: 10,
    validityDays: 90,
    priceKES: 20000,
    savingsPercent: 20,
    isBestValue: true,
    badgeText: 'BEST VALUE',
    description: 'Our most popular pack! Valid for 90 days. KES 2,000 per session.'
  },
  {
    id: 'pkg_unlimited',
    name: 'Monthly Core Membership',
    classCount: null,
    validityDays: 30,
    priceKES: 32000,
    badgeText: 'UNLIMITED',
    description: 'Unlimited access to all daily reformer & wellness classes + priority waitlist access.'
  }
];

// Helper to generate schedule days
export const SCHEDULE_DAYS = [
  { key: '2026-05-13', label: 'Tue 13 May', shortDay: 'Tue', dateNum: '13' },
  { key: '2026-05-14', label: 'Wed 14 May', shortDay: 'Wed', dateNum: '14' },
  { key: '2026-05-15', label: 'Thu 15 May', shortDay: 'Thu', dateNum: '15' },
  { key: '2026-05-16', label: 'Fri 16 May', shortDay: 'Fri', dateNum: '16' },
  { key: '2026-05-17', label: 'Sat 17 May', shortDay: 'Sat', dateNum: '17' }
];

export const INITIAL_CLASS_SESSIONS: ClassSession[] = [
  {
    id: 'session_1',
    title: 'Reformer Pilates',
    slug: 'reformer-pilates',
    category: 'classic',
    serviceType: 'Reformer Pilates',
    instructor: MOCK_INSTRUCTORS[0], // Wambui M.
    startTime: '07:00 AM',
    endTime: '08:00 AM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 60,
    difficulty: 'Intermediate',
    priceKES: 2200,
    capacity: 12,
    bookedCount: 9,
    waitlistCount: 0,
    status: 'few-spots',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Flow with control. Build strength, improve posture, and feel amazing in this signature Reformer class.',
    benefits: [
      'Improve posture & alignment',
      'Build lean strength',
      'Enhance core & mobility'
    ]
  },
  {
    id: 'session_2',
    title: 'Stretch Therapy',
    slug: 'stretch-therapy',
    category: 'therapy',
    serviceType: 'Stretch Therapy',
    instructor: MOCK_INSTRUCTORS[1], // Logan N.
    startTime: '08:30 AM',
    endTime: '09:30 AM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 60,
    difficulty: 'All Levels',
    priceKES: 2000,
    capacity: 12,
    bookedCount: 7,
    waitlistCount: 0,
    status: 'available',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Targeted myofascial release and guided assisted stretches to relieve tension in neck, shoulders, and hips.',
    benefits: [
      'Relieve joint stiffness',
      'Deep spinal decompression',
      'Accelerate muscle recovery'
    ]
  },
  {
    id: 'session_3',
    title: 'Trapeze Yoga',
    slug: 'trapeze-yoga',
    category: 'classic',
    serviceType: 'Trapeze Yoga',
    instructor: MOCK_INSTRUCTORS[2], // Tami K.
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 60,
    difficulty: 'All Levels',
    priceKES: 2300,
    capacity: 10,
    bookedCount: 8,
    waitlistCount: 0,
    status: 'few-spots',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Suspended sling technique for passive spinal inversion, shoulder opening, and upper body functional strength.',
    benefits: [
      'Relieve back compressed nerves',
      'Boost grip & posterior chain',
      'Fun suspended movement'
    ]
  },
  {
    id: 'session_4',
    title: 'Mat Pilates',
    slug: 'mat-pilates',
    category: 'classic',
    serviceType: 'Reformer Pilates',
    instructor: MOCK_INSTRUCTORS[0], // Wambui M.
    startTime: '11:30 AM',
    endTime: '12:20 PM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 50,
    difficulty: 'Beginner',
    priceKES: 1600,
    capacity: 15,
    bookedCount: 7,
    waitlistCount: 0,
    status: 'available',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Essential matwork focusing on breath connection, pelvic stability, and foundational core control.',
    benefits: [
      'Master deep core activation',
      'Gentle on joints',
      'Build core stamina'
    ]
  },
  {
    id: 'session_5',
    title: 'Jumpboard Reformer Pilates',
    slug: 'jumpboard-reformer',
    category: 'power',
    serviceType: 'Reformer Pilates',
    instructor: MOCK_INSTRUCTORS[1], // Logan N.
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 60,
    difficulty: 'Intermediate',
    priceKES: 2500,
    capacity: 10,
    bookedCount: 6,
    waitlistCount: 0,
    status: 'available',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Cardio-infused reformer session utilizing the jumpboard attachment for low-impact bone density building.',
    benefits: [
      'High calorie burn low impact',
      'Build plyometric power',
      'Sculpt core and legs'
    ]
  },
  {
    id: 'session_6',
    title: 'Reformer Mobility Flow',
    slug: 'reformer-mobility-flow',
    category: 'therapy',
    serviceType: 'Clinical Pilates',
    instructor: MOCK_INSTRUCTORS[2], // Tami K.
    startTime: '02:30 PM',
    endTime: '03:30 PM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 60,
    difficulty: 'All Levels',
    priceKES: 2200,
    capacity: 10,
    bookedCount: 9,
    waitlistCount: 1,
    status: 'few-spots',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Slow fluid reformer movements designed to unblock tight fascia and restore smooth articular range.',
    benefits: [
      'Improve joint fluidity',
      'Soothe tense lower back',
      'Enhance posture alignment'
    ]
  },
  {
    id: 'session_7',
    title: 'Strength & Sculpt Pilates',
    slug: 'strength-sculpt-pilates',
    category: 'sculpt',
    serviceType: 'Strength & Sculpt',
    instructor: MOCK_INSTRUCTORS[1], // Logan N.
    startTime: '04:00 PM',
    endTime: '04:50 PM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 50,
    difficulty: 'Intermediate',
    priceKES: 2400,
    capacity: 12,
    bookedCount: 6,
    waitlistCount: 0,
    status: 'available',
    location: 'Core Balance Studio, Nairobi West',
    description: 'Resistive spring work combined with hand weights and resistance rings for full-body tone.',
    benefits: [
      'Sculpt arms and shoulders',
      'Tone glutes & hamstrings',
      'Increase metabolic burn'
    ]
  },
  {
    id: 'session_8',
    title: 'Tower Reformer Pilates',
    slug: 'tower-reformer-pilates',
    category: 'advanced',
    serviceType: 'Reformer Pilates',
    instructor: MOCK_INSTRUCTORS[0], // Wambui M.
    startTime: '05:30 PM',
    endTime: '06:30 PM',
    date: '2026-05-14',
    dayLabel: 'Wed 14 May',
    durationMinutes: 60,
    difficulty: 'Advanced',
    priceKES: 2600,
    capacity: 10,
    bookedCount: 10,
    waitlistCount: 3,
    status: 'full',
    location: 'Core Balance Studio, Nairobi West',
    description: 'High-level precision springs, push-through bar, and rollback bar challenge for experienced practitioners.',
    benefits: [
      'Peak athletic stability',
      'Deep resistance challenge',
      'Ultimate full-body mastery'
    ]
  }
];

export const INITIAL_CLIENT_PROFILE: ClientProfile = {
  id: 'client_wambui',
  name: 'Wambui',
  email: 'wambui@example.com',
  phone: '+254 712 345 678',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  classesRemaining: 8,
  totalClassesPurchased: 12,
  membershipName: 'Core Membership',
  membershipStatus: 'ACTIVE',
  membershipRenewalDate: '20 Jun 2025',
  currentStreakWeeks: 6,
  classesThisMonth: 6,
  upcomingBooking: {
    id: 'bk_upcoming_1',
    classTitle: 'Reformer Pilates',
    dateLabel: 'FRI 23 MAY',
    time: '07:00 AM',
    durationMinutes: 60,
    instructorName: 'Logan N.',
    location: 'Core Balance Studio, Nairobi',
    category: 'classic'
  }
};

export const SAVED_PROGRAMS: SavedProgram[] = [
  {
    id: 'prog_1',
    title: 'Reformer Foundations',
    sessionsCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400',
    level: 'Beginner'
  },
  {
    id: 'prog_2',
    title: 'Mobility & Flow',
    sessionsCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    level: 'All Levels'
  },
  {
    id: 'prog_3',
    title: 'Strength & Sculpt',
    sessionsCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=400',
    level: 'Intermediate'
  },
  {
    id: 'prog_4',
    title: 'Spinal Health & Posture',
    sessionsCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=400',
    level: 'Clinical'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_1',
    type: 'attendance',
    title: 'Attended Reformer Pilates',
    subtitle: 'Logan N. · 16 May 2025',
    timestamp: '2 days ago',
    statusBadge: 'Great session! ☆'
  },
  {
    id: 'act_2',
    type: 'purchase',
    title: 'Purchased 12 Class Pack',
    subtitle: '12 May 2025 · KES 20,000',
    timestamp: '6 days ago',
    statusBadge: 'Payment complete'
  },
  {
    id: 'act_3',
    type: 'booking',
    title: 'Booked Reformer Mobility Flow',
    subtitle: 'Tami K. · 08 May 2025',
    timestamp: '10 days ago',
    statusBadge: 'Completed'
  }
];

export const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: 'wl_1',
    clientName: 'Sarah K.',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    classTitle: 'Reformer Pilates',
    dateLabel: 'May 18',
    time: '7:00 AM',
    requestedAt: '10 mins ago',
    status: 'pending'
  },
  {
    id: 'wl_2',
    clientName: 'James M.',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    classTitle: 'Stretch Therapy',
    dateLabel: 'May 18',
    time: '8:30 AM',
    requestedAt: '25 mins ago',
    status: 'pending'
  },
  {
    id: 'wl_3',
    clientName: 'Nina L.',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    classTitle: 'Trapeze Yoga',
    dateLabel: 'May 18',
    time: '10:00 AM',
    requestedAt: '1 hour ago',
    status: 'pending'
  },
  {
    id: 'wl_4',
    clientName: 'David O.',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    classTitle: 'Clinical Pilates',
    dateLabel: 'May 18',
    time: '12:00 PM',
    requestedAt: '2 hours ago',
    status: 'pending'
  }
];
