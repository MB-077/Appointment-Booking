import React from "react";

const Button = ({ children, loginBtn }) => {
  return (
    <div>
      <button className="bg-blue-500" onClick={loginBtn}>
        {children}
      </button>
    </div>
  );
};

export default Button;
