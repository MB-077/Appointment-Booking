import React from "react";
import { motion } from "framer-motion";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export function loginloaders({ request }) {
  return new URL(request.url).searchParams.get("message");
}

const Login = () => {
  const url = useLoaderData();
  const Navigate = useNavigate();
  const [change, setChange] = React.useState({
    username: "",
    password: "",
  });

  const handleMe = (e) => {
    e.target.id === "hideMeagain" ? Navigate("/") : null;
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleDown);
  }, []);

  const handleDown = (e) => {
    e.key === "Escape" ? Navigate("/") : null;
  };

  const handleChange = (e) => {
    setChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const postData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", change);
      console.log("Success:", response.data, response);
      localStorage.setItem("token", response.data.token);
      Navigate("/");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
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
        {url ? <h2>{url}</h2> : null}
        {/* {message ? <h2>{message}</h2> : null} */}
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
                autoComplete="username"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="button">Log In</button>
            </div>
          </form>
        </div>
        <h6>registered user?</h6>
        <Link to="/register">
          <button>Register Now</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
