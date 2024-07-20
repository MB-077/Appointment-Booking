import React, { useContext } from "react";
import Calendar from "../Components/Calendar";
import dataContext from "../Context/contextProvider";
import Button from "../Components/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
  const [confirm, setConfirm] = React.useState("");

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

  const [timeSlot] = BookedslotData.map((slot) => slot.id);

  const dataObj = {
    doctor: newDoctorSelect?.id || doctors[0]?.id,
    patient: user.patient_id,
    time_slot: timeSlot,
    date: datePart2,
  };

  const PostingFinalObj = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/appointments/",
        dataObj,
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

  const handleSubmit = async () => {
    setConfirm(
      <div className=" py-2">
        <h2 className="text-white text-base  ">
          Your booking has been set successfully
        </h2>
      </div>
    );
    PostingFinalObj();
    setTimeout(() => {
      setConfirm("");
      setBookedSlotData([]);
      navigate("/booked");
    }, 1000);
  };

  const handleRemove = () => {
    setConfirm(
      <div className=" py-2">
        <h2 className="text-white text-base  ">
          Your booking has been successfully Removed
        </h2>
      </div>
    );

    setTimeout(() => {
      setConfirm("");
      setBookedSlotData([]);
    }, 2000);

    // Update selected slot
    const [el] = BookedslotData;
    const updatedSlot = { ...el, is_booked: false };

    // Update slots state
    settotal_Slots((prevSlots) =>
      prevSlots.map((slot) => (slot.id === updatedSlot.id ? updatedSlot : slot))
    );
  };

  return (
    <div className=" flex w-full justify-evenly items-start">
      <div className="w-2/3 relative">
        <div>
          <div className="flex gap-3 ">
            <h1 className="text-white font-semibold text-[20px] relative top-5 mx-2">
              Slots
            </h1>
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

          <div className="   mx-3 rounded-md relative top-7 flex justify-between pr-8 items-center w-[800px] ">
            <div className=" gap-2  flex  text-white items-center ">
              Current Date :{" "}
              <div className="text-black  bg-white h-fit px-3 py-1 rounded-md ">
                {datePart2}
              </div>
            </div>
            <div className="gap-2 text-white flex   items-center">
              Time Slot :
              <div
                className={`text-black h-fit px-3 py-1 rounded-md ${
                  !newELement ? "hidden" : " visible "
                } `}
              >
                {newELement}
              </div>
            </div>
            <div className="gap-2   flex  text-white items-center ">
              Doctor:
              <div className="text-black  bg-white h-fit px-5 py-1 rounded-md ">
                {newDoctorSelect?.doctor || doctors[0]?.doctor}
              </div>
            </div>
          </div>
        </div>
        {BookedslotData.length !== 0 && (
          <div className=" absolute top-[435px] ">
            <div className="text-white text-sm mx-2">
              <pre>Only current date can be selected </pre>
              <pre>
                User cannot select more than one of the give time slots on any
                particular day
              </pre>
            </div>
            <div className="flex gap-5 mt-4">
              <div className="  rounded-md flex gap-5">
                <Button
                  className={`bg-red-700 text-white hover:bg-red-900`}
                  func={handleRemove}
                >
                  Remove
                </Button>
                <Button
                  className={`bg-green-600 text-white hover:bg-green-800`}
                  func={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <div>{confirm}</div>
            </div>
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
