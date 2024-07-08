import { redirect } from "react-router-dom";
export const Authrequire = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/login?message=Please login to continue.");
  }
  return null;
};
