import React from "react";

const Button = ({ children, func }) => {
  return (
    <div>
      <button className="bg-blue-500" onClick={func}>
        {children}
      </button>
    </div>
  );
};

export default Button;
