import { Toggle, Button, Drop_down } from "./../Service/im-ex-ports";
import { useNavigate, useLocation } from "react-router-dom";

const CombinedButton = ({ handleClick, handleClick2 }) => {
  return (
    <>
      <div className="flex gap-3">
        <Button
          func={handleClick2}
          className={`w-[110px] text-[16.5px] btnBlue`}
        >
          Register
        </Button>
        <Button
          func={handleClick}
          className={`w-[110px] text-[16.5px] btnBlue`}
        >
          Login
        </Button>
      </div>
    </>
  );
};

const Header = () => {
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
    <nav className={`flexRB  w-full h-[12vh] my-2 rounded-lg`}>
      <div className="flexRB h-full">
        <div className=" flexR  h-full text-n-7 text-[30px] font-openSans tracking-wide bg-n-11 rounded-lg dark:bg-white dark:text-black xs:w-[180px] sm:w-[195px] md:w-[215px] lg:w-[240px] xl:w-[265px] xs-only:mr-2">
          EazySlots
        </div>
      </div>
      <div
        className={`${
          user
            ? "xl:w-[73%] lg:w-[63%] md:w-[60%] sm:w-[53%] xs:w-[100%]"
            : "w-[57%]"
        } bg-gradient h-[12vh] rounded-md`}
      >
        {user && !hideComponent ? (
          <div className=" h-[12vh] w-[300px] flexRS  px-10 font-semibold gap-3">
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
      {!user && (
        <CombinedButton handleClick={handleClick} handleClick2={handleClick2} />
      )}

      <div className="relative xl:right-3 lg:right-4 xs-only:absolute xs-only:right-4 xs-only:z-10 text-[25px] text-n-4/80 cursor-pointer">
        <Toggle />
      </div>
    </nav>
  );
};

export default Header;
