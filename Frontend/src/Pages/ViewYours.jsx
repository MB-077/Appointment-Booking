import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import dataContext from "../Context/contextProvider";
const ViewYours = () => {
  const { slotAppoint } = useOutletContext();
  const { BookedslotData } = useContext(dataContext);
  return <>Hello mr. Peter</>;
};

export default ViewYours;
