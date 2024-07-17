import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
const SideBar = ({ list }) => {
  const navigate = useNavigate();

  const Display = list.map((el) => (
    <div>
      {el.nested ? (
        <ul key={el.id}>
          <NavLink
            to={el.path}
            className={({ isActive }) =>
              isActive ? "underline font-bold " : ""
            }
            key={el.id}
          >
            {el.name}
          </NavLink>
          {el.nestedList.map((ele) => (
            <ul>
              <NavLink
                to={ele.path}
                className={({ isActive }) => (isActive ? "underline  " : "")}
                key={ele.id}
              >
                {ele.name}
              </NavLink>
            </ul>
          ))}
        </ul>
      ) : (
        <li key={el.id} className="">
          {el.name}
        </li>
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
