import axios from "axios";
import React from "react";
import dataContext from "./contextProvider";
export const AllDataProvider = ({ children }) => {
  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    const users = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return; // If token does not exist, exit the function
      }
      try {
        const res = await axios.get("http://127.0.0.1:8000/patients-detail/", {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const info = await res.data;
        setPatients(info);
      } catch (err) {
        console.log(err);
      }
    };

    users();
  }, [patients]);

  return (
    <dataContext.Provider value={{ patients }}>{children}</dataContext.Provider>
  );
};
