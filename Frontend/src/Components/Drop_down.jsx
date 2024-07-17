import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useContext } from "react";
import dataContext from "./../Context/contextProvider";
import cat from "./../images/catto.jpg";
import { motion, AnimatePresence } from "framer-motion";
const Drop_down = () => {
  //hooks context
  const { doctors, setDoctorsSelected, slotBookingList } =
    useContext(dataContext);
  //internal hooks
  const [showDrop, setShowDrop] = React.useState(false);
  const [selected, setSelected] = React.useState({
    id: 1,
    doctor: "doctor1",
    email: "doctor1@doctor.com",
    specialty: "Pathologist",
    user: 8,
  });

  //this click for dropdowns
  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  //this click for selecting the doctor
  const handleSelect = (e) => {
    const Id = e.currentTarget.id;
    let selectedDoc = doctors.find((doc) => doc?.id === Number(Id));
    slotBookingList(selectedDoc.id);
    console.log(selectedDoc, typeof selectedDoc);
    setSelected(selectedDoc);
    setDoctorsSelected(selectedDoc);
    setShowDrop(false);
  };

  const pageVariants = {
    initial: {
      height: "0px",
      opacity: 0,
    },
    in: {
      height: "13.5vh",
      opacity: 1,
    },
    out: {
      height: "0px",
      opacity: 0,
    },
  };
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  //dropdown elements
  const el = doctors.map((doc) => (
    <motion.div
      id={doc.id}
      key={doc.id}
      onClick={handleSelect}
      className="bg-n-8 h-[12vh] rounded-md"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="bg-n-5 rounded-md cursor-pointer mx-1 h-[12vh] flex justify-center items-center gap-4 px-4">
        <img
          src={cat}
          height={50}
          width={50}
          alt="cat"
          className="rounded-full"
        />
        <div className="">
          <h1 className="text-[24px] font-semibold">{doc.doctor}</h1>
          <p className="text-[13px] font-openSans opacity-80">
            {doc.specialty}
          </p>
        </div>
      </div>
    </motion.div>
  ));

  return (
    // visible element
    <div className="flex ">
      <div>
        <div className="flex justify-evenly gap-4 items-center ">
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
      <AnimatePresence>
        {showDrop ? (
          <motion.div className=" absolute top-[13vh] left-[75px] w-[273px] z-10 ">
            {el}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Drop_down;
