import React from "react";
import { Outlet } from "react-router-dom";
const SlotLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SlotLayout;
