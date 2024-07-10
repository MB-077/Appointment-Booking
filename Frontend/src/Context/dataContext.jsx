import axios from "axios";
import React from "react";
import dataContext from "./contextProvider";
export const AllDataProvider = ({ children }) => {
  // function parseJwt(token) {
  //   if (!token) {
  //     return;
  //   }

  //   const base64Url = token.split(".")[1];
  //   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split("")
  //       .map(function (c) {
  //         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join("")
  //   );

  //   return JSON.parse(jsonPayload);
  // }

  const users = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    // const userinfo = parseJwt(token);
    // console.log(userinfo);

    try {
      const res = await axios.get("http://127.0.0.1:8000/patients/", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      const info = await res.data;
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    users();
  }, []);

  return <dataContext.Provider value={{}}>{children}</dataContext.Provider>;
};
