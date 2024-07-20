import React from "react";
import Test1 from "./../images/catto.jpg";
const PatientProfile = () => {
  // const user = localStorage.getItem("user");
  // const info = JSON.parse(user);

  const patientData = {
    name: "Test1",
    phone: "123-456-7890",
    age: 30,
    bloodGroup: "O+",
    gender: "Male",
    occupation: "Software Engineer",
    address:
      "Bhadson Rd, Adarsh Nagar, Prem Nagar, Patiala, Punjab 145004, India",
    lastAppointments: ["2023-07-01", "2023-06-15"],
    diagnostics: "Healthy",
    emergencyContact: "Jane Doe - 987-654-3210",
    insurance: "Yamraj Health Insurance",
  };

  return (
    <div className="w-full  bg-gradient text-white p-6 font-semibold rounded-lg shadow-md h-[80vh]">
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

          <div className="mt-6 relative ">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
