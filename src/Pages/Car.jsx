import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");

       
        const responseData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        if (!Array.isArray(responseData)) {
          throw new Error("Backend did not return an array");
        }

        setCars(responseData);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBook = (id) => {
    navigate(`/car/${id}`);
  };

  if (loading)
    return <div className="text-center text-white p-10">Loading cars...</div>;

  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;

  return (
    <div className="bg-black h-full">
      <Navbar />
      <div className="p-10 bg-black min-h-screen">
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-gray-800 p-5 rounded-2xl border border-gray-700 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <img
                className="h-48 w-full object-cover rounded-lg"
                src={`http://localhost:5000/uploads/${car.image}`}
                alt={car.make}
              />

              <div className="mt-4 text-center space-y-2">
                <h2 className="text-white font-bold text-xl tracking-wide">
                  {car.make}
                </h2>
                <p className="text-orange-400 font-semibold text-lg">
                  ₹ {car.dailyRate}/day
                </p>
                <p className="text-gray-300 text-sm uppercase tracking-wider">
                  {car.category || "Unknown"}
                </p>
              </div>

              <div className="flex justify-around w-full mt-4 text-gray-300 text-sm">
                <p className="flex flex-col items-center">
                  <span className="font-bold">{car.seats}</span>
                  <span>Seats</span>
                </p>
                <p className="flex flex-col items-center">
                  <span className="font-bold">{car.fuelType}</span>
                  <span>Fuel</span>
                </p>
                <p className="flex flex-col items-center">
                  <span className="font-bold">{car.mileage}</span>
                  <span>Mileage</span>
                </p>
              </div>

              <button
                onClick={() => handleBook(car._id)}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Car;
