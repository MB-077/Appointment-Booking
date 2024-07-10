import React from "react";
import { useRouteError } from "react-router-dom";
const ErrorComp = () => {
  const err = useRouteError();
  console.log(err);
  return <div>ErrorComp</div>;
};

export default ErrorComp;
