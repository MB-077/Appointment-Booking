import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./../Components/Button";
import axios from "axios";
import cat from "./../images/catto.jpg";
// export function profileLoader({ request }) {
//   return newURL(request.url).searchParams.get("message");
// }

const PatientProfile = ({ userId }) => {
  //getting the user Id
  const userME = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  const info = JSON.parse(userME);
  const id_main = info.patient_id;

  const [profileData, setProfileData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    patient_id: `${id_main}`,
    age: "",
    gender: "",
    address: "",
    blood_group: "",
    zip_code: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/patients-detail/`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    if (profileData.length === 0) {
      const interval = setInterval(() => {
        if (profileData.length === 0) {
          toast.info("Please fill out your profile form.", {
            autoClose: false,
          });
        }
      }, 300000);

      return () => clearInterval(interval);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "patient_id") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/patients-detail/`,
        formData,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsFormSubmitted(true);
      toast.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
  };

  const [el] = profileData;
  return (
    <div className="p-6  h-[80vh]  rounded-lg text-white">
      {profileData.length === 0 ? (
        <div>
          <h2 className="text-2xl text-center mb-8 ">
            Fill in the details to book a slots
          </h2>
          <form onSubmit={handleSubmit} className=" h-[64.6vh]">
            <div className="grid grid-cols-3  h-full  m-5">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Age</p>
                <input
                  type="number"
                  name="age"
                  placeholder=" Your age here"
                  className=" px-3 py-2 w-[300px] rounded-[3px] text-[17px] bg-transparent border-[2px] border-white outline-none"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.age}
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
                  value={formData.gender}
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
                  value={formData.address}
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
                  value={formData.blood_group}
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
                  value={formData.zip_code}
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
        <div className="w-full  bg-gradient text-white p-6 font-semibold rounded-lg shadow-md h-[76vh]">
          <div className="absolute left-[22rem]">
            <div className="flex items-center space-x-6 mb-[26px] ">
              <img
                className="w-28 h-28 rounded-full object-cover"
                src={cat}
                alt="Patient"
              />
              <div>
                <h2 className="text-4xl tracking-wider font-bold ">
                  {el.patient.charAt(0).toUpperCase() + el.patient.slice(1)}
                </h2>
              </div>
            </div>

            <div className="w-[1230px] bg-n-11 top-[130px] rounded-b-md absolute h-[56vh] -left-[54px]">
              {" "}
            </div>
            <div className="space-y-7 grid grid-cols-3 gap-5 ">
              <div className="relative top-3">
                <h3 className="text-lg font-semibold text-gray-500 relative">
                  Personal Information
                </h3>

                <div>
                  {/* <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                    <span className="font-semibold text-lg  ">Phone:</span>{" "}
                    {el.phone}
                  </p> */}
                  <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                    <span className="font-semibold text-lg">Age:</span> {el.age}
                  </p>
                  <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                    <span className="font-semibold text-lg">Blood Group:</span>{" "}
                    {el.bloodGroup}
                  </p>
                  <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                    <span className="font-semibold text-lg">Gender:</span>{" "}
                    {el.gender}
                  </p>
                  <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                    <span className="font-semibold text-lg">ZipCode: </span>{" "}
                    {el.zip_code}
                  </p>
                  <p className="bg-transparent text-white px-2 py-1 w-[75%] h-full m-1 list-none rounded-sm">
                    <span className="font-semibold text-lg">Mobile: </span>{" "}
                    {info.phone_number}
                  </p>
                </div>
              </div>

              <div className="relative -top-4">
                <h3 className="text-lg font-semibold text-gray-500">Address</h3>
                <p className="bg-transparent text-white px-2 py-1 w-[75%] h-[60%] m-1 list-none rounded-sm">
                  {el.address}
                </p>
              </div>

              <div className="relative -top-4">
                <h3 className="text-lg font-semibold text-gray-500">
                  Last Appointments
                </h3>
                <p>No Appointments till now</p>
              </div>

              <div className="relative">
                <h3 className="text-lg font-semibold text-gray-500">
                  Emergency Contact
                </h3>
                <p className="bg-transparent text-white px-2 py-1 w-[75%] m-1 list-none rounded-sm">
                  {el.emergencyContact}
                </p>
              </div>

              <div className="relative">
                <h3 className="text-lg font-semibold text-gray-500">
                  Insurance
                </h3>
                <p className="bg-transparent text-white px-2 py-1 w-[75%] m-1 list-none rounded-sm">
                  No details
                </p>
              </div>

              <div className="mt-6 relative h-[50px] -top-2 flex gap-10">
                <button className="bg-blue-500 text-white px-4  rounded-md">
                  Change Password
                </button>
                <button className="bg-blue-500 text-white px-4 rounded-md">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PatientProfile;
