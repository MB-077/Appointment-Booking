import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useContext } from "react";
import dataContext from "./../Context/contextProvider";
import cat from "./../images/catto.jpg";
const Drop_down = () => {
  const { doctors, setDoctorsSelected } = useContext(dataContext);
  const [showDrop, setShowDrop] = React.useState(false);
  const [selected, setSelected] = React.useState({
    id: 1,
    doctor: "doctor1",
    email: "doctor1@doctor.com",
    specialty: "general",
    user: 8,
  });
  console.log(doctors);

  //this click for dropdowns
  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  //this click for selecting the doctor
  const handleSelect = (e) => {
    const Id = e.currentTarget.id;
    console.log(Id);
    let selectedDoc = doctors.find((doc) => doc?.id === Number(Id));
    console.log(selectedDoc);
    setSelected(selectedDoc);
    setDoctorsSelected(selectedDoc);
    setShowDrop(false);
  };

  //dropdown elements
  const el = doctors.map((doc) => (
    <div
      id={doc.id}
      key={doc.id}
      onClick={handleSelect}
      className="bg-pink-400 border-2 border-n-1 cursor-pointer"
    >
      <img
        src={cat}
        height={50}
        width={50}
        alt="cat"
        className="rounded-full"
      />
      <div className="">
        <h1 className="text-[24px] font-semibold">{doc.doctor}</h1>
        <p className="text-[13px] font-openSans opacity-80">{doc.specialty}</p>
      </div>
    </div>
  ));

  return (
    // visible element
    <div className="flex">
      <div>
        <div className="flex justify-evenly items-center border-r border-r-n-1/5">
          <img
            src={cat}
            height={50}
            width={50}
            alt="cat"
            className="rounded-full"
          />
          <div className="">
            <h1 className="text-[24px] font-semibold">Dr. {selected.doctor}</h1>
            <p className="text-[13px] font-openSans opacity-80">
              {selected.specialty}
            </p>
          </div>
          <div onClick={handleClick}>
            <IoIosArrowDown className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* //Drop_down */}
      {showDrop ? (
        <div className="bg-red-400 absolute top-[12vh] left-[187.5px] w-[350px]">
          {el}
        </div>
      ) : null}
    </div>
  );
};

export default Drop_down;
