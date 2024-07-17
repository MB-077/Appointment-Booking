import React, { useContext } from "react";
import Button from "./../Components/Button";
import axios from "axios";
import dataContext from "./../Context/contextProvider";
const ViewYours = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [isAppointed, setIsAppointed] = React.useState(false);
  const { total_slots } = useContext(dataContext);

  const appoints = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://127.0.0.1:8000/appointments/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const info = await response.data;
      if (info.length > 0) {
        setIsAppointed(true);
      }
      setAppointments(info);
      console.log(info);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  React.useEffect(() => {
    appoints();
  }, []);

  const Display = isAppointed ? (
    appointments.map((el) => {
      return (
        <div key={el.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">{el.doctor}</h2>
            <span className="text-sm text-gray-500">{el.date}</span>
          </div>
          <p className="text-gray-700 mb-2">Patient: {el.patient}</p>
          <p className="text-gray-700 mb-2">
            Time Slot:{" "}
            {total_slots.find((slot) => slot.id === el.time_slot)?.start_time}
          </p>
          <p
            className={`text-gray-700 mb-2 font-semibold ${
              el.is_approved ? "text-green-900" : "text-red-900"
            }`}
          >
            Status: {el.is_approved ? "Approved" : "Pending"}
          </p>
          <div className="flex gap-5 justify-center items-center">
            <p className="text-gray-700 mb-2">
              Reschedule Requested: {el.reschedule_requested ? "Yes" : "No"}
            </p>
            <Button className={`rounded - md p-2`}>Reschedule Now</Button>
          </div>
          <div className="">
            <p className="text-gray-700 mb-2">Fee : &#8377; 500</p>
            <Button className={`rounded - md my-2 p-2 w-full `}>Pay</Button>
            <Button className={`rounded - md p-2 w-full `}>Cancel</Button>
          </div>
        </div>
      );
    })
  ) : (
    <h1 className="text-2xl text-center">No Appointments</h1>
  );
  return <div className="flex gap-5">{Display}</div>;
};

export default ViewYours;
