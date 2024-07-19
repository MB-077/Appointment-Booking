import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
const Box = ({ text, button, path, header }) => {
  return (
    <div className="p-6 bg-n-8/30 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-n-5">{header}</h2>
      <p className="mt-4 text-white/50">{text}</p>
      <NavLink to={path} className="mt-4 inline-block ">
        <Button
          className={`bg-n-1 text-white py-1 px-4 rounded-lg hover:bg-blue-900`}
        >
          {button}
        </Button>
      </NavLink>
    </div>
  );
};

export default Box;
