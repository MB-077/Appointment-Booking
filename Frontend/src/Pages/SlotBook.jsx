import React from "react";
import axios from "axios";
const SlotBook = () => {
  const [slot, setSlot] = React.useState({});
  const SlotFetch = async () => {
    const response = await axios.get("");
    // setSlot(response.data);
    console.log(response.data);
    console.log(response);
  };
  React.useEffect(() => {
    SlotFetch();
  }, []);

  console.log(slot);
  return <div>SlotBook</div>;
};

export default SlotBook;
