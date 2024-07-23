import React from "react";
import { Button } from "../im-ex-ports";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PasswordInputs from "../Components/PasswordInputs";

const ResetPassWord = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });
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

  const postData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/change_password/",
        formData,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const info = res.data;
      console.log("success:", info);
    } catch (error) {
      console.log(error);
    } finally {
      notify("password has been changed");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    postData();
    setTimeout(() => navigate("/profile"), 3000);
  };

  return (
    <div>
      <div className=" flexC h-[80vh]">
        <div className="shadow-xl w-[550px] h-[450px] rounded-md flexR">
          <div className=" w-[85%] h-[80%] flexC gap-5">
            <div className="text-center w-full tracking-wider flexC gap-3">
              <h1 className="text-5xl text-white">
                Easy<span className="text-n-1">Slots</span>
              </h1>
              <p className="text-base text-white">Reset your Password</p>
            </div>
            <form className="w-full">
              <div className="mb-16">
                <PasswordInputs
                  func={handleChange}
                  placeholder={"Enter old password"}
                  className={"bg-n-11 text-white"}
                />

                <PasswordInputs
                  func={handleChange}
                  placeholder={"Enter new password"}
                  className={"bg-n-11 text-white"}
                />
              </div>
              <Button
                className={`btnBlue w-[70%] rounded-md mx-[80px]`}
                func={handleClick}
              >
                Change
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
