import React from "react";
import axios from "axios";
import dataContext from "./contextProvider";
const AllDataProvider = ({ children }) => {
  const [Users, setUsers] = React.useState([]);
  const [total_slots, settotal_Slots] = React.useState([]);
  const [BookedslotData, setBookedSlotData] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsSelected, setDoctorsSelected] = React.useState({});
  const newDoctorSelect = doctorsSelected;
  const [darkMode, setDarkMode] = React.useState(false);
  const token = localStorage.getItem("token");

  // Function to fetch data from API
  const fetchData = async (url, setState) => {
    if (!token) return;
    const response = await axios.get(url, {
      headers: { Authorization: `token ${token}` },
    });
    if (!response.status === 200) {
      throw {
        message: "Failed to fetch data",
        statusText: response.statusText,
        status: response.status,
      };
    }
    const data = response.data;
    console.log(data);
    setState(data);
  };

  const usersList = () =>
    fetchData("http://127.0.0.1:8000/patients/", setUsers);

  const slotBookingList = (id = 1) =>
    fetchData(`http://127.0.0.1:8000/doctors/${id}/timeslots/`, settotal_Slots);

  const DocAvailable = () =>
    fetchData("http://127.0.0.1:8000/doctors/", setDoctors);

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
