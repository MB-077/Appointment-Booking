import { motion } from "framer-motion";
import React from "react";
const ConfirmCancel = ({ isVisible, func }) => {
  const popUpVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1050]">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popUpVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="h-[40vh] relative w-[35vw] bg-white rounded-md p-4 flex flex-col justify-center items-center shadow-lg z-[1100]">
              <div className="mb-8 text-xl">
                Do you really want to cancel it?
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 text-white px-3 w-[100px] h-[45px] py-1 rounded cursor-pointer"
                  onClick={() => func(true)}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 px-3 py-1 w-[100px] h-[45px] rounded cursor-pointer"
                  onClick={() => func(false)}
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ConfirmCancel;
