import React from "react";
import { useContext } from "react";
import dataContext from "../Context/contextProvider";
const Dashboard = () => {
  const { patients } = useContext(dataContext);
  console.log(patients);
  //! patients is an array of objects with properties like patient, gender, blood group, age and id and address which is always empty

  // if (patients && patients.length > 0) {
  //   const [info] = patients;
  //   const name = info.patient;
  // }

  return (
    <div>
      <h1>Welcome to MB077</h1>
      <p>
        The all in one stop for booking appointments from your nearest hospitals
        with more personlized features. Get All the services just from on click
      </p>
    </div>
  );
};

export default Dashboard;
