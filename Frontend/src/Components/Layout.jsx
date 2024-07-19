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
    {
      id: 3,
      path: "/profile",
      name: "Profile",
      nested: false,
      icon: <CgProfile />,
    },
    { id: 5, path: "/history", name: "History", icon: <FaHistory /> },
  ];
  return (
    <div className="bg-n-8 h-[100vh] w-full absolute">
      <div className=" m-2 ">
        <Header className={`my-2 rounded-lg`} />
        <div className="flex gap-2 ">
          <SideBar list={list} className={`rounded-lg`} />
          <div className={`w-full bg-n-11 rounded-lg`}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer className={`bg-n-11 w-full tracking-wider`} />
    </div>
  );
};

export default Layout;
