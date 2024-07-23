import React from "react";
import { motion } from "framer-motion";
const Message = ({ message, variable }) => {
  return (
    <div>
      {!variable ? (
        <motion.h4
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            duration: 1,
          }}
          className="text-red-900 font-semibold text-[9px] w-[80%] bg-white dark:bg-black dark:text-white text-center absolute top-[5px]  rounded-sm left-7"
        >
          {message}
        </motion.h4>
      ) : null}
    </div>
  );
};

export default Message;
