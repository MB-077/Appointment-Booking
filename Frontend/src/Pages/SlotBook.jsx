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

    if (selected && BookedslotData.length < 1) {
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
    <div
      key={slot.id}
      className="bg-white h-fit px-3 py-1 rounded-md border-none"
    >
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
        className={`${
          slot.is_booked
            ? "text-black/70 font-semibold bg-white/50 cursor-not-allowed "
            : "font-bold"
        } bg-white text-black hover:bg-gray-300 transition-colors duration-300 `}
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

  const handleSubmit = () => {
    const dataObj = {
      doctor: newDoctorSelect?.id || doctors[0]?.id,
      patient: user.patient_id,
      time_slot: timeSlot,
      date: datePart2 ?? dateObj,
    };

    setFinalObj(dataObj);

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

    PostingFinalObj();
  };

  return (
    <div className=" flex w-full justify-evenly items-start">
      <div className="w-2/3 relative">
        <div>
          <div className="flex gap-3 ">
            {show ? (
              <h2 className="w-fit bg-white text-green-800 font-openSans font-semibold rounded-sm py-[1px] mx-10 px-10 relative top-5">
                selected slot will appear at the bottom
              </h2>
            ) : null}
          </div>
          <div className=" h-[220px] absolute grid grid-cols-5 top-[75px] w-full pl-8">
            {elements}
          </div>
        </div>
        <div className="absolute top-[275px]">
          <div className="flex gap-3">
            <h2 className="text-white mb-2 mx-2 text-[20px]">Selected Slot</h2>
            {message ? (
              <h2 className="w-fit bg-white text-red-800 font-openSans font-semibold rounded-sm mx-10 px-10 flex items-center text-[15px] h-fit relative top-2">
                Sorry! No further bookings available
              </h2>
            ) : null}
          </div>
          <motion.div
            initial={{ height: "50px" }}
            animate={BookedslotData.length !== 0 ? { height: "100px" } : null}
            transition={{ type: "linear", ease: "easeOut" }}
            className=" h-[100px] grid grid-cols-5"
          >
            <div className="relative top-4 flex flex-col gap-4 mx-5">
              <div className="  w-[400px] flex gap-4 text-white">
                Selected Date :{" "}
                <div className="text-black  bg-white h-fit px-3 py-1 rounded-md ">
                  {selectedDate ? `${dateObj}` : datePart2}
                </div>
              </div>
              <div className="text-white flex gap-3 w-[300px] items-center">
                Time Slot :
                <div
                  className={`text-black  ${
                    !newELement ? "hidden" : " visible "
                  } `}
                >
                  {newELement}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {BookedslotData.length !== 0 && (
          <div className="absolute top-[490px] bg-green-600 text-white rounded-md flex">
            <Button func={handleSubmit}>Submit</Button>
          </div>
        )}
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
