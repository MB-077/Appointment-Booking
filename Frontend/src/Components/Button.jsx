import React from "react";

const Button = ({ children, func, className, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={` ${className} hover:bg-gray-400 font-openSans hover:text-black transition-all px-4 py-2 rounded-lg`}
        onClick={func}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
