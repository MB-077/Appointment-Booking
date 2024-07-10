import React, { useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dataContext from "../Context/contextProvider";
import { motion } from "framer-motion";
const SlotBook = () => {
  const { slots, setBookedSlotData, BookedslotData } = useContext(dataContext);
  const [show, setShow] = React.useState(false);
  const handleClick = (e) => {
    console.log(e.target);
    const selected = slots.find(
      (slot) => slot.start_time === e.target.innerText
    );
    console.log(selected);
    setBookedSlotData((prev) => [...prev, selected]);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const newELement = BookedslotData.map((slot) => (
    <div key={slot.id}>
      <p>{slot.start_time}</p>
    </div>
  ));

  const elements = slots.map((slot) => (
    <div key={slot.id}>
      <button
        key={slot.id}
        onClick={handleClick}
        className={`${!slot.is_booked ? "line-through" : "font-bold"}`}
      >
        {slot.start_time}
      </button>
    </div>
  ));
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
          <h2>Selected Slots</h2>
          <motion.div
            initial={{ height: "50px" }}
            animate={BookedslotData.length !== 0 ? { height: "200px" } : null}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-pink-600 h-[50px] grid grid-cols-5"
          >
            {newELement}
          </motion.div>
        </div>
      </div>
      <div>
        <Calendar className="relative top-5" />
      </div>
    </div>
  );
};

export default SlotBook;
