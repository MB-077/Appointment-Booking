import React from "react";
import { NavLink, Link } from "react-router-dom";
const Dashboard = ({ className }) => {
  const info = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="bg-black h-[100vh]">
      <h1>
        Welcome to MB077,{" "}
        {info
          ? info.username.charAt(0).toUpperCase() + info.username.slice(1)
          : ""}
      </h1>

      <div className=" flex flex-col items-center justify-center p-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900">
            Welcome to EasySlot
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Your convenient platform for booking doctor appointments.
          </p>
        </header>
        <main className="w-full max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800">
                Book a Slot
              </h2>
              <p className="mt-4 text-gray-600">
                Easily book a time slot for your doctor visit with just a few
                clicks. Choose your preferred time and date, and we will take
                care of the rest.
              </p>
              <NavLink
                to="/slots"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Book Now
              </NavLink>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800">
                View Your Bookings
              </h2>
              <p className="mt-4 text-gray-600">
                Keep track of your upcoming appointments. View and manage your
                bookings with ease.
              </p>
              <NavLink
                to="/slots/booked"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                View Bookings
              </NavLink>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800">
                Booking History
              </h2>
              <p className="mt-4 text-gray-600">
                Check your previous appointments. Our history feature allows you
                to review all your past bookings.
              </p>
              <NavLink
                to="/slots/history"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                View History
              </NavLink>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-blue-800">Profile</h2>
              <p className="mt-4 text-gray-600">
                Manage your profile information. Update your contact details,
                preferences, and more.
              </p>
              <NavLink
                to="/profile"
                className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Go to Profile
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
