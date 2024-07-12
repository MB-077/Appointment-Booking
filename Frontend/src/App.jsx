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
  SlotLayout,
} from "./im-ex-ports";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { loginloaders } from "./Pages/Login";
import ErrorComp from "./Components/ErrorComp";
import { AllDataProvider } from "./Context/dataContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorComp />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} loader={loginloaders} />
        <Route path="register" element={<Register />} />
        <Route path="slots" element={<SlotLayout />}>
          <Route
            index
            element={<SlotBook />}
            loader={async () => await Authrequire()}
          />
          <Route
            path="booked"
            element={<ViewYours />}
            loader={async () => await Authrequire()}
          />
          <Route
            path="history"
            element={<History />}
            loader={async () => await Authrequire()}
          />
        </Route>
        <Route
          path="profile"
          element={<Profile />}
          loader={async () => await Authrequire()}
        />
        <Route path="*" element={<PageNotFound />} />
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
