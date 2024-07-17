import React from "react";

const Button = ({ children, func, className, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={`bg-blue-500 ${className} hover:bg-blue-900 hover:text-white transition-all p-2 rounded-lg`}
        onClick={func}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
