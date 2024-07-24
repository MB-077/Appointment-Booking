import axios from "axios";
import { useContext } from "react";
import dataContext from "./Context/contextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://127.0.0.1:8000/";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `token ${token}` } : {};
};

const notify = (message) => {
  const { dark } = useContext(dataContext);
  toast(`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: `${dark ? "dark" : "light"}`,
  });
};

export const fetchData = async (endpoint, setState) => {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await axios.get(url, { headers: getAuthHeader() });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = response.data;
    setState(data);
  } catch (error) {
    console.error(error.message);
  }
};

export const postData = async (endpoint, data, message) => {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await axios.post(url, data, { headers: getAuthHeader() });
    if (response.status !== 201) {
      throw new Error(`Failed to post data: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  } finally {
    notify(message);
  }
};

export const updateData = async (endpoint, data) => {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await axios.put(url, data, { headers: getAuthHeader() });
    if (response.status !== 200) {
      throw new Error(`Failed to update data: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  } finally {
    notify("Data has been updated");
  }
};
