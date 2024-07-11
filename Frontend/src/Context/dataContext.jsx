import axios from "axios";
import React from "react";
import dataContext from "./contextProvider";
export const AllDataProvider = ({ children }) => {
  //hooks
  const [Users, setUsers] = React.useState([]);
  const [total_slots, settotal_Slots] = React.useState([]);
  const [BookedslotData, setBookedSlotData] = React.useState([]);

  //FUCNTION NO1
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

  //FUCNTION NO2
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
      settotal_Slots(info);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  //CALLING THE USEFFECT HOOK
  React.useEffect(() => {
    usersList();
    slotBookingList();
  }, []);

  return (
    <dataContext.Provider
      value={{
        Users,
        setUsers,
        BookedslotData,
        setBookedSlotData,
        total_slots,
        settotal_Slots,
        usersList,
        slotBookingList,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
