import React from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button"; // Adjust the import according to your file structure

const SideBar = ({ list, className }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const AnimateMe = () => {
    setOpen(!open);
  };
  const Display = list.map((el) => (
    <div key={el.id}>
      {el.nested ? (
        <ul>
          <NavLink
            to={el.path}
            className={({ isActive }) => (isActive ? "" : "text-white")}
          >
            {el.name}
          </NavLink>
          <div className="flex flex-col gap-4">
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
          </div>
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

  const DisplayIcon = list.map((el) => (
    <div key={el.id}>
      {el.nested ? (
        <ul>
          <NavLink
            to={el.path}
            className={({ isActive }) =>
              isActive ? "underline font-bold" : ""
            }
          >
            {el.icon}
          </NavLink>
          <div className="flex flex-col gap-5">
            {el.nestedList.map((ele) => (
              <li key={ele.id}>
                <NavLink
                  to={ele.path}
                  className={({ isActive }) => (isActive ? "underline" : "")}
                >
                  {ele.icon}
                </NavLink>
              </li>
            ))}
          </div>
        </ul>
      ) : (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          {el.icon}
        </NavLink>
      )}
    </div>
  ));

  return (
    <motion.div
      className={`bg-n-11 w-[320px] h-[84vh] ${className}`}
      animate={open ? { width: "320px" } : { width: "70px" }}
      transition={{ duration: 0.5 }}
    >
      {open ? (
        <div className="font-openSans text-[17px] text-n-7 flex flex-col gap-3">
          {Display}
        </div>
      ) : (
        <div className="flex flex-col gap-5 text-[30px] mt-5 items-center text-n-5">
          {DisplayIcon}
        </div>
      )}
      <Button
        func={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          navigate("/");
        }}
      >
        LogOut
      </Button>
      <Button func={AnimateMe}>Click me</Button>
    </motion.div>
  );
};

export default SideBar;
