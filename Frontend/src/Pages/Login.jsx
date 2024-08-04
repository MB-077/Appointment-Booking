import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import dataContext from "../Context/contextProvider";
import { InputFields, Message } from "../im-ex-ports";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";

export function loginloaders({ request }) {
  return new URL(request.url).searchParams.get("message");
}

const Login = () => {
  //urls and hooks
  const url = useLoaderData();
  const Navigate = useNavigate();
  const { usersList, slotBookingList, DocAvailable } = useContext(dataContext);
  const [change, setChange] = React.useState({
    username: "",
    password: "",
  });
  const [passwordCondition, setpasswordCondition] = React.useState(true);
  const [usernameCondition, setUsernameCondition] = React.useState(true);
  const [emptyCondition, setEmptyCondition] = React.useState(true);
  /////////////////////////////////////////////////////////////////

  // posting data
  const postData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", change);
      const { token, ...userData } = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      usersList();
      slotBookingList();
      DocAvailable();
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////////

  // all the functions
  const handleOut = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (change.username === "" || change.password === "") {
      setEmptyCondition(false);
      setTimeout(() => setEmptyCondition(true), 2000);
    } else if (change.password.length < 6) {
      setpasswordCondition(false);
      setTimeout(() => setpasswordCondition(true), 2000);
    } else if (change.username.length < 3) {
      setUsernameCondition(false);
      setTimeout(() => setUsernameCondition(true), 2000);
    } else {
      postData();
    }
  };

  //////////////////////////////////////////////////////

  return (
    <div id="hideMeagain" onClick={handleOut} className="backHazy">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] -top-11 w-[280px] h-[41vh] bg-n-11 dark:bg-white rounded-md"
      >
        {url ? <h2 className="url_login">{url}</h2> : null}

        <div className="flexC h-full ">
          <Message variable={emptyCondition} message={"Empty field detected"} />
          <Message
            variable={passwordCondition}
            message={"Password must be of atleat 6 digits"}
          />
          <Message
            variable={usernameCondition}
            message={"username must be of atleat 3 digits"}
          />
          <h4 className="text-white dark:text-black text-[14px] relative -top-3">
            Welcome Back to <span className="text-n-5"> EasySlot</span>
          </h4>
          <span className="text-[8px] text-white/70 dark:text-black/70 relative -top-2">
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

            <div className=" w-[100%] mt-4">
              <Link to={`/emailVerify/${" "}/${" "}`}>
                <p className="hover:underline text-white dark:text-black text-right text-[8px]">
                  forget password?
                </p>
              </Link>
              <button
                type="button"
                className=" w-full rounded-sm text-[10px] py-[3.5px] btnBlue"
              >
                Login
              </button>
            </div>

            <button className="google">
              <FaGoogle />
              Login using Google
            </button>
            <Link to="/register">
              <span className="text-[8px] text-white dark:text-black mt-2 hover:underline">
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
