import React, { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dataContext from "../Context/contextProvider";
import { motion } from "framer-motion";
import Button from "../Components/Button";
const SlotBook = () => {
  // hooks
  const {
    total_slots,
    setBookedSlotData,
    BookedslotData,
    settotal_Slots,
    doctorSelected,
  } = useContext(dataContext);

  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState(null);

  // handling click
  const handleClick = (e) => {
    let selected = total_slots.find(
      (slot) => slot.start_time === e.target.innerText
    );

    if (selected && BookedslotData.length < 2) {
      // Update selected slot
      const updatedSlot = { ...selected, is_booked: true };

      // Update slots state
      settotal_Slots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === updatedSlot.id ? updatedSlot : slot
        )
      );

      // Update booked slots
      setBookedSlotData((prev) =>
        [...prev, updatedSlot].sort((a, b) => a.id - b.id)
      );

      //this is helps to show message on different conditions
      setMessage(false);
      setShow(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        setShow(false);
        setMessage(false);
      }, 2000);
      setTimeoutId(id);
    } else {
      setMessage(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        setMessage(false);
      }, 2000);
      setTimeoutId(id);
    }
  };
  //   mapping the booked slots
  const newELement = BookedslotData.map((slot) => (
    <div key={slot.id}>
      <p>{slot.start_time}</p>
    </div>
  ));

  // mapping the slots from the database
  const elements = total_slots.map((slot) => (
    <div key={slot.id}>
      <Button
        key={slot.id}
        func={handleClick}
        disabled={slot.is_booked}
        className={`${slot.is_booked ? "line-through" : "font-bold"}`}
      >
        {slot.start_time}
      </Button>
    </div>
  ));

  // handling the submit button
  const handleSubmit = () => {
    console.log(doctorSelected);
    //data i want
    //1 doctor doctorsSelected
    //2 patient
    //3 time_slot BookedslotData
    //4 date
  };
  return (
    <div className="bg-yellow-300 flex w-full justify-evenly items-start">
      <div className="w-2/3 relative">
        <div>
          <div className="flex gap-3">
            <h2>slotBooking</h2>
            {show ? <h2>selected slot will appear at the bottom</h2> : null}
          </div>
          <div className="bg-pink-600 h-[250px] grid grid-cols-5">
            {elements}
          </div>
        </div>
        <div>
          <div className="flex gap-3">
            <h2>selected slots</h2>
            {message ? <h2>Sorry! No further bookings</h2> : null}
          </div>
          <motion.div
            initial={{ height: "50px" }}
            animate={BookedslotData.length !== 0 ? { height: "200px" } : null}
            transition={{ type: "linear", ease: "easeOut" }}
            className="bg-pink-600 h-[50px] grid grid-cols-5"
          >
            {newELement}
          </motion.div>
        </div>
        <Button func={handleSubmit}>Submit</Button>
      </div>
      <div>
        <Calendar className="relative top-5" />
      </div>
    </div>
  );
};

export default SlotBook;
