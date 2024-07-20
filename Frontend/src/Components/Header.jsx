import { Toggle, Button } from "./../im-ex-ports";
import Drop_down from "./Drop_down";
import { useNavigate, useLocation } from "react-router-dom";
const Header = ({ className }) => {
  const text = localStorage.getItem("userData");
  const user = JSON.parse(text);
  const location = useLocation();
  const hideComponent = location.pathname === "/profile";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleClick2 = () => {
    navigate("/register");
  };
  return (
    <nav
      className={`flex justify-between w-full h-[12vh] items-center ${className}`}
    >
      <div className="flex justify-between  h-full items-center ">
        <div className=" flex  w-[265px] h-full justify-center text-n-7 text-[30px] font-openSans items-center tracking-wide bg-n-11 rounded-lg ">
          EazySlots
        </div>
      </div>
      <div
        className={`${
          hideComponent ? "w-[70%]" : "w-[50%]"
        } bg-gradient h-[12vh] rounded-md`}
      >
        {user && !hideComponent ? (
          <div className=" h-[12vh] w-[300px] flex justify-start px-10 items-center font-semibold gap-3">
            <p className="text-[20px] text-white/70 relative top-[2px]">
              Welcome back ,{" "}
            </p>
            <p className=" text-[25px] text-white">
              {" "}
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </p>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
      {user ? (
        <div className="flex h-full  gap-2 items-center justify-end relative ">
          <div className="bg-n-11 text-n-7 rounded-lg mr-2 h-[12vh] flex items-center justify-center">
            {hideComponent || <Drop_down />}
          </div>
        </div>
      ) : (
        <div className="flex gap-5">
          <Button
            func={handleClick2}
            className={`w-[110px] text-white text-[16.5px] bg-n-1 hover:bg-blue-900 transition-colors duration-300`}
          >
            Register
          </Button>
          <Button
            func={handleClick}
            className={`w-[110px] text-white text-[16.5px] bg-n-1 hover:bg-blue-900 transition-colors duration-300`}
          >
            Login
          </Button>
        </div>
      )}

      <div className="relative right-6 text-[25px] text-n-4/80 cursor-pointer">
        <Toggle />
      </div>
    </nav>
  );
};

export default Header;
