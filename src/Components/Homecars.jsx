import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiCarSeat } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";
import { FaGasPump, FaCarSide } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Homecars = () => {
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

  if (loading)
    return <div className="text-center text-white p-10">Loading cars...</div>;
  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;

  return (
    <div>
      <div className="mt-5 w-60 gap-2 flex justify-center items-center border border-amber-300 ml-140 mr-40 p-1 rounded-2xl bg-gray-950">
        <h1 className="text-yellow-400">Premium Fleet Selection</h1>
      </div>

      <h1 className="text-orange-500 flex justify-center mt-5 text-5xl italic">
        Luxury Car Collections
      </h1>
      <p className="text-white text-xl flex justify-center mt-2">
        Discover our premium range of vehicles — all available for booking!
      </p>

      <div className="mt-10 grid grid-cols-3 gap-8 px-20">
        {cars.map((car) => (
          <div
            key={car._id}
            className="border border-gray-400 w-full rounded-4xl transition-transform duration-300 hover:-translate-y-4 hover:-translate-x-4 bg-gray-900"
          >
            <img
              className="h-60 w-full object-cover rounded-t-3xl"
              src={`http://localhost:5000/uploads/${car.image}`}
              alt={car.make}
            />

            <div className="ml-10 mt-3">
              <h1 className="text-white text-xl">{car.make}</h1>
              <p className="text-orange-500 border border-gray-800 w-40 text-center rounded-2xl p-1 bg-gray-950">
                {car.category || "Unknown"}
              </p>
              <p className="text-white font-semibold">₹{car.dailyRate}/day</p>
            </div>

            <div className="flex ml-10 gap-5 mt-5">
              <div>
                <GiCarSeat className="text-gray-500 text-2xl w-10 h-10 border border-gray-600 rounded-full p-2 bg-gray-950" />
                <p className="text-white mt-2 text-center">{car.seats}</p>
              </div>

              <div>
                <FaGasPump className="text-gray-500 text-2xl w-10 h-10 border border-gray-600 rounded-full p-2 bg-gray-950" />
                <p className="text-white mt-2">{car.fuelType}</p>
              </div>

              <div>
                <MdSpeed className="text-gray-500 text-2xl w-10 h-10 border border-gray-600 rounded-full p-2 bg-gray-950" />
                <p className="text-white mt-2">{car.mileage}</p>
              </div>

              <div>
                <FaCarSide className="text-gray-500 text-2xl w-10 h-10 border border-gray-600 rounded-full p-2 bg-gray-950" />
                <p className="text-white mt-2">{car.transmission}</p>
              </div>
            </div>

            
            <button
              className="text-white mt-5 ml-10 mb-5 border border-gray-400 px-4 py-2 rounded-lg bg-orange-500 font-bold hover:bg-orange-700"
              onClick={() => navigate(`/car/${car._id}`)}
            >
              Book Now →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homecars;
