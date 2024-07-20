import React from "react";

const Button = ({ children, func, className, disabled, id }) => {
  return (
    <div>
      <button
        id={id}
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
