import React from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink, useLocation, Link } from "react-router-dom";
import Button from "./Button";
import { CiLogout } from "react-icons/ci";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";

const ButtonsCombined = ({ token, func, open, hideComponent }) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        func={() => {
          if (!token) navigate("/login");
          else {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate("/");
          }
        }}
        className={` text-[16.5px] btnBlue`}
      >
        {open || hideComponent ? (
          <div className="xl:w-[180px] lg:w-[160px] md:w-[140px] sm:w-[135px] xs:w-[115px]">
            {token ? "Logout" : "Login"}
          </div>
        ) : (
          <CiLogout className="text-[20px]" />
        )}
      </Button>
      <Button func={func} className={`btnBlue`}>
        {open ? (
          <RiMenuUnfold2Line className={`text-[20px] `} />
        ) : (
          <RiMenuUnfoldLine className={`text-[20px] `} />
        )}
      </Button>
    </>
  );
};

const DisplayContent = ({ list, open, hideComponent }) => {
  const Display = list.map((el) => (
    <div key={el.id}>
      <li className="list-none h-12 flex m-2 dark:text-black">
        <NavLink
          to={el.path}
          className={({ isActive }) =>
            isActive
              ? "bg-n-5 SideD"
              : " text-white SideD bg-transparent dark:text-black"
          }
        >
          {open || hideComponent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {el.name}
            </motion.div>
          ) : (
            <div className="text-[20px] flexR"> {el.icon}</div>
          )}
        </NavLink>
      </li>
    </div>
  ));
  return Display;
};

const SideBar = ({ list }) => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(true);

  const AnimateMe = () => {
    setOpen(!open);
  };
  const location = useLocation();
  const hideComponent = location.pathname === "/profile";

  return (
    <motion.div
      className={`bg-n-11 h-[81vh] rounded-lg overflow-hidden relative dark:bg-white `}
      animate={
        open || hideComponent
          ? { width: ["70px", "300px", "350px"] }
          : { width: ["50px", "60px", "70px"] }
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={`transition-all duration-500 ease-in-out`}>
        <DisplayContent list={list} hideComponent={hideComponent} open={open} />
      </div>
      <div
        className={`${
          open || hideComponent ? "flexR" : "flexC"
        } gap-2 absolute bottom-10 ml-1`}
      >
        <ButtonsCombined
          token={token}
          func={AnimateMe}
          open={open}
          hideComponent={hideComponent}
        />
      </div>
    </motion.div>
  );
};

export default SideBar;
