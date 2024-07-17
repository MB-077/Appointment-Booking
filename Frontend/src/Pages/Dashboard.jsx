import React from "react";
import { NavLink, Link } from "react-router-dom";
import Box from "../Components/Box";
const Dashboard = ({ className }) => {
  const info = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="">
      {/* <h1>
        Welcome to MB077,{" "}
        {info
          ? info.username.charAt(0).toUpperCase() + info.username.slice(1)
          : ""}
      </h1> */}

      <div className=" flex flex-col items-center justify-center p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-n-5">Welcome to EasySlot</h1>
          <p className="text-lg text-gray-700 mt-4">
            Your convenient platform for booking doctor appointments.
          </p>
        </header>
        <main className="w-full max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Box
              path={"/slots"}
              header={"Book a Slot"}
              text={
                "Easily book a time slot for your doctor visit with just a few clicks. Choose your preferred time and date."
              }
              button={"Book Now"}
            />
            <Box
              path={"/booked"}
              header={"View Your Bookings"}
              text={
                "Keep track of your upcoming appointments. View and manage your bookings with ease."
              }
              button={"View Bookings"}
            />
            <Box
              path={"/history"}
              header={" Booking History"}
              text={
                "Check your previous appointments. Our history feature allows you to review all your past bookings."
              }
              button={"View History"}
            />
            <Box
              path={"/profile"}
              header={"Profile"}
              text={
                "Manage your profile information. Update your contact details, preferences, and more."
              }
              button={"Go to Profile"}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
