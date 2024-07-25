import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const PasswordInputs = ({ func, placeholder, className, name }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleIcon = () => setShowPassword(!showPassword);

  return (
    <div className=" h-fit w-full flexR">
      <div className="w-[75%] relative left-2">
        <RiLockPasswordFill className="relative top-[38px] -left-9 text-[32px] text-n-1" />
        <div className="w-full  px-2 py-2 rounded-md outline-none border-2 border-neutral-400  flexRB">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            onChange={func}
            placeholder={placeholder}
            className={`outline-none w-full ${className} `}
          />
          <div onClick={handleIcon}>
            {!showPassword ? (
              <FaRegEyeSlash className="text-neutral-400 text-[24px]" />
            ) : (
              <FaRegEye className="text-neutral-400 text-[24px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordInputs;
