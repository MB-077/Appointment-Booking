import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
const Box = ({ text, button, path, header, paragraph }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      className="relative p-6 bg-n-8/30 shadow-lg h-48 flex flex-col justify-center items-center gap-3 rounded-lg overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.h2
        className="text-2xl font-semibold text-pink-500"
        animate={hovered ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {header}
      </motion.h2>
      <motion.p
        className="mt-4 text-white/50"
        animate={hovered ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.p>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-n-8/80 bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavLink to={path} className="mb-2">
              <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-900">
                {button}
              </Button>
            </NavLink>
            <motion.p
              className="text-white/50 text-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {paragraph}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Box;
