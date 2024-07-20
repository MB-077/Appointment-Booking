import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const History = () => {
  const Past_appointments = async () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    console.log(userData);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/patients/${userData[patient_id]}/past-appointments/`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      const info = await response.data;
      console.log(info);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  React.useEffect(() => {
    Past_appointments();
  }, []);
  return (
    <div className="m-5">
      <h1 className="text-2xl mb-5 text-white">
        No past appointments, go for it now!
      </h1>
      <Link
        to="/slots"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-900"
      >
        Slot Bookings
      </Link>
    </div>
  );
};

export default History;
