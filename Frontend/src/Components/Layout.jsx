import { Header, Footer, SideBar } from "./../im-ex-ports";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const list = [
    { id: 1, path: "/", name: "Dashboard", nested: false },
    {
      id: 2,
      path: "/slots",
      name: "Slot Booking",
      nested: true,
      nestedList: [
        { id: 5, path: "/slots/booked", name: "View Yours" },
        { id: 4, path: "/slots/history", name: "History" },
      ],
    },
    { id: 3, path: "/profile", name: "Profile", nested: false },
  ];
  return (
    <div>
      <Header />
      <div className="flex ">
        <SideBar list={list} />
        <Outlet className="w-4/5 bg-red-200" />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
