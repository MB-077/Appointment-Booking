import React from "react";
import { motion } from "framer-motion";
const Toggle = () => {
  const [move, setMove] = React.useState(false);
  const handleClick = () => {
    setMove(!move);
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className="w-10 h-5 flex items-center rounded-[15px] bg-n-5"
      >
        <motion.div
          className="w-3 h-3 mx-1 rounded-full bg-n-8"
          animate={move ? { x: "20px" } : {}}
          transition={{ type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Toggle;
