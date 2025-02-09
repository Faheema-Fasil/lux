import React from "react";

const FieldPrice = ({ field, small }: { field: any, small?: boolean }) => {
  return (
    <div className={`bg-primary ${small ? "px-1 text-[10px]" : `px-3 py-1 text-xs `} rounded-full text-white`}>
      + AED {field?.price}
    </div>
  );
};

export default FieldPrice;

