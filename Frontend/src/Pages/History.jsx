import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./../Service/im-ex-ports";
import dataContext from "../Context/contextProvider";
import { ApiCall } from "../Service/apiUtils";

const History = () => {
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
