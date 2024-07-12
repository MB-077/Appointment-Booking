import React, { useContext } from "react";
import Calendar from "../Components/Calendar";
import dataContext from "../Context/contextProvider";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
const SlotBook = () => {
  // hooks
  const {
    //state1
    total_slots,
    settotal_Slots,
    //state2
    BookedslotData,
    setBookedSlotData,
    //normal array
    newDoctorSelect,
    doctors,
  } = useContext(dataContext);

  const dateObj2 = new Date();
  const year = dateObj2.getFullYear();
  const month = String(dateObj2.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj2.getDate()).padStart(2, "0");

  const datePart2 = `${year}-${month}-${day}`;

  //internal hooks
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [finalObj, setFinalObj] = React.useState(null);

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

  //getting the user data
  const text = localStorage.getItem("userData");
  const user = JSON.parse(text);

  // Function to handle the change in date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const dateObj = `${selectedDate?.$y}-${selectedDate?.$M + 1}-${
    selectedDate?.$D
  }`;
  const [timeSlot] = BookedslotData.map((slot) => slot.id);
  const dataObj = {
    doctor: newDoctorSelect?.id || doctors[0]?.id,
    patient: user.patient_id,
    time_slot: timeSlot,
    date: datePart2 ?? dateObj,
  };
  const handleSet = () => {
    setFinalObj(dataObj);
  };

  const PostingFinalObj = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/appointments/",
        finalObj,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const info = await response.data;
      console.log(`success : ${info}`);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleSubmit = () => {
    PostingFinalObj();
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
            <div>Selected Date : {selectedDate ? `${dateObj}` : datePart2}</div>
            {newELement}
          </motion.div>
        </div>
        <Button func={handleSet}>Set</Button>
        <Button func={handleSubmit}>Submit</Button>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Calendar
            func={handleDateChange}
            className="relative top-5"
            selecteDate={selectedDate}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default SlotBook;
