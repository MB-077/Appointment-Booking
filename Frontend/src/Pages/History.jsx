import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "./../im-ex-ports";

const History = () => {
  // const Past_appointments = async () => {
  //   const token = localStorage.getItem("token");
  //   const userData = localStorage.getItem("userData");
  //   console.log(userData);

  //   const response = await axios.get(
  //     `http://127.0.0.1:8000/patients/${userData[patient_id]}/past-appointments/`,
  //     {
  //       headers: {
  //         Authorization: `token ${token}`,
  //       },
  //     }
  //   );
  //   if (!response.ok) {
  //     throw {
  //       message: "Failed To fetch vans",
  //       statusText: res.statusText,
  //       status: res.status,
  //     };
  //   }
  //   const info = await response.data;
  //   return info;
  // };

  // React.useEffect(() => {
  //   Past_appointments();
  // }, []);

  return (
    <div className="m-5">
      <h1 className="text-2xl mb-5 text-white dark:text-black">
        No past appointments, go for it now!
      </h1>
      <Link to="/slots">
        <Button className={`btnBlue`}> Slot Bookings</Button>
      </Link>
    </div>
  );
};

export default History;
