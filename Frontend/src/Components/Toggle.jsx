import React, { useContext } from "react";
import { motion } from "framer-motion";
import dataContext from "../Context/contextProvider";

const Toggle = () => {
  const { darkMode, setDarkMode } = useContext(dataContext);
  const [move, setMove] = React.useState(false);

  const handleClick = () => {
    setMove(!move);
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="w-14 h-7 flex items-center rounded-[15px] bg-n-5 dark:bg-white xs-only:bg-n-8"
      >
        <motion.div
          className="w-5 h-5 mx-1 rounded-full bg-n-8 xs-only:bg-n-5"
          animate={move ? { x: "27px" } : {}}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Toggle;
