import React from "react";

import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button"; // Adjust the import according to your file structure

const SideBar = ({ list }) => {
  const navigate = useNavigate();

  const Display = list.map((el) => (
    <div key={el.id}>
      {el.nested ? (
        <ul>
          <NavLink
            to={el.path}
            className={({ isActive }) =>
              isActive ? "underline font-bold" : ""
            }
          >
            {el.name}
          </NavLink>
          {el.nestedList.map((ele) => (
            <li key={ele.id}>
              <NavLink
                to={ele.path}
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                {ele.name}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          {el.name}
        </NavLink>
      )}
    </div>
  ));

  return (
    <div className="bg-gray-500 w-1/5 h-[80vh]">
      {Display}
      <Button
        func={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          navigate("/");
        }}
      >
        LogOut
      </Button>
    </div>
  );
};

export default SideBar;
