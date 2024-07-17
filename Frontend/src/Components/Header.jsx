import { Toggle, Button } from "./../im-ex-ports";
import Drop_down from "./Drop_down";
import { useNavigate } from "react-router-dom";

const Header = ({ className }) => {
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
      <div className="flex justify-between w-[25%]  h-full items-center ">
        <div className=" flex  w-[265px] h-full justify-center text-n-7 text-[30px] font-openSans items-center tracking-wide bg-gradient rounded-lg mr-2">
          OVOcode
        </div>
      </div>
      <div className="flex w-[47%] h-full px-[75px] gap-8 items-center justify-end relative left-48">
        <div className="bg-n-11 text-n-7 rounded-lg mr-2 h-[12vh] flex items-center w-1/2 justify-center">
          <Drop_down />
        </div>
        <Button func={handleClick2} className={`w-[110px]`}>
          Register
        </Button>
        <Button func={handleClick} className={`w-[110px]`}>
          Login
        </Button>
      </div>
      <div className="relative right-10 text-[25px] text-n-4/80 cursor-pointer">
        <Toggle />
      </div>
    </nav>
  );
};

export default Header;
