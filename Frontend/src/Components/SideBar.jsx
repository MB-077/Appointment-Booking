import React from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button";
import { CiLogout } from "react-icons/ci";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";

const SideBar = ({ list, className }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const AnimateMe = () => {
    setOpen(!open);
  };

  const Display = list.map((el) => (
    <div key={el.id}>
      <li className="list-none h-12 flex m-2">
        <NavLink
          to={el.path}
          className={({ isActive }) =>
            isActive
              ? "bg-n-5 font-semibold rounded-md p-3 w-full "
              : " text-white font-semibold  rounded-md p-3 w-full  bg-transparent"
          }
        >
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {el.name}
            </motion.div>
          ) : (
            <div className="text-[20px] flex justify-center items-center ">
              {" "}
              {el.icon}
            </div>
          )}
        </NavLink>
      </li>
    </div>
  ));

  return (
    <motion.div
      className={`bg-n-11 h-[81vh] ${className} overflow-hidden relative`}
      animate={open ? { width: "350px" } : { width: "70px" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={`transition-all duration-500 ease-in-out `}>
        {Display}
      </div>
      <div
        className={`${
          open ? "flex" : "flex flex-col"
        } gap-2 absolute bottom-10 justify-around items-center ml-1`}
      >
        <Button
          func={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate("/");
          }}
          className={`bg-n-1 text-[16.5px] hover:bg-blue-900 transition-colors duration-300 text-white`}
        >
          {open ? (
            <div className="w-[180px]">Logout</div>
          ) : (
            <CiLogout className="text-[20px]" />
          )}
        </Button>
        <Button
          func={AnimateMe}
          className={`bg-n-1 hover:bg-blue-900 transition-colors duration-300 text-white`}
        >
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
