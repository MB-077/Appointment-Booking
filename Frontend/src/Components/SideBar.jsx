import React from "react";
import { NavLink } from "react-router-dom";
const SideBar = ({ list }) => {
  console.log(list);
  const Display = list.map((el) => (
    <NavLink
      to={el.path}
      className={({ isActive }) => (isActive ? "underline font-bold" : "")}
    >
      <li key={el.id}>{el.name}</li>
    </NavLink>
  ));
  return <div>{Display}</div>;
};

export default SideBar;
