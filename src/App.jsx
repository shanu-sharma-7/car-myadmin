
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Car from "./Pages/Car";
import Cardetails from "./Pages/Cardetails";
import Homecardetails from "./Pages/Homecardetails";
import MyBookings from "./Pages/myBookings";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/car" element={<Car />} />
      <Route path="/car/:id" element={<Cardetails />} />
      <Route path="/book/:id" element={<Homecardetails />} />
      <Route path="/booking" element={<MyBookings />} />

      {/* Login aur Create Account routes removed */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-[#090909] px-4 text-center text-white">
            <div>
              <h1 className="text-3xl font-bold">Page Not Found</h1>
              <p className="mt-3 text-gray-400">
                The page you are looking for does not exist.
              </p>
              <a
                href="/"
                className="mt-6 inline-block rounded-lg bg-[#c9a96e] px-6 py-3 font-semibold text-black"
              >
                Back to Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
