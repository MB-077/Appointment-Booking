import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useMessage } from "../Context/MessageContext";

const Register = () => {
  // const { setMessage } = useMessage();

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
      localStorage.setItem("token", response.data.token);
      console.log("Success:", response.data);

      response.data.token ? navigate("/login") : null;
    } catch (error) {
      console.log(error);
      console.error("Error:", error.response.data);
    }
  };

  //empty input fields
  const [empty, setEmpty] = React.useState(false);

  // handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      change.username === "" ||
      change.email === "" ||
      change.phone_number === "" ||
      change.password === "" ||
      change.password2 === ""
    ) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 3000);
    }

    postData();
  };

  return (
    <div
      id="hideMeagain2"
      onClick={handleMe}
      className="absolute backdrop-blur-md w-full backdrop-brightness-50 top-0 h-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 2, translateY: "250px" }}
        transition={{ duration: 0.5 }}
        className="relative left-[40%] top-0 w-96 h-36 bg-red-200"
      >
        {empty ? <h2>Fill in all fields</h2> : null}

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="username"
                type="text"
                value={change.username}
                placeholder="Username"
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={change.email}
                placeholder="Email"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <input
                name="phone_number"
                type="tel"
                value={change.phone_number}
                placeholder="Phone Number"
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                value={change.password}
                placeholder="Password"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div>
              <input
                name="password2"
                type="password"
                value={change.password2}
                placeholder="Confirm Password"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
