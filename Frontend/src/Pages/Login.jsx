import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dataContext from "../Context/contextProvider";
import InputFields from "../Components/InputFields";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";

export function loginloaders({ request }) {
  return new URL(request.url).searchParams.get("message");
}

const Login = () => {
  const { usersList, slotBookingList, DocAvailable } = useContext(dataContext);
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
    console.log(change);
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", change);
      console.log("Success:", response.data);
      const { token, ...userData } = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      usersList();
      slotBookingList();
      DocAvailable();
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
      className="absolute backdrop-blur-md backdrop-brightness-50 w-full top-0 left-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] -top-11 w-[280px] h-[41vh] bg-n-11 rounded-md"
      >
        {url ? (
          <h2 className="text-blacks text-[9px] relative top-3 flex justify-center items-center bg-white mx-5 rounded-sm py-1">
            {url}
          </h2>
        ) : null}
        {/* {message ? <h2>{message}</h2> : null} */}

        <div className="flex flex-col justify-center items-center h-full ">
          <h4 className="text-white text-[14px] relative -top-3">
            Welcome Back to <span className="text-n-5"> EasySlot</span>
          </h4>
          <span className="text-[7px] text-white/70 relative -top-2">
            Please enter your details to continue
          </span>
          <form onClick={handleSubmit}>
            <InputFields
              label={"username"}
              type={"text"}
              icon={<CiUser />}
              name={"username"}
              func={handleChange}
            />

            <InputFields
              label={"password"}
              type={"password"}
              icon={<RiLockPasswordLine />}
              func={handleChange}
              name={"password"}
            />

            {/* <div>
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
            </div> */}

            <button
              type="button"
              className="bg-n-1 mt-4 w-[100%] rounded-sm text-[10px] py-[3.5px] text-white hover:bg-blue-900"
            >
              Login
            </button>

            <button className="bg-white hover:bg-gray-500 mt-2 w-[100%] rounded-sm text-[10px] py-[3.5px] text-black flex justify-center items-center gap-2 font-semibold">
              <FaGoogle />
              Login using Google
            </button>
            <Link to="/register">
              <span className="text-[8px] text-white mt-2 hover:underline">
                New User? Register Here
              </span>
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
