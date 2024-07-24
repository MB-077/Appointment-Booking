import React from "react";
import { Button } from "../im-ex-ports";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PasswordInputs from "../Components/PasswordInputs";
import { postData } from "../apiUtils";
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

  const handleClick = (e) => {
    e.preventDefault();
    postData("change_password/", formData, "Password Changed Successfully");
    setTimeout(() => navigate("/profile"), 3000);
  };

  return (
    <div>
      <div className=" flexC h-[80vh]">
        <div className="shadow-xl w-[550px] h-[450px] rounded-md flexR">
          <div className=" w-[85%] h-[80%] flexC gap-5">
            <div className="text-center w-full tracking-wider flexC gap-3">
              <h1 className="text-5xl text-white dark:text-black">
                Easy<span className="text-n-1">Slots</span>
              </h1>
              <p className="text-base text-white dark:text-black">
                Reset your Password
              </p>
            </div>
            <form className="w-full">
              <div className="mb-16">
                <PasswordInputs
                  func={handleChange}
                  placeholder={"Enter old password"}
                  className={"bg-n-11 text-white dark:bg-white"}
                />

                <PasswordInputs
                  func={handleChange}
                  placeholder={"Enter new password"}
                  className={"bg-n-11 text-white dark:bg-white"}
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
