import Button from "./Button";
import React, { useState } from "react";

const TimeSlot = ({ Time, duration, icon, slotTime }) => {
  // defining the usestate
  const [bookings, setBookings] = useState(slotTime);
  //we have to update the slotTime as the button is clicked and what info has to be changed is coming from button itself
  //!playing with the id's
  const [message, setMessage] = useState(<p></p>);
  const [displayText, setDisplayText] = useState(false);

  const handleBooking = (id) => {
    //.map methode forms a new array
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, isbooked: !booking.isBooked } : booking
    );

    const booking = updatedBookings.find((el) => el.id === id);
    if (!booking.isBooked)
      setMessage(
        <p className="text-green-700 text-[20px] font-semibold">
          Booking Confirmed
        </p>
      );
    else
      setMessage(
        <p className="text-red-700 text-[20px] font-semibold">Already Booked</p>
      );

    setBookings(updatedBookings);
    setDisplayText(true);

    setTimeout(() => {
      setDisplayText(false);
    }, 3000);
  };

  return (
    <div className="bg-white relative top-10 w-2/3 px-5 ">
      {/* header of slot space */}
      <div className="flex justify-between my-4">
        <div className="flex items-center gap-3">
          <div>{icon}</div>
          <div>
            <div>{Time}</div>
            <div className="opacity-60 text-[12px]">{duration}</div>
          </div>
        </div>
        {displayText && message}
      </div>

      {/* slot space */}
      <div className="grid grid-rows-2 grid-cols-5 bg-white gap-4 mb-5">
        {bookings.length > 0 ? (
          bookings.map((obj) => {
            return (
              <Button onBook={handleBooking} key={obj.id} booking={obj}>
                {obj.start}
              </Button>
            );
          })
        ) : (
          <div>{""}</div>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
