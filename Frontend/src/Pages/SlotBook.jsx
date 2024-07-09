import React from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import
const SlotBook = () => {
  const [slots, setSlots] = React.useState([]);

  React.useEffect(() => {
    const slotBooking = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/timeslots/", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const info = await response.data;
        console.log(info);
        setSlots(info);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    };

    slotBooking();
  }, []);

  const elements = slots.map((slot) => (
    <div key={slot.id}>
      <p>{slot.start_time}</p>
    </div>
  ));
  return (
    <div className="bg-yellow-300 flex w-full justify-evenly items-start">
      <div className="w-2/3 relative">
        <h2>slotBooking</h2>
        <div className="bg-pink-600 h-[250px] grid grid-cols-5">{elements}</div>
      </div>
      <div>
        <Calendar className="relative top-5" />
      </div>
    </div>
  );
};

export default SlotBook;
