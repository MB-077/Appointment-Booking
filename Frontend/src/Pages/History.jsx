import React from "react";
import axios from "axios";

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
  return <div>History</div>;
};

export default History;
