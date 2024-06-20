import Button from "./Button";
const TimeSlot = ({ Time, duration, icon, slotTime }) => {
  return (
    <div className="bg-white relative top-10 w-2/3 px-5 ">
      {/* header of slot space */}
      <div className="flex justify-between my-4">
        <div className="flex items-center gap-3">
          <div>{icon}</div>
          <div>
            <div>{Time}</div>
            <div className="opacity-60 text-[12px]">{duration}</div>
          </div>
        </div>
      </div>

      {/* slot space */}
      <div className="grid grid-rows-2 grid-cols-5 bg-white gap-4 mb-5">
        {slotTime.length > 0 ? (
          slotTime.map((obj) => {
            return (
              <Button key={obj.id} isBooked={obj.isBooked}>
                {obj.start}
              </Button>
            );
          })
        ) : (
          <div>{""}</div>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
