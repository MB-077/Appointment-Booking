import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import TimeSlot from "./TimeSlot";
import CalendarFunc from "./Calendar";
import { SLOT1, SLOT2, SLOT3 } from "../Constant/Nitya";
const Section = () => {
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
          ></TimeSlot>

          <TimeSlot
            Time="Evening"
            duration="5:00 AM to 6:30 PM"
            icon={<FiSunset></FiSunset>}
            slotTime={SLOT2}
          ></TimeSlot>

          <TimeSlot
            Time="Waiting List"
            duration=""
            icon={<MdAccessTime></MdAccessTime>}
            slotTime={SLOT3}
          ></TimeSlot>
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
