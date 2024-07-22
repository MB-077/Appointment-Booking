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
} from "./im-ex-ports";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { loginloaders } from "./Pages/Login";
import AllDataProvider from "./Context/dataContext";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
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
