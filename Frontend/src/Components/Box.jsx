import React from "react";
import { NavLink } from "react-router-dom";
const Box = ({ text, button, path, header }) => {
  return (
    <div className="p-6 bg-n-8/30 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-n-5">{header}</h2>
      <p className="mt-4 text-white/50">{text}</p>
      <NavLink
        to={path}
        className="mt-4  inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-900"
      >
        {button}
      </NavLink>
    </div>
  );
};

export default Box;
