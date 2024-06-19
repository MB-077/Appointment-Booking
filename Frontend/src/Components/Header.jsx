import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
// import { cat } from "./../images/catto.jpg";
const Header = () => {
  return (
    <nav className="flex fixed justify-between w-full h-[12vh] items-center ">
      <div className="flex justify-between w-[35%]  h-full items-center">
        <div className=" flex bg-n-1 w-[45%] h-full justify-center text-white text-[30px] font-openSans uppercase items-center tracking-wide">
          MB077
        </div>
        <div className="flex justify-evenly bg-white w-[55%] h-[68%] items-center border-r border-r-n-1/50">
          <img src={``} height={20} width={20} alt="cat" />
          <div className="">
            <h1 className="text-[22px]">Dr. John Doe</h1>
            <p className="text-[13.5px]">Kids Care Clinic</p>
          </div>
          <IoIosArrowDown className="cursor-pointer" />
        </div>
      </div>
      <div className="flex  w-[33%] h-full px-[50px] justify-evenly items-center relative left-52">
        <Button href="/">Appointment</Button>
        <Button href="/">Walk-in</Button>
      </div>
      <div className="relative right-10 text-[25px] text-n-4/80 cursor-pointer">
        <IoSettingsSharp />
      </div>
    </nav>
  );
};

export default Header;
