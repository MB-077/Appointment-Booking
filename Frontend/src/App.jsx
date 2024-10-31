import {
  Dashboard,
  Layout,
  Profile,
  SlotBook,
  ViewYours,
  History,
  Register,
  Login,
  Authrequire,
  PageNotFound,
  ErrorComp,
  EmailVerify,
} from "./Service/im-ex-ports";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { loginloaders } from "./Pages/Login";
import AllDataProvider from "./Context/dataContext";
import ResetPassWord from "./Pages/ResetPassWord";
import ChangePassWord from "./Pages/ChangePassWord";
import DoctorQuery from "./Components/DoctorQuery";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

function Message({ content }) {
  return <p>{content}</p>;
}

function App() {
  const initialOptions = {
    "client-id":
      "Aeo0dRD7XYJHJCt9k7E071mfr-kJsZElAcZv3SF1gJGmk7baqW1ypZOgGYLawXsTeRoXMYa9vpqRtMMY",
    "enable-funding": "venmo",
    "buyer-country": "IN",
    currency: "INR",
    components: "buttons",
  };

  const [message, setMessage] = React.useState("");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/doctor" element={<DoctorQuery />} />
        <Route path="/emailVerify/:uid/:token" element={<EmailVerify />} />
        <Route path="/resetPass" element={<ResetPassWord />} />
        <Route path="/" element={<Layout />} errorElement={<ErrorComp />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} loader={loginloaders} />
          <Route path="register" element={<Register />} />

          <Route
            path="slots"
            element={<SlotBook />}
            loader={async () => Authrequire()}
          />
          <Route
            path="booked"
            element={<ViewYours />}
            loader={async () => Authrequire()}
          />
          <Route
            path="history"
            element={<History />}
            loader={async () => Authrequire()}
          />

          <Route
            path="profile"
            element={<Profile />}
            loader={async () => Authrequire()}
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="changePass" element={<ChangePassWord />} />
        </Route>
      </Route>
    )
  );

  return (
    <AllDataProvider>
      <PayPalScriptProvider options={initialOptions}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </AllDataProvider>
  );
}

export default App;
