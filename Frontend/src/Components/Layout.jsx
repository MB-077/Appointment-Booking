import { Header, Footer, SideBar } from "./../im-ex-ports";
import { Outlet } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaHistory } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { MdApproval } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
const Layout = () => {
  const list = [
    {
      id: 1,
      path: "/",
      name: "Dashboard",
      nested: false,
      icon: <RxDashboard />,
    },
    {
      id: 2,
      path: "/slots",
      name: "Slot Booking",
      nested: true,
      icon: <ImBooks />,
    },
    {
      id: 4,
      path: "/booked",
      name: "Appointments",
      icon: <MdApproval />,
    },
    { id: 5, path: "/history", name: "History", icon: <FaHistory /> },
    {
      id: 3,
      path: "/profile",
      name: "Profile",
      nested: false,
      icon: <CgProfile />,
    },
  ];
  return (
    <div className="bg-n-8 h-[100vh] w-full absolute">
      <div className=" m-2 ">
        <Header />
        <div className="flex gap-2 ">
          <SideBar list={list} />
          <div className={`w-full bg-n-11 rounded-lg`}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
