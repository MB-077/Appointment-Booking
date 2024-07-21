import React, { useContext } from "react";
import Button from "./../Components/Button";
import axios from "axios";
import dataContext from "./../Context/contextProvider";
const ViewYours = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [isAppointed, setIsAppointed] = React.useState(false);
  const { total_slots } = useContext(dataContext);

  const appointedCancel = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/appointments/${id}`,
        appointments,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const info = await response.data;
      console.log(info);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const appoints = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://127.0.0.1:8000/appointments/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const info = await response.data;
      console.log(info);
      if (info.length > 0) {
        setIsAppointed(true);
      }
      setAppointments(info);
      console.log(info);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  const handleCancel = (e) => {
    const selected = appointments.find((el) => el.id === parseInt(e.target.id));
    const id = selected.id;
    const index = appointments.indexOf(selected);
    appointments.splice(index, 1);
    setAppointments([...appointments]);
    appointedCancel(id);
    if (appointments.length === 0) {
      setIsAppointed(false);
    }
  };

  React.useEffect(() => {
    appoints();
  }, []);

  const Display = isAppointed ? (
    appointments.map((el) => {
      return (
        <div key={el.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="flexRB mb-2">
            <h2 className="text-lg font-bold">{el.doctor}</h2>
            <span className="text-md text-gray-700">{el.date}</span>
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
          <div className="flexR gap-5">
            <p className="text-gray-700 mb-2">
              Reschedule Requested: {el.reschedule_requested ? "Yes" : "No"}
            </p>
            <Button id={el.id} className={`btnBlue`}>
              Reschedule Now
            </Button>
          </div>
          <div className="">
            <p className="text-gray-700 mb-2">Fee : &#8377; 500</p>
            <Button className={`my-2 w-full btnBlue`}>Pay</Button>
            <Button id={el.id} className={`w-full btnBlue`} func={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      );
    })
  ) : (
    <h1 className="text-2xl text-center text-white">No Appointments</h1>
  );
  return <div className="flex gap-5 mt-8 ml-8">{Display}</div>;
};

export default ViewYours;
