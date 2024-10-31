import React, { useContext } from "react";
import { Button } from "./../Service/im-ex-ports";
import axios from "axios";
import dataContext from "./../Context/contextProvider";
const ViewYours = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [isAppointed, setIsAppointed] = React.useState(false);
  const { total_slots } = useContext(dataContext);
  const [appointedCancelled, setAppointedCancelled] = React.useState({});
  const token = localStorage.getItem("token");

  const appointedCancel = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/appointments/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const info = await response.data;
      console.log(info);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const fetchData = async (url) => {
    if (!token) throw new Error("Token not found");

    const response = await axios.get(url, {
      headers: { Authorization: `token ${token}` },
    });
    if (response.status !== 200) {
      throw {
        message: "Failed to fetch data",
        statusText: response.statusText,
        status: response.status,
      };
    }
    const info = await response.data;
    if (info.length > 0) {
      setIsAppointed(true);
    }
    setAppointments(info);
    console.log(info);

    return response.data;
  };

  const handleCancel = (e) => {
    let selected = appointments.find((el) => el.id === parseInt(e.target.id));
    let id = selected.id;
    let index = appointments.indexOf(selected);
    appointments.splice(index, 1);
    setAppointments([...appointments]);

    setAppointedCancelled({
      doctor_id: selected.doctor,
      id: selected.id,
    });

    appointedCancel(id);
    if (appointments.length === 0) {
      setIsAppointed(false);
    }
  };

  React.useEffect(() => {
    fetchData("http://127.0.0.1:8000/appointments/");
  }, []);

  console.log(appointedCancelled);

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
