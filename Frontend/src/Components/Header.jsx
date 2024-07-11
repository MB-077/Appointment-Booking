import { Toggle, Button } from "./../im-ex-ports";
import Drop_down from "./Drop_down";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleClick2 = () => {
    navigate("/register");
  };
  return (
    <nav className="flex justify-between w-full h-[12vh] items-center bg-white ">
      <div className="flex justify-between w-[35%]  h-full items-center">
        <div className=" flex bg-n-1 w-[45%] h-full justify-center text-white text-[20px] font-openSans uppercase items-center tracking-wide">
          MB077
        </div>
        <Drop_down />
      </div>
      <div className="flex  w-[33%] h-full px-[50px] justify-evenly items-center relative left-52">
        <Button func={handleClick2}>Register</Button>
        <Button func={handleClick}>Login</Button>
      </div>
      <div className="relative right-10 text-[25px] text-n-4/80 cursor-pointer">
        <Toggle />
      </div>
    </nav>
  );
};

export default Header;
