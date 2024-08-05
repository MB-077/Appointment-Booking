import { useContext } from "react";
import { toast } from "react-toastify";
import dataContext from "./../Context/contextProvider";

const useNotify = () => {
  const { dark } = useContext(dataContext);

  const notify = (message) => {
    toast(`${message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: dark ? "light" : "dark",
    });
  };

  return notify;
};

export default useNotify;
