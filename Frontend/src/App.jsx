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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="slots" element={<SlotBook />} />
        <Route path="profile" element={<Profile />} />
        <Route path="booked" element={<ViewYours />} />
        <Route path="history" element={<History />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
