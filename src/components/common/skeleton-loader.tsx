import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'wave' | 'pulse' | false;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = 100,
  variant = 'rectangular',
  animation = 'wave',
  className = '',
}) => {
  return (
    <Skeleton
      width={width}
      height={height}
      variant={variant}
      animation={animation}
      className={className}
    />
  );
};

export default LoadingSkeleton;
