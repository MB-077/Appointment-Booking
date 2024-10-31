import React, { useContext, useEffect, useState } from "react";
import { Button } from "./../Service/im-ex-ports";
import axios from "axios";
import dataContext from "./../Context/contextProvider";
import ConfirmCancel from "../Components/ConfirmCancel";
import { PayPalButtons } from "@paypal/react-paypal-js";

const ViewYours = () => {
  const { total_slots } = useContext(dataContext);
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [isAppointed, setIsAppointed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sure, setSure] = useState(false);

  const appointedCancel = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/appointments/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      const info = await response.data;
      console.log(info);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const fetchData = async (url) => {
    if (!token) throw new Error("Token not found");

    const response = await axios.get(url, {
      headers: { Authorization: `token ${token}` },
    });
    if (response.status !== 200) {
      throw {
        message: "Failed to fetch data",
        statusText: response.statusText,
        status: response.status,
      };
    }
    const info = await response.data;
    if (info.length > 0) {
      setIsAppointed(true);
    }
    setAppointments(info);
    console.log(info);

    return response.data;
  };

  const handleCancel = (e) => {
    setSure(true);
    const appointment = appointments.find(
      (el) => el.id === parseInt(e.target.id)
    );
    setSelected(appointment);
  };

  const handleclose = (isConfirmed) => {
    if (isConfirmed && selected) {
      let id = selected.id;

      const updatedAppointments = appointments.filter((el) => el.id !== id);
      setAppointments(updatedAppointments);

      appointedCancel(id);
      if (appointments.length === 0) {
        setIsAppointed(false);
      }
      setSure(false);
      setSelected(null);
    } else {
      setSure(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDown);
  }, []);

  const handleDown = (e) => {
    e.key === "Escape" ? setSure(false) : null;
  };

  useEffect(() => {
    fetchData("http://127.0.0.1:8000/appointments/");
  }, []);

  const Display = isAppointed ? (
    appointments.map((el) => {
      return (
        <div key={el.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="flexRB mb-2">
            <h2 className="text-lg font-bold">{el.doctor}</h2>
            <span className="text-md text-gray-700">{el.date}</span>
          </div>
          <p className="text-gray-700 mb-2">Patient: {el.patient}</p>
          <p className="text-gray-700 mb-2">
            Time Slot:{" "}
            {total_slots.find((slot) => slot.id === el.time_slot)?.start_time}
          </p>
          <p
            className={`text-gray-700 mb-2 font-semibold ${
              el.is_approved ? "text-green-900" : "text-red-900"
            }`}
          >
            Status: {el.is_approved ? "Approved" : "Pending"}
          </p>
          <div className="flexR gap-5">
            <p className="text-gray-700 mb-2">
              Reschedule Requested: {el.reschedule_requested ? "Yes" : "No"}
            </p>
            <Button id={el.id} className={`btnBlue`}>
              Reschedule Now
            </Button>
          </div>
          <div className="relative">
            <p className="text-gray-700 mb-2">Fee : &#8377; 500</p>
            <PayPalButtons
              style={{
                shape: "rect",
                layout: "vertical",
                color: "gold",
                label: "paypal",
              }}
              createOrder={async () => {
                try {
                  const response = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                      cart: [
                        {
                          id: "YOUR_PRODUCT_ID",
                          quantity: "YOUR_PRODUCT_QUANTITY",
                        },
                      ],
                    }),
                  });

                  const orderData = await response.json();

                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);

                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(`Could not initiate PayPal Checkout...${error}`);
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await fetch(
                    `/api/orders/${data.orderID}/capture`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  const orderData = await response.json();
                  // Three cases to handle:
                  //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  //   (2) Other non-recoverable errors -> Show a failure message
                  //   (3) Successful transaction -> Show confirmation or thank you message

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    setMessage(
                      `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                    );
                    console.log(
                      "Capture result",
                      orderData,
                      JSON.stringify(orderData, null, 2)
                    );
                  }
                } catch (error) {
                  console.error(error);
                  setMessage(
                    `Sorry, your transaction could not be processed...${error}`
                  );
                }
              }}
            />
            <Button id={el.id} className={`w-full btnBlue`} func={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      );
    })
  ) : (
    <h1 className="text-2xl text-center text-white">No Appointments</h1>
  );
  return (
    <div>
      <div className="flex items-center justify-center">
        <ConfirmCancel isVisible={sure} func={handleclose} />
      </div>
      <div className=" flex gap-5 mt-8 ml-8 ">{Display}</div>
    </div>
  );
};

export default ViewYours;
