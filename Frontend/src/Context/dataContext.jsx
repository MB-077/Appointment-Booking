import axios from "axios";
import React from "react";
import dataContext from "./contextProvider";
const AllDataProvider = ({ children }) => {
  //hooks
  //total no of users
  const [Users, setUsers] = React.useState([]);
  //total no f slots available
  const [total_slots, settotal_Slots] = React.useState([]);
  //slots booked by the user
  const [BookedslotData, setBookedSlotData] = React.useState([]);
  //total no of doctors available
  const [doctors, setDoctors] = React.useState([]);
  //total no of doctors selected
  const [doctorsSelected, setDoctorsSelected] = React.useState({});
  const newDoctorSelect = doctorsSelected;
  //a variable that holds the final object

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

      setUsers(info);
    } catch (err) {
      console.log(err);
    }
  };

  //FUCNTION NO2
  const slotBookingList = async (id = 1) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/doctors/${id}/timeslots/   `,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const info = await response.data;
      console.log(info);
      settotal_Slots(info);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  //FUNCTION NO3
  const DocAvailable = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:8000/doctors/", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const info = await response.data;
      console.log(info);
      setDoctors(info);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  //FUNCTION NO4

  //CALLING THE USEFFECT HOOK
  React.useEffect(() => {
    usersList();
    slotBookingList();
    DocAvailable();
  }, []);

  return (
    <dataContext.Provider
      value={{
        //state1
        Users,
        doctors,
        //state2
        BookedslotData,
        setBookedSlotData,
        //state3
        total_slots,
        settotal_Slots,
        //state4
        newDoctorSelect,
        doctorsSelected,
        setDoctorsSelected,

        //functions
        usersList,
        slotBookingList,
        DocAvailable,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
export default AllDataProvider;
