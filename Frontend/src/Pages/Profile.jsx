import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFields from "../Components/InputFields";
import Button from "./../Components/Button";
// export function profileLoader({ request }) {
//   return newURL(request.url).searchParams.get("message");
// }

const PatientProfile = ({ userId }) => {
  const [profileData, setProfileData] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    age: "",
    zipCode: "",
    contact: "",
    gender: "",
    blood_group: "",
    address: "",
    occupation: "",
    diagnostics: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

  React.useEffect(() => {
    // Fetch profile data after form is submitted
    if (isFormSubmitted) {
      axios
        .get(`http://127.0.0.1:8000/patients/${userId}`)
        .then((response) => setProfileData(response.data))
        .catch((error) => console.error(error));
    }

    // Reminder to fill out the profile form every 5 minutes
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to the server
    axios
      .post(`http://127.0.0.1:8000/patients/${userId}`, formData)
      .then(() => {
        setIsFormSubmitted(true);
        toast.dismiss();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-6 bg-red-300 h-[80vh] shadow-lg rounded-lg text-white">
      {!isFormSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-full bg-green-400 w-full"
        >
          <div className="grid grid-cols-3 h-[85%] bg-purple-600  place-items-center  w-full">
            <InputFields
              label={"Name"}
              type={"text"}
              name={"name"}
              func={handleChange}
            />
            <InputFields
              label={"Email"}
              type={"email"}
              name={"email"}
              func={handleChange}
            />
            <InputFields
              label={"Age"}
              type={"number"}
              name={"age"}
              func={handleChange}
            />
            <InputFields
              label={"ZipCode"}
              type={"number"}
              name={"zipCode"}
              func={handleChange}
            />
            <InputFields
              label={"Address"}
              type={"address"}
              name={"address"}
              func={handleChange}
            />
            <InputFields
              label={"Contact"}
              type={"number"}
              name={"contact"}
              func={handleChange}
            />
            <InputFields
              label={"Gender"}
              type={"text"}
              name={"gender"}
              func={handleChange}
            />
            <InputFields
              label={"Blood Group"}
              type={"text"}
              name={"blood_group"}
              func={handleChange}
            />
            <InputFields
              label={"Occupation"}
              type={"text"}
              name={"occupation"}
              func={handleChange}
            />
            <InputFields
              label={"Diagnostics"}
              type={"text"}
              name={"diagnostics"}
              func={handleChange}
            />
          </div>
          <Button
            type="submit"
            className={`px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700`}
          >
            Submit
          </Button>
        </form>
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
