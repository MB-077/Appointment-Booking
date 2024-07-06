import React from "react";
import { NavLink } from "react-router-dom";
const SideBar = ({ list }) => {
  const Display = list.map((el) => (
    <NavLink
      to={el.path}
      className={({ isActive }) => (isActive ? "underline font-bold " : "")}
    >
      <li className="" key={el.id}>
        {el.name}
      </li>
    </NavLink>
  ));
  return <div className="bg-gray-500 w-1/5 h-[80vh]">{Display}</div>;
};

export default SideBar;
