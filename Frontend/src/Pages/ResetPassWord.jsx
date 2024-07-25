import React from "react";
import { Button, PasswordInputs } from "../im-ex-ports";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassWord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    password: "",
    confirm_password: "",
  });

  const uid = localStorage.getItem('uid');
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const notify = (message) => {
    toast(`${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  console.log(uid);
  const postData = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/reset_password/",
        { ...formData, uid },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const info = res.data;
      console.log("success:", info);
      if (info.message === "Password reset successful") {
        notify("Password reset successfully");
      } else {
        notify("Failed to reset password");
      }
    } catch (error) {
      console.log(error);
      notify("Failed to reset password");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    postData();
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div>
      <div className=" flexC h-[100vh]">
        <div className="shadow-xl w-[550px] h-[450px] rounded-md flexR">
          <div className=" w-[85%] h-[80%] flexC gap-5">
            <div className="text-center w-full tracking-wider flexC gap-3">
              <h1 className="text-5xl">
                Easy<span className="text-n-1">Slots</span>
              </h1>
              <p className="text-base">Reset your Password</p>
            </div>
            <form className="w-full">
              <div className="mb-16">
                <PasswordInputs
                  name={"password"}
                  func={handleChange}
                  placeholder={"Enter new password"}
                  className={"bg-white "}
                />

                <PasswordInputs
                  name={"confirm_password"}
                  func={handleChange}
                  placeholder={"Confirm new password"}
                  className={"bg-white"}
                />
              </div>
              <Button
                className={`btnBlue w-[70%] rounded-md mx-[80px]`}
                func={handleClick}
              >
                Submit
              </Button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassWord;
