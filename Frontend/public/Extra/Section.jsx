import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import TimeSlot from "./TimeSlot";
import CalendarFunc from "./Calendar";
import { SLOT1, SLOT2, SLOT3 } from "../Constant/Nitya";
import React, { useState } from "react";
import Button from "./Button";
const Section = () => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(SLOT3);
  return (
    <div className="w-full h-[88vh] bg-n-5 relative top-[12vh]">
      {/* header for the Section */}

      <div className="absolute left-10 top-6">
        <div className="flex w-[350px] justify-center items-center">
          <div className="text-[20px] text-n-4/70 px-2">Appointments </div>
          <div> | Home {">"} Appointments</div>
        </div>
      </div>

      <div className="flex">
        {/* space for the section  */}
        <div className="relative top-10 mx-16  grid gap-5 w-full">
          <TimeSlot
            Time="Morning"
            duration="9:00 AM to 10:30 AM"
            icon={<FiSunrise></FiSunrise>}
            slotTime={SLOT1}
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          ></TimeSlot>

          <TimeSlot
            Time="Evening"
            duration="5:00 AM to 6:30 PM"
            icon={<FiSunset></FiSunset>}
            slotTime={SLOT2}
            selectedTimeSlots={selectedTimeSlots}
            setSelectedTimeSlots={setSelectedTimeSlots}
          ></TimeSlot>

          <div className="relative top-[5vh] left-0 px-10 bg-white  w-2/3 ">
            <h2 className="py-3">Confirmed Time Slots</h2>
            <div className="flex gap-10 pb-5">
              {selectedTimeSlots.map((slot) => (
                <p
                  className="font-semibold text-n-4 font-openSans border-n-2  relative border  flex justify-evenly items-center px-2 py-2 rounded-[4px] w-[130px]"
                  key={slot.id}
                >
                  {slot.start}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className=" absolute top-20 right-12">
          {/* calendar for the section */}
          <CalendarFunc />
        </div>
      </div>
    </div>
  );
};

export default Section;
