import React from "react";
import { FaArrowRight } from "react-icons/fa6";
const Button = ({
  children,
  href,
  className,
  booked,
  onBook,
  isBookingDisabled,
}) => {
  const butTon = () => {
    return (
      <button
        disabled={booked.isBooked || isBookingDisabled}
        onClick={() => {
          onBook(booked.id);
        }}
        className={`${className} ${
          booked.isBooked
            ? "border border-gray-400 text-gray-400"
            : "hover:bg-n-2/90 hover:text-white transition-all duration-300 ease-in-out group hover:shadow-n-1/80 hover:shadow-md font-semibold text-n-4 font-openSans border-n-2 "
        } relative border  flex justify-evenly items-center px-2 py-2 rounded-[4px] w-[130px] `}
      >
        <FaArrowRight className="hidden group-hover:block text-n-6 " />
        <div
          className={`${
            booked.isBooked
              ? " border-gray-400 "
              : "border-n-1  group-hover:hidden"
          }   border rounded-full h-4 w-4`}
        ></div>
        {children}
      </button>
    );
  };
  const Link = () => {
    return (
      <a
        href={href}
        className={`${className}  relative shadow-lg rounded-[20px] w-[150px] h-[40px] flex justify-center items-center font-semibold text-n-1 font-openSans hover:bg-n-1 hover:text-white transition-colors duration-500 ease-in-out`}
      >
        {children}
      </a>
    );
  };
  return href ? Link() : butTon();
};

export default Button;
