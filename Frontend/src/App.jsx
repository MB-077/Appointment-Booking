import {
  Dashboard,
  Layout,
  Profile,
  SlotBook,
  ViewYours,
  History,
  Register,
  Login,
} from "./im-ex-ports";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { loginloaders } from "./Pages/Login";
import { Authrequire } from "./authRequire";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} loader={loginloaders} />
        <Route path="register" element={<Register />} />
        <Route
          path="slots"
          element={<SlotBook />}
          loader={async () => await Authrequire()}
        />
        <Route
          path="profile"
          element={<Profile />}
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
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
