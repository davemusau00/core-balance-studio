import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 bg-[length:200%_100%] rounded-xl ${className}`} />
);

export const ClassCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-[#e5e2eb] p-4 space-y-3">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-20 rounded-xl" />
    </div>
  </div>
);

export const InstructorCardSkeleton: React.FC = () => (
  <div className="bg-white border border-[#e5e2eb] rounded-3xl p-5 space-y-3">
    <Skeleton className="w-20 h-20 rounded-full mx-auto" />
    <Skeleton className="h-4 w-2/3 rounded-lg mx-auto" />
    <Skeleton className="h-3 w-1/2 rounded-lg mx-auto" />
    <Skeleton className="h-3 w-3/4 rounded-lg mx-auto" />
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-6 pb-24">
    <Skeleton className="h-32 w-full rounded-3xl" />
    <Skeleton className="h-24 w-full rounded-3xl" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-28 rounded-3xl" />
      <Skeleton className="h-28 rounded-3xl" />
    </div>
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => <ClassCardSkeleton key={i} />)}
    </div>
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-6 pb-24 pt-4 px-4">
    <Skeleton className="h-8 w-48 rounded-xl" />
    <Skeleton className="h-4 w-72 rounded-lg" />
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => <ClassCardSkeleton key={i} />)}
    </div>
  </div>
);
