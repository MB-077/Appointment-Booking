import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
const SideBar = ({ list }) => {
  const navigate = useNavigate();

  const Display = list.map((el) => (
    <NavLink
      to={el.path}
      className={({ isActive }) => (isActive ? "underline font-bold " : "")}
      key={el.id}
    >
      <li className="">{el.name}</li>
    </NavLink>
  ));
  return (
    <>
      <div className="bg-gray-500 w-1/5 h-[80vh]">
        {Display}
        <Button
          func={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          LogOut
        </Button>
      </div>
    </>
  );
};

export default SideBar;
