import React from "react";
import { Box } from "./../Service/im-ex-ports";

const Header = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-n-5">Welcome to EasySlot</h1>
      <p className="text-lg text-gray-700 mt-4">
        Your convenient platform for booking doctor appointments.
      </p>
    </header>
  );
};

const boxConfigs = [
  {
    path: "/slots",
    header: "Book a Slot",
    text: "Easily book a time slot for your doctor visit with just a few clicks. Choose your preferred time and date.",
    button: "Go to the Slots",
    paragraph: "Book a slot now!!",
  },
  {
    path: "/booked",
    header: "View Your Bookings",
    text: "Keep track of your upcoming appointments. View and manage your bookings with ease.",
    button: "View Bookings",
    paragraph: "View your current appointments",
  },
  {
    path: "/history",
    header: "Booking History",
    text: "Check your previous appointments. Our history feature allows you to review all your past bookings.",
    button: "View History",
    paragraph: "Get access to your past appointments in no time",
  },
  {
    path: "/profile",
    header: "Profile",
    text: "Manage your profile information. Update your contact details, preferences, and more.",
    button: "Go to Profile",
    paragraph: "Manage your profile",
  },
];

const Dashboard = () => {
  const text = localStorage.getItem("userData");
  const user = JSON.parse(text);

  return (
    <div className="">
      <div className={` flexC p-4  ${user && `relative top-14`}`}>
        {!user && <Header />}
        <main className="w-full max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boxConfigs.map((config, index) => (
              <Box key={index} {...config} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
