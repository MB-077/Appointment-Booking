import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import dataContext from "./../Context/contextProvider";
import cat from "./../Images/catto.jpg";

const DoctorSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [touch, setTouch] = useState(false);
  const { doctors, setDoctorsSelected, slotBookingList } =
    useContext(dataContext);

  const handleSearch = (event) => {
    setTouch(true);
    const value = event.target.value.toLowerCase();
    setQuery(value);
    if (value === "") {
      setResults([]);
    } else {
      const filteredDoctors = doctors.filter(
        (el) =>
          el?.doctor.toLowerCase().includes(value) ||
          el?.specialty.toLowerCase().includes(value) ||
          el?.id === Number(value)
      );

      setResults(filteredDoctors);
    }
  };

  const handleSelect = (e) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const Id = e.currentTarget.id;
    console.log(Id);
    let selectedDoc = doctors.find((doc) => doc?.id === Number(Id));
    slotBookingList(selectedDoc.id);
    setDoctorsSelected(selectedDoc);
    setQuery(selectedDoc.doctor);
    setTouch(false);
  };
  return (
    <div>
      <div className="h-[10vh] w-[300px] z-10 relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="doctor1"
          className="mb-4 p-2 border border-gray-300 dark:border-black rounded w-full max-w-md placeholder:text-black dark:text-black "
        />
        <div className="w-full max-w-md h-[15vh] overflow-y-auto ">
          {touch ? (
            <AnimatePresence>
              {results.length > 0
                ? results.map((doctor, index) => (
                    <motion.div
                      id={doctor.id}
                      key={doctor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={handleSelect}
                      className="p-4 mb-2 bg-white border dark:bg-black border-gray-300 rounded cursor-pointer flex gap-2"
                    >
                      <h2 className="text-xl font-semibold">{doctor.doctor}</h2>
                      <p>{doctor.specialty}</p>
                    </motion.div>
                  ))
                : query && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500"
                    >
                      No items found
                    </motion.p>
                  )}
            </AnimatePresence>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
