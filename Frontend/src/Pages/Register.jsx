import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [change, setChange] = React.useState({
    username: "",
    mobileNo: "",
    email: "",
    password: "",
    passwordConfirm: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e)=>{
setChange((prev)=>{
{...prev,
[e.target.type] : e.target.value,}
})
  }
  return (
    <div
      id="hideMeagain2"
      onClick={handleMe}
      className="absolute backdrop-blur-md w-full top-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2 }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] top-[40%] w-96 h-36 bg-red-200"
      >
        <div>
          {" "}
          <form onClick={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="email" placeholder="email" onChange={handleChange} />
            </div>
            <div>
              <input
                type="number"
                placeholder="number"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password confirmation"
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
