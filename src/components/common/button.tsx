import React from "react";

const Button = ({
  status,
  buttonText,
  hoverEffect = false,
  hoverPostition = 'left',
}: {
  status?: string;
  buttonText: string;
  hoverEffect?: boolean;
  hoverPostition?: 'left' | 'right';
}) => {
  return (
    <button
      type="submit"
      className={`w-full mt-5 ${hoverEffect ? `btn btn-${hoverPostition}` : ''} flex justify-center bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition`}
    >
      {status === "loading" ? (
        <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
      ) : (
        <span>{buttonText}</span>
      )}
    </button>
  );
};

export default Button;
