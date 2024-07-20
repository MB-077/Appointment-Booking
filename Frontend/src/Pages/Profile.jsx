import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./../Components/Button";
import axios from "axios";
// export function profileLoader({ request }) {
//   return newURL(request.url).searchParams.get("message");
// }

const PatientProfile = ({ userId }) => {
  const [profileData, setProfileData] = React.useState(null);
  const [formData, setFormData] = React.useState({
    patient: "",
    age: "",
    gender: "",
    address: "",
    blood_group: "",
    zip_code: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  //getting the user Id
  const user = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  const info = JSON.parse(user);
  const id_main = info.patient_id;

  React.useEffect(() => {
    const fetchData = async (userId) => {
      if (isFormSubmitted) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/patients-detail/${userId}/`,
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData(id_main);

    const interval = setInterval(() => {
      if (!isFormSubmitted) {
        toast.info("Please fill out your profile form.", { autoClose: false });
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isFormSubmitted, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postData = async (userId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/patients-detail/${userId}/`,
        formData,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      setIsFormSubmitted(true);
      toast.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id_main);
    console.log(formData);
    postData(id_main);
  };

  return (
    <div className="p-6  h-[80vh]  rounded-lg text-white">
      {!isFormSubmitted ? (
        <div>
          <h2 className="text-2xl text-center mb-8 ">
            Fill in the details to book a slots
          </h2>
          <form onSubmit={handleSubmit} className=" h-[64.6vh]">
            <div className="grid grid-cols-3  h-full  m-5">
              <div className="flex flex-col ">
                <p className="text-lg font-semibold">Name</p>
                <input
                  type="text"
                  name="patient"
                  placeholder=" Your name here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Age</p>
                <input
                  type="number"
                  name="age"
                  placeholder=" Your age here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Gender</p>
                <input
                  name="gender"
                  type="text"
                  placeholder=" Your gender here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Address</p>
                <textarea
                  rows={5}
                  name="address"
                  type="address"
                  placeholder=" Your address here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Blood Group</p>
                <input
                  name="blood_group"
                  type="text"
                  placeholder=" Your blood group here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">ZipCode</p>
                <input
                  type="text"
                  name="zip_code"
                  placeholder=" Your zip code here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              className={`px-6 py-2 relative -top-[68px] mx-5 bg-blue-500 rounded-lg hover:bg-blue-700`}
            >
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          <p className="mt-4">
            <strong>Name:</strong> {profileData?.name}
          </p>
          <p className="mt-4">
            <strong>Email:</strong> {profileData?.email}
          </p>
          <p className="mt-4">
            <strong>Age:</strong> {profileData?.age}
          </p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PatientProfile;
{
  /* <div className="w-full  bg-gradient text-white p-6 font-semibold rounded-lg shadow-md h-[80vh]">
      <div className="absolute left-[22rem]">
        <div className="flex items-center space-x-6 mb-[26px] ">
          <img
            className="w-28 h-28 rounded-full object-cover"
            src={Test1}
            alt="Patient"
          />
          <div>
            <h2 className="text-2xl font-bold ">{patientData.name}</h2>
            <p className="text-gray-400">{patientData.occupation}</p>
          </div>
        </div>

        <div className="w-[1230px] bg-n-11 top-[130px] rounded-b-md absolute h-[60vh] -left-[54px]">
          {" "}
        </div>
        <div className="space-y-7 grid grid-cols-3 gap-5 ">
          <div className="relative top-3">
            <h3 className="text-lg font-semibold text-gray-500 relative">
              Personal Information
            </h3>

            <div>
              <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                <span className="font-semibold text-lg  ">Phone:</span>{" "}
                {patientData.phone}
              </p>
              <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                <span className="font-semibold text-lg">Age:</span>{" "}
                {patientData.age}
              </p>
              <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                <span className="font-semibold text-lg">Blood Group:</span>{" "}
                {patientData.bloodGroup}
              </p>
              <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                <span className="font-semibold text-lg">Gender:</span>{" "}
                {patientData.gender}
              </p>
            </div>
          </div>

          <div className="relative -top-4">
            <h3 className="text-lg font-semibold text-gray-500">Address</h3>
            <p className="bg-transparent text-white px-2 py-1 w-[75%] h-[60%] m-1 list-none rounded-sm">
              {patientData.address}
            </p>
          </div>

          <div className="relative -top-4">
            <h3 className="text-lg font-semibold text-gray-500">
              Last Appointments
            </h3>
            <ul>
              {patientData.lastAppointments.map((appointment, index) => (
                <li
                  key={index}
                  className="bg-transparent text-white px-2 py-1 w-[75%] m-1 list-none rounded-sm"
                >
                  {appointment}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold text-gray-500">Diagnostics</h3>
            <p className="bg-transparent text-white px-2 py-1 w-[75%] m-1 list-none rounded-sm">
              {patientData.diagnostics}
            </p>
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold text-gray-500">
              Emergency Contact
            </h3>
            <p className="bg-transparent text-white px-2 py-1 w-[75%] m-1 list-none rounded-sm">
              {patientData.emergencyContact}
            </p>
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold text-gray-500">Insurance</h3>
            <p className="bg-transparent text-white px-2 py-1 w-[75%] m-1 list-none rounded-sm">
              {patientData.insurance}
            </p>
          </div>

          <div className="mt-6 relative -top-2 flex gap-5">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Change Password
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div> */
}
