import React from "react";
import { motion } from "framer-motion";

const InputFields = ({ label, type, icon, name, func, auto }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <div>
      <div className={`text-gray-600 text-[12px] relative top-4 `}>{icon}</div>
      <motion.label
        initial={{ color: "#9ca3af", fontSize: "10px" }}
        animate={{
          color: isFocused ? "#CE2D4F" : "#9ca3af",
          fontSize: isFocused ? "6px" : "10px",
        }}
        transition={{ type: "linear" }}
        className="absolute mx-6 pointer-events-none text-gray-500"
      >
        {label}
      </motion.label>

      <motion.input
        name={name}
        type={type}
        className="w-[180px] px-5 border-b-[1px] border-gray-300 outline-none bg-n-11 text-white text-[10px] focus:outline-none focus:bg-n-11 focus:text-white"
        initial={{ borderColor: "#d1d5db" }}
        animate={{ borderColor: isFocused ? "#CE2D4F" : "#d1d5db" }}
        transition={{ type: "spring", stiffness: 100 }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => (e.target.value ? null : setIsFocused(false))}
        onChange={func}
        autoComplete={auto}
      />
    </div>
  );
};

export default InputFields;
