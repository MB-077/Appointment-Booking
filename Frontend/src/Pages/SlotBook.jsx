import React from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import
const SlotBook = () => {
  const [slots, setSlots] = React.useState([]);

  React.useEffect(() => {
    const slotBooking = async () => {
      const token = "cc135a9f08311a827b62c1490bf4e7f656108231";
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
    <>
      <div>
        <h2>slotBooking</h2>
        <div> {elements} </div>
      </div>
      <div>
        <Calendar />
      </div>
    </>
  );
};

export default SlotBook;
