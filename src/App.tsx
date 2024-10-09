import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";
import Homepage from "./pages/Homepage.tsx";
import Login from "./pages/Login.tsx";
import AuthWrapper from "./routes/AuthWrapper.tsx";
import Service from "./pages/Service.tsx";
import PrenotaOnline from "./pages/PrenotaOnline.tsx";
import PrivateTables from "./pages/PrivateTables.tsx";

const router = createBrowserRouter([
  { path: "/auth", element: <Login />, errorElement: <PageNotFound /> },
  { path: "/", element: <Homepage />, errorElement: <PageNotFound /> },
  {
    element: <AuthWrapper />,
    children: [
      { path: "/prenotazione", element: <PrenotaOnline /> },
      { path: "/services", element: <Service /> },
      { path: "/appointments", element: <PrivateTables /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
