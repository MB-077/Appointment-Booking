// Import necessary modules and components
import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
const Calendar = () => {
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  // Function to handle the change in date
  const handleDateChange = (e) => {
    console.log(e.currentTarget[`${data - timetamp}`]);
    // setSelectedDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onClick={handleDateChange}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={5}
        className="bg-white relative top-5 rounded-md "
        sx={{
          width: "350px",
          height: "400px",
          "& .MuiButtonBase-root": {
            fontSize: "0.9rem",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
