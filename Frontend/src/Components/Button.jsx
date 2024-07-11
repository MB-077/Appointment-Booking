import React from "react";

const Button = ({ children, func, className, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={`bg-blue-500 ${className}`}
        onClick={func}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
