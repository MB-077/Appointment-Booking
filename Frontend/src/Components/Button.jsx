import React from "react";

const Button = ({ children, func, className, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={` ${className}  font-openSans font-medium transition-all px-4 py-2 rounded-lg`}
        onClick={func}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
