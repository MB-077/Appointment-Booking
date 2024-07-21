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
  // const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [isFormEditing, setIsFormEditing] = React.useState(false);

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
  const [el] = profileData;
  const postData = async () => {
    if (isFormEditing) {
      console.log(formData);
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/patients-detail/${el?.id}/`,
          formData,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFormEditing(false);
      }
    } else {
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
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
  };

  const handleEdit = () => {
    setFormData({
      patient_id: `${id_main}`,
      age: el?.age,
      gender: el?.gender,
      address: el?.address,
      blood_group: el?.blood_group,
      zip_code: el?.zip_code,
    });
    setIsFormEditing(true);
    console.log(formData);
  };
  const handlePassword = () => {};

  return (
    <div className="p-6  h-[80vh]  rounded-lg text-white">
      {profileData.length === 0 || isFormEditing ? (
        <div>
          <h2 className="text-2xl text-center mb-8 ">
            {isFormEditing
              ? "Edit your profile"
              : "Fill in the details to book a slot"}
          </h2>
          <form onSubmit={handleSubmit} className=" h-[64.6vh]">
            <div className="grid grid-cols-3  h-full  m-5">
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Age</p>
                <input
                  type="number"
                  name="age"
                  placeholder=" Your age here"
                  className="profile_inputs"
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
                  className="profile_inputs"
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
                  className="profile_inputs"
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
                  className=" profile_inputs"
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
                  className=" profile_inputs"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.zip_code}
                />
              </div>
            </div>

            <Button
              type="submit"
              func={handleSubmit}
              className={`px-6 py-2 relative -top-[68px] mx-5 bg-blue-500 rounded-lg hover:bg-blue-700`}
            >
              {isFormEditing ? "Update" : "Submit"}
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
                <h3 className="profile_span text-gray-500 relative">
                  Personal Information
                </h3>

                <div>
                  <p className="profile_full">
                    <span className="profile_span">Age:</span> {el.age}
                  </p>
                  <p className="profile_full">
                    <span className="">Blood Group:</span> {el.blood_group}
                  </p>
                  <p className="profile_full">
                    <span className="profile_span">Gender:</span> {el.gender}
                  </p>
                  <p className="profile_full">
                    <span className="profile_span">ZipCode: </span>{" "}
                    {el.zip_code}
                  </p>
                  <p className="profile_full">
                    <span className="profile_span">Mobile: </span>{" "}
                    {info.phone_number}
                  </p>
                </div>
              </div>

              <div className="relative -top-4">
                <h3 className="profile_span text-gray-500">Address</h3>
                <p className="profile_60">{el.address}</p>
              </div>

              <div className="relative -top-4">
                <h3 className="profile_span text-gray-500">
                  Last Appointments
                </h3>
                <p>No Appointments till now</p>
              </div>

              <div className="mt-6 relative h-[50px] top-[45px] flex gap-10">
                <Button className={`btnBlue`} func={handlePassword}>
                  Change Password
                </Button>
                <Button className={`btnBlue`} func={handleEdit}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
