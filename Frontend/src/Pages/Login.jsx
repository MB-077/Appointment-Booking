import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();

  const handleMe = (e) => {
    e.target.id === "hideMeagain" ? Navigate(-1) : null;
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleDown);
  }, []);

  const handleDown = (e) => {
    e.key === "Escape" ? Navigate(-1) : null;
  };

  return (
    <div
      id="hideMeagain"
      onClick={handleMe}
      className="absolute backdrop-blur-md   w-full top-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] top-0 w-96 h-36 bg-red-200"
      >
        <div className="">
          {" "}
          <form>
            <div className="mb-4">
              <label>Username</label>
              <input type="text" placeholder="Username" />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <div className="flex items-center justify-between">
              <button type="button">Sign In</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
