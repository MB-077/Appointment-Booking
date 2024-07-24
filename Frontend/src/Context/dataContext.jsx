import React from "react";
import dataContext from "./contextProvider";
import { fetchData } from "../apiUtils";
const AllDataProvider = ({ children }) => {
  const [Users, setUsers] = React.useState([]);
  const [total_slots, settotal_Slots] = React.useState([]);
  const [BookedslotData, setBookedSlotData] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsSelected, setDoctorsSelected] = React.useState({});
  const newDoctorSelect = doctorsSelected;
  const [darkMode, setDarkMode] = React.useState(false);

  const usersList = () => fetchData("patients/", setUsers);

  const slotBookingList = (id = 1) =>
    fetchData(`doctors/${id}/timeslots/`, settotal_Slots);

  const DocAvailable = () => fetchData("doctors/", setDoctors);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  React.useEffect(() => {
    usersList();
    slotBookingList();
    DocAvailable();
  }, []);

  return (
    <dataContext.Provider
      value={{
        Users,
        doctors,
        BookedslotData,
        setBookedSlotData,
        total_slots,
        settotal_Slots,
        newDoctorSelect,
        doctorsSelected,
        setDoctorsSelected,
        darkMode,
        setDarkMode,
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
