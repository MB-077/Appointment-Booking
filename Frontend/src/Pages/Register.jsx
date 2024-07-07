import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const Navigate = useNavigate();
  const [change, setChange] = React.useState({
    text: "",
    tel: "",
    email: "",
    password: "",
  });

  const handleMe = (e) => {
    e.target.id === "hideMeagain2" ? Navigate(-1) : null;
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleDown);
  }, []);

  const handleDown = (e) => {
    e.key === "Escape" ? Navigate(-1) : null;
  };

  //handling form change
  const handleChange = (e) => {
    setChange((prev) => ({
      ...prev,
      [e.target.type]: e.target.value,
    }));
  };

  //login posting data
  const postData = async () => {
    try {
      const response = await axios.post("", change);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };
  return (
    <div
      id="hideMeagain2"
      onClick={handleMe}
      className="absolute backdrop-blur-md w-full top-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] top-0 w-96 h-36 bg-red-200"
      >
        <div>
          {" "}
          <form onClick={handleSubmit}>
            <div>
              <input
                type="text"
                value={change.username}
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="email"
                value={change.email}
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                value={change.number}
                type="tel"
                placeholder="number"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                value={change.password}
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div>
              <button type="button">Sign In</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
