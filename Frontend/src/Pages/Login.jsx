import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const Navigate = useNavigate();
  const [change, setChange] = React.useState({
    username: "",
    password: "",
  });

  const handleMe = (e) => {
    e.target.id === "hideMeagain" ? Navigate(-1) : null;
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleDown);
  }, []);

  const handleDown = (e) => {
    e.key === "Escape" ? Navigate(-1) : null;
  };

  const handleChange = (e) => {
    setChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const postData = async () => {
    const response = await axios.post("http://127.0.0.1:8000/login/", change);
    console.log(response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div
      id="hideMeagain"
      onClick={handleMe}
      className="absolute backdrop-blur-md backdrop-brightness-50 w-full top-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] top-0 w-96 h-36 bg-red-200"
      >
        <div className="">
          {" "}
          <form onClick={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="button">Log In</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
