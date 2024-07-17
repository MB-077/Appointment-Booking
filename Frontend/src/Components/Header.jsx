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
      <div className="flex justify-between  h-full items-center ">
        <div className=" flex  w-[265px] h-full justify-center text-n-7 text-[30px] font-openSans items-center tracking-wide bg-n-11 rounded-lg ">
          EazySlots
        </div>
      </div>
      <div className="w-[42%]  bg-gradient h-[12vh] rounded-md"></div>
      <div className="flex h-full  gap-2 items-center justify-end relative ">
        <div className="bg-n-11 text-n-7 rounded-lg mr-2 h-[12vh] flex items-center justify-center">
          <Drop_down />
        </div>
        <Button func={handleClick2} className={`w-[110px]`}>
          Register
        </Button>
        <Button func={handleClick} className={`w-[110px]`}>
          Login
        </Button>
      </div>
      <div className="relative right-2 text-[25px] text-n-4/80 cursor-pointer">
        <Toggle />
      </div>
    </nav>
  );
};

export default Header;
