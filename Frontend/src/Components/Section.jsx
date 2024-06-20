import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import TimeSlot from "./TimeSlot";
import CalendarFunc from "./Calendar";

const Section = () => {
  const slotTime1 = [
    "9:00 AM",
    "9:10 AM",
    "9:20 AM",
    "9:30 AM",
    "9:40 AM",
    "9:50 AM",
    "10:00 AM",
    "10:10 AM",
    "10:20 AM",
    "10:30 AM",
  ];
  const slotTime2 = [
    "5:00 AM",
    "5:10 AM",
    "5:20 AM",
    "5:30 AM",
    "5:40 AM",
    "5:50 AM",
    "6:00 AM",
    "6:10 AM",
    "6:20 AM",
    "6:30 AM",
  ];
  const slotTime3 = [];
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
            slotTime={slotTime1}
          ></TimeSlot>

          <TimeSlot
            Time="Evening"
            duration="5:00 AM to 6:30 PM"
            icon={<FiSunset></FiSunset>}
            slotTime={slotTime2}
          ></TimeSlot>

          <TimeSlot
            Time="Waiting List"
            duration=""
            icon={<MdAccessTime></MdAccessTime>}
            slotTime={slotTime3}
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
