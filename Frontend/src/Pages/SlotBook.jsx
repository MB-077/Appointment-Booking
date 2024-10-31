import React, { useContext } from "react";
import dataContext from "../Context/contextProvider";
import { Button, Calendar, DoctorQuery } from "../Service/im-ex-ports";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoBookingsAvailable = ({ message }) => {
  const el = message ? (
    <h2 className="w-fit bg-white text-red-800 font-openSans font-semibold rounded-sm mx-10 px-10 flex items-center text-[15px] h-fit relative top-2 dark:bg-black dark:text-white">
      Sorry! No further bookings available
    </h2>
  ) : null;

  return el;
};

const SlotsAppearBottom = ({ show }) => {
  const el = show ? (
    <h2 className="w-fit bg-white text-green-800 font-openSans font-semibold rounded-sm py-[1px] mx-10 px-10 relative top-5 dark:bg-black dark:text-white">
      selected slot will appear at the bottom
    </h2>
  ) : null;

  return el;
};

const SlotsButton = ({ handleClick, total_slots }) => {
  const elements = total_slots.map((slot) => (
    <div key={slot.id}>
      <Button
        key={slot.id}
        func={handleClick}
        disabled={slot.is_booked}
        className={`${
          slot.is_booked
            ? "text-black/70 font-semibold bg-white/50 dark:bg-black/40 cursor-not-allowed "
            : "font-bold"
        } bg-white text-black hover:bg-gray-300 transition-colors duration-300 dark:bg-black dark:text-white dark:hover:bg-gray-800 dark:hover:text-white`}
      >
        {slot.start_time}
      </Button>
    </div>
  ));
  return <>{elements}</>;
};

const SelectedSlot = ({ BookedslotData }) => {
  const newELement = BookedslotData.map((slot) => (
    <div
      key={slot.id}
      className="bg-white h-fit px-3 py-1 rounded-md border-none dark:bg-black dark:text-white"
    >
      <p>{slot.start_time}</p>
    </div>
  ));
  return newELement;
};

const ConfirmationMessage = ({ confirm }) => (
  <div className=" py-2">
    <h2 className="text-white text-base dark:text-black ">{confirm}</h2>
  </div>
);

const SlotBook = () => {
  const {
    total_slots,
    settotal_Slots,
    BookedslotData,
    setBookedSlotData,
    newDoctorSelect,
    doctors,
  } = useContext(dataContext);

  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [confirm, setConfirm] = React.useState("");

  ////////////////////////////////////////////////////////////////////

  const handleClick = (e) => {
    let selected = total_slots.find(
      (slot) => slot.start_time === e.target.innerText
    );
    if (selected && BookedslotData.length < 1) {
      const updatedSlot = { ...selected, is_booked: true };

      settotal_Slots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === updatedSlot.id ? updatedSlot : slot
        )
      );

      setBookedSlotData((prev) =>
        [...prev, updatedSlot].sort((a, b) => a.id - b.id)
      );

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

  //////////////////////////////////////////////////////////

  const text = localStorage.getItem("userData");
  const user = JSON.parse(text);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateObj2 = new Date();
  const year = dateObj2.getFullYear();
  const month = String(dateObj2.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj2.getDate()).padStart(2, "0");
  const datePart2 = `${year}-${month}-${day}`;

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
        <h2 className="text-white text-base dark:text-black ">
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

  ////////////////////////////////////////////////////////////////
  const handleRemove = () => {
    setConfirm(
      <div className=" py-2">
        <h2 className="text-white text-base dark:text-black ">
          Your booking has been successfully Removed
        </h2>
      </div>
    );

    setTimeout(() => {
      setConfirm("");
      setBookedSlotData([]);
    }, 2000);

    const [el] = BookedslotData;
    const updatedSlot = { ...el, is_booked: false };

    settotal_Slots((prevSlots) =>
      prevSlots.map((slot) => (slot.id === updatedSlot.id ? updatedSlot : slot))
    );
  };

  return (
    <div className=" flex w-full justify-evenly items-start">
      <div className="w-2/3 relative">
        <div>
          <div className="flex gap-3 ">
            <h1 className="text-white dark:text-black font-semibold text-[20px] relative top-5 mx-2">
              Slots
            </h1>
            <SlotsAppearBottom show={show} />
          </div>
          <div className=" h-[220px] absolute grid grid-cols-5 top-[75px] w-full pl-8">
            <SlotsButton total_slots={total_slots} handleClick={handleClick} />
          </div>
        </div>
        <div className="absolute top-[275px]">
          <div className="flex gap-3">
            <h2 className="text-white dark:text-black mb-2 mx-2 text-[20px]">
              Selected Slot
            </h2>
            <NoBookingsAvailable message={message} />
          </div>

          <div className="   mx-3 rounded-md relative top-7 flexRB pr-8  w-[800px] ">
            <div className=" gap-2  flex  text-white items-center dark:text-black">
              Current Date :{" "}
              <div className="text-black dark:text-white bg-white dark:bg-black h-fit px-3 py-1 rounded-md ">
                {datePart2}
              </div>
            </div>
            <div className="gap-2 text-white flex dark:text-black  items-center">
              Time Slot :
              <div
                className={`text-black h-fit dark:text-white px-3 py-1 rounded-md ${
                  !BookedslotData.length ? "hidden" : "visible"
                }`}
              >
                <SelectedSlot BookedslotData={BookedslotData} />
              </div>
            </div>
            <div className="gap-2   flex dark:text-black text-white items-center ">
              <div className="text-black dark:text-white relative top-4 rounded-md ">
                <DoctorQuery />
              </div>
            </div>
          </div>
        </div>
        {BookedslotData.length !== 0 && (
          <div className=" absolute top-[435px] ">
            <div className="text-white dark:text-black text-sm mx-2">
              <pre>Only current date can be selected </pre>
              <pre>
                User cannot select more than one of the give time slots on any
                particular day
              </pre>
            </div>
            <div className="flex gap-5 mt-4">
              <div className="  rounded-md flex gap-5">
                <Button className={`cancel`} func={handleRemove}>
                  Remove
                </Button>
                <Button className={`success`} func={handleSubmit}>
                  Submit
                </Button>
              </div>
              <ConfirmationMessage confirm={confirm} />
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
