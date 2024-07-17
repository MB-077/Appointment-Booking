import React from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button"; // Adjust the import according to your file structure
import { CiLogout } from "react-icons/ci";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";

const SideBar = ({ list, className }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const AnimateMe = () => {
    setTimeout(() => {
      setOpen(!open);
    }, 200);
  };

  const Display = list.map((el) => (
    <div key={el.id}>
      <li className="list-none">
        <NavLink
          id="navs"
          to={el.path}
          className={({ isActive }) =>
            isActive
              ? "bg-n-5 mx-2 py-3 font-semibold px-4 my-5 rounded-md flex justify-start items-center "
              : "flex justify-start items-center text-white my-5 mx-2 px-4   py-3 "
          }
        >
          {open ? el.name : <div className="text-[20px]"> {el.icon}</div>}
        </NavLink>
      </li>
    </div>
  ));

  return (
    <motion.div
      className={`bg-n-11 w-[320px] h-[84vh] ${className}`}
      animate={open ? { width: "320px" } : { width: "70px" }}
    >
      {Display}

      <div
        className={`${
          open ? "flex" : "flex flex-col"
        } gap-3 absolute bottom-10 justify-around items-center mx-2`}
      >
        <Button
          func={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate("/");
          }}
        >
          {open ? (
            <div className="w-[180px]">logout</div>
          ) : (
            <CiLogout className="text-[20px]" />
          )}
        </Button>
        <Button func={AnimateMe}>
          {!open ? (
            <RiMenuUnfoldLine className="text-[20px]" />
          ) : (
            <div>
              <RiMenuUnfold2Line className="text-[20px]" />
            </div>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default SideBar;
