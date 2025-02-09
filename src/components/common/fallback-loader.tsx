import LoadingSkeleton from '@/components/common/skeleton-loader';
import React from 'react';


const SuspenseFallbackLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 min-h-screen px-4 w-full">
      <LoadingSkeleton width="80%" height={30} variant="text" />
      <div className="w-full space-y flex flex-col justify-center items-center">
        <LoadingSkeleton width="90%" height={200} variant="rectangular" />
        <LoadingSkeleton width="90%" height={200} variant="rectangular" />
        <LoadingSkeleton width="90%" height={200} variant="rectangular" />
      </div>
    </div>
  );
};

export default SuspenseFallbackLoader;
