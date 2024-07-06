import { IoIosArrowDown } from "react-icons/io";
import { Toggle, Button } from "./../im-ex-ports";
import cat from "./../images/catto.jpg";
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
        <div className="flex justify-evenly bg-white w-[55%] h-[68%] items-center border-r border-r-n-1/50">
          <img
            src={cat}
            height={50}
            width={50}
            alt="cat"
            className="rounded-full"
          />
          <div className="">
            <h1 className="text-[24px] font-semibold">Dr. John Doe</h1>
            <p className="text-[13px] font-openSans opacity-80">
              Kids Care Clinic
            </p>
          </div>
          <IoIosArrowDown className="cursor-pointer" />
        </div>
      </div>
      <div className="flex  w-[33%] h-full px-[50px] justify-evenly items-center relative left-52">
        <Button loginBtn={handleClick2}>Register</Button>
        <Button loginBtn={handleClick}>Login</Button>
      </div>
      <div className="relative right-10 text-[25px] text-n-4/80 cursor-pointer">
        <Toggle />
      </div>
    </nav>
  );
};

export default Header;
