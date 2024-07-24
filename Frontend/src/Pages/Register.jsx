import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { InputFields, Message } from "../im-ex-ports";
import { CiUser, CiPhone } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
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
  const [samePassword, setSamePassword] = React.useState(true);
  const [passwordCondition, setpasswordCondition] = React.useState(true);
  const [usernameCondition, setUsernameCondition] = React.useState(true);
  const [emptyCondition, setEmptyCondition] = React.useState(true);
  const [phoneCondition, setPhoneCondition] = React.useState(true);
  const [emailCondition, setEmailCondition] = React.useState(true);
  const [emailindexCondition, setEmailindexCondition] = React.useState(true);
  const [userExist, setUserExist] = React.useState(true);

  //////////////////////////////////////////////////////////////
  const postData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        change
      );
      const info = response.data;
      console.log("Success:", response.data);
      if (info.username === "username already exist") {
        setUserExist(false);
        setTimeout(() => setUserExist(true), 2000);
      } else {
        navigate("/login");
      }
    } catch (err) {
      throw {
        message: "Failed To Register",
        statusText: res.statusText,
        status: res.status,
      };
    }
  };

  ////////////////////////////////////////////////////////////
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

  const handleChange = (e) => {
    setChange((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      change.email === "" ||
      change.username === "" ||
      change.phone_number === "" ||
      change.password === "" ||
      change.password2 === ""
    ) {
      setEmptyCondition(false);
      setTimeout(() => setEmptyCondition(true), 2000);
    } else if (change.password.length < 6) {
      setpasswordCondition(false);
      setTimeout(() => setpasswordCondition(true), 2000);
    } else if (change.username.length < 3) {
      setUsernameCondition(false);
      setTimeout(() => setUsernameCondition(true), 2000);
    } else if (change.phone_number.length < 10) {
      setPhoneCondition(false);
      setTimeout(() => setPhoneCondition(true), 2000);
    } else if (change.email.length < 5) {
      setEmailCondition(false);
      setTimeout(() => setEmailCondition(true), 2000);
    } else if (change.email.indexOf("@") === -1) {
      setEmailindexCondition(false);
      setTimeout(() => setEmailindexCondition(true), 2000);
    } else if (change.password !== change.password2) {
      setSamePassword(false);
      setTimeout(() => setSamePassword(true), 2000);
    } else {
      postData();
    }
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
        className="relative left-[40%] -top-11 w-[280px] h-[45vh] bg-n-11 dark:bg-white rounded-md shadow-sm"
      >
        <div className="flexC h-full">
          <Message variable={samePassword} message={"Incorrect Password"} />
          <Message
            variable={passwordCondition}
            message={"Password must be of atleat 6 digits"}
          />
          <Message
            variable={usernameCondition}
            message={"username must be of atleat 3 digits"}
          />
          <Message
            variable={phoneCondition}
            message={"Number must be of atleat 10 digits"}
          />
          <Message
            variable={emailCondition}
            message={"Email must be of atleat 5 digits"}
          />
          <Message
            variable={emailindexCondition}
            message={"Inappropriate Email"}
          />
          <Message variable={userExist} message={"User already exist!!"} />
          <Message variable={emptyCondition} message={"Empty field detected"} />
          <h4 className="text-white dark:text-black text-[17px] relative ">
            Welcome to <span className="text-n-5"> EasySlot</span>
          </h4>
          <span className="text-[8px] text-white/70 relative dark:text-black ">
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

            <button className=" mt-4 w-[100%] rounded-sm text-[10px] py-[3.5px] btnBlue">
              Register
            </button>
            <button className="google">
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
