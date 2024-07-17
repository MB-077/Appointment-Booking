import React from "react";

const Dashboard = ({ className }) => {
  const info = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className={`${className}`}>
      <h1>
        Welcome to MB077,{" "}
        {info
          ? info.username.charAt(0).toUpperCase() + info.username.slice(1)
          : ""}
      </h1>
      <p>
        The all in one stop for booking appointments from your nearest hospitals
        with more personlized features. Get All the services just from on click
      </p>
    </div>
  );
};

export default Dashboard;
