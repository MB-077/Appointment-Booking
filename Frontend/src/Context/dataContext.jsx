import axios from "axios";
import React from "react";
import dataContext from "./contextProvider";
export const AllDataProvider = ({ children }) => {
  // this is for all the users
  const [Users, setUsers] = React.useState([]);
  const [slots, setSlots] = React.useState([]);

  const usersList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:8000/patients/", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const info = await res.data;
      console.log(info);
      setUsers(info);
    } catch (err) {
      console.log(err);
    }
  };

  const slotBookingList = async () => {
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

  React.useEffect(() => {
    usersList();
    slotBookingList();
  }, []);

  // this is for booked time slots for adding and deleting
  const [BookedslotData, setBookedSlotData] = React.useState([]);

  return (
    <dataContext.Provider
      value={{
        Users,
        setUsers,
        BookedslotData,
        setBookedSlotData,
        slots,
        setSlots,
        usersList,
        slotBookingList,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
