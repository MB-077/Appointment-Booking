import React from "react";
import { motion } from "framer-motion";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import InputFields from "../Components/InputFields";
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
const Register = () => {
  const navigate = useNavigate();
  const [change, setChange] = React.useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleMe = (e) => {
    if (e.target.id === "hideMeagain2") {
      navigate(-1);
    }
  };

  React.useEffect(() => {
    const handleDown = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };

    document.addEventListener("keydown", handleDown);
    return () => {
      document.removeEventListener("keydown", handleDown);
    };
  }, [navigate]);

  // handling form change
  const handleChange = (e) => {
    setChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // register posting data
  const postData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        change
      );
      // localStorage.setItem("token", response.data.token);
      console.log("Success:", response.data);

      response.data.token ? navigate("/login") : null;
    } catch (error) {
      console.log(error);
      console.error("Error:", error.response.data);
    }
  };

  // handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    throw redirect("/profile?message=Please fill all your details to progress");
  };

  return (
    <div
      id="hideMeagain2"
      onClick={handleMe}
      className="absolute backdrop-blur-md w-full backdrop-brightness-50 top-0 left-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] -top-11 w-[280px] h-[44vh] bg-n-11 rounded-md border-[1px] border-n-5/30 shadow-n-5/50 shadow-sm"
      >
        {/* {empty ? <h2>Fill in all fields</h2> : null} */}

        <div className="flex flex-col justify-center items-center h-full">
          <h4 className="text-white text-[14px] relative -top-3">
            Welcome to <span className="text-n-5"> EasySlot</span>
          </h4>
          <span className="text-[7px] text-white/70 relative -top-2">
            Please enter your details
          </span>
          <form onSubmit={handleSubmit}>
            <InputFields
              label={"username"}
              type={`text`}
              icon={<CiUser />}
              name={"username"}
              func={handleChange}
            />
            <InputFields
              label={"email"}
              type={"email"}
              icon={<MdAlternateEmail />}
              name={"email"}
              func={handleChange}
            />
            <InputFields
              label={"phone-number"}
              type={"tel"}
              icon={<CiPhone />}
              name={"phone_number"}
              func={handleChange}
            />
            <InputFields
              label={"password"}
              type={"password"}
              icon={<RiLockPasswordLine />}
              func={handleChange}
              name={"password"}
            />
            <InputFields
              label={"confirm password"}
              type={"password"}
              icon={<RiLockPasswordLine />}
              name={"password2"}
              func={handleChange}
            />

            <button className="bg-n-1 mt-4 w-[100%] rounded-sm text-[10px] py-[3.5px] text-white hover:bg-blue-900">
              Register
            </button>
            <button className="bg-white hover:bg-gray-500 mt-2 w-[100%] rounded-sm text-[10px] py-[3.5px] text-black flex justify-center items-center gap-2 font-semibold">
              <FaGoogle />
              Google
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
