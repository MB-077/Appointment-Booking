import { redirect } from "react-router-dom";
const Authrequire = async () => {
  // const token = localStorage.getItem("token");
  const token = "sfkd";
  if (!token) {
    throw redirect("/login?message=Please login to continue.");
  }
  return null;
};

export default Authrequire;
