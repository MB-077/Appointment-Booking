import React from "react";
import { useRouteError } from "react-router-dom";
const ErrorComp = () => {
  const err = useRouteError();
  const Display = (
    <div>
      <pre>{err.message}</pre>
      <pre>{err.status}</pre>
    </div>
  );

  return <div>{Display}</div>;
};

export default ErrorComp;
