// Import necessary modules and components
import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
const Calendar = ({ func, selecteDate }) => {
  return (
    <DateCalendar
      value={selecteDate}
      defaultValue={new Date()}
      onChange={func}
      // showDaysOutsideCurrentMonth
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
  );
};

export default Calendar;
