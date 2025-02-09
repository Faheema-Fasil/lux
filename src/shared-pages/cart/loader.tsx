import LoadingSkeleton from '@/components/common/skeleton-loader';
import React from 'react';

const CartSkeleton = () => {
  return (
    <div className="gap-4 border-b mb-6 pb-3">
      <div className="flex gap-2 items-start">
        {/* Skeleton for image */}
        <div className="grid relative w-[200px] xl:w-[300px] h-[110px] m-3">
          <LoadingSkeleton width="200px" height="150px" />
        </div>

        {/* Skeleton for product details */}
        <div className="flex-1">
          <div className="mb-2">
            <LoadingSkeleton width="60%" height="20px" />
          </div>
          <div className="mb-2">
            <LoadingSkeleton width="50%" height="16px" />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <LoadingSkeleton width="100px" height="16px" />
            <LoadingSkeleton width="80px" height="16px" />
          </div>
        </div>

        {/* Skeleton for price details */}
        <div className="flex items-center">
          <div className="w-full flex flex-col items-end justify-between lg:justify-between lg:pt-0 lg:max-w-md">
            <LoadingSkeleton width="80px" height="20px" />
            <LoadingSkeleton width="50px" height="16px" />
            <LoadingSkeleton width="60px" height="16px" />
          </div>
        </div>
      </div>

      {/* Skeleton for delivery details */}
      {/* <div className="flex space-x-2 items-center lg:justify-end justify-between">
        <div className="flex-1 pt-2">
          <LoadingSkeleton width="60%" height="16px" />
          <LoadingSkeleton width="40%" height="16px" />
        </div>
      </div> */}

      {/* Skeleton for action buttons */}
      <div className="flex space-x-2 items-center lg:justify-end justify-between pt-3">
        <LoadingSkeleton width="80px" height="32px" />
        <LoadingSkeleton width="80px" height="32px" />
      </div>
    </div>
  );
};

export default CartSkeleton;
