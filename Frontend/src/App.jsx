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
} from "./im-ex-ports";
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
function App() {
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
      <RouterProvider router={router} />
    </AllDataProvider>
  );
}

export default App;
