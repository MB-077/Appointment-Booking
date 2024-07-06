import React from "react";
import { motion } from "framer-motion";
const Toggle = () => {
  const [move, setMove] = React.useState(false);
  const handleClick = () => {
    setMove(!move);
  };
  return (
    <div>
      <div className="w-14 h-7 flex items-center rounded-[15px] bg-red-400">
        <motion.div
          className="w-5 h-5 mx-1 rounded-full bg-white"
          animate={move ? { x: "27px" } : {}}
          onClick={handleClick}
        ></motion.div>
      </div>
    </div>
  );
};

export default Toggle;
