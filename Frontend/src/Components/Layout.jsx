import { Header, Footer, SideBar } from "./../im-ex-ports";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const list = [
    { id: 1, path: "/", name: "Dashboard" },
    { id: 2, path: "/slots", name: "Slot Booking" },
    { id: 3, path: "/profile", name: "Profile" },
    { id: 4, path: "/history", name: "History" },
    { id: 5, path: "/booked", name: "View Yours" },
  ];
  return (
    <div>
      {/* <Header /> */}
      <SideBar list={list} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
