import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
const SlotLayout = () => {
  const [slotAppoint, setSlotAppoint] = React.useState([]);

  //FUCNTION NO2
  const getAppoint = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:8000/appointments/", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const info = await response.data;
      console.log(info);
      setSlotAppoint(info);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };
  React.useEffect(() => {
    getAppoint();
  }, []);

  return (
    <div>
      <Outlet context={{ slotAppoint }} />
    </div>
  );
};

export default SlotLayout;
