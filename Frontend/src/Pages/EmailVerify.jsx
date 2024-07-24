import React from "react";
import { Button } from "../im-ex-ports";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdAttachEmail } from "react-icons/md";
import { postData } from "../apiUtils";
const PassWordChange = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    newPassword: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    postData("reset_password/", formData, "Email has been sent");
    setTimeout(() => navigate("/resetPass"), 3000);
  };

  return (
    <div className=" flexC h-[100vh] ">
      <div className="shadow-xl w-[550px] h-[450px] rounded-md flexC">
        <div className=" w-[85%] h-[80%] flexC ">
          <div className="text-center w-full tracking-wider flexC gap-3">
            <h1 className="text-5xl">
              Easy<span className="text-n-1">Slots</span>
            </h1>
            <p>Verify your email</p>
          </div>
          <form className="w-full ">
            <div className="  relative h-fit mx-2 left-5 -top-8">
              <MdAttachEmail className="relative top-[87px] ml-2 text-[32px] text-n-1" />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-[75%] px-2 py-2 m-12 rounded-sm outline-none border-2 border-neutral-400 "
              />
            </div>
            <Button
              className={`btnBlue w-[70%] rounded-md mx-[75px] relative top-[-20px]`}
              func={handleClick}
            >
              Submit
            </Button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default PassWordChange;
