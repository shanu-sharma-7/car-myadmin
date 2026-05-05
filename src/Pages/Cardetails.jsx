import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  const [pickupLocation, setPickupLocation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingStatus, setBookingStatus] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL; 

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Car not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays >= 1 ? Math.ceil(diffDays) : 0; 
  };
  
  useEffect(() => {
    setTotalDays(calculateDays(pickupDate, returnDate));
  }, [pickupDate, returnDate]);

  const totalRent = totalDays * (car?.dailyRate || 0);

  const handleBooking = async () => {
    if (!pickupDate || !returnDate || !fullName || !email || !phoneNumber || totalDays <= 0) {
      setBookingStatus({ type: 'error', message: 'Kripya sabhi jaankari bharein aur sahi tareekhein chunein.' });
      return;
    }

    if (!car || !car._id) {
      setBookingStatus({ type: 'error', message: 'Car details abhi load nahi hui hai.' });
      return;
    }

    const token = localStorage.getItem('token'); 
    if (!token) {
      setBookingStatus({ type: 'error', message: 'Booking se pehle kripya Login karein.' });
      return; 
    }

    try {
      const bookingData = {
        car: { 
          id: car._id,
          make: car.make,
          dailyRate: car.dailyRate,
          model: car.model || '',
          image: car.image || '',
        }, 
        pickupDate,
        returnDate,
        totalDays,
        amount: totalRent, 
        address: {
          city: pickupLocation, 
          street: "N/A",        
          state: "N/A",
          zipCode: "N/A"
        },
        customer: fullName,    
        email: email, 
        phone: phoneNumber,    
        status: "Pending"
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      };

      await axios.post(
        `${API_URL}/api/bookings`, 
        bookingData,
        config 
      );
      
      setBookingStatus({ type: 'success', message: 'Booking safaltapoorvak ho gayi! Dashboard par redirect kar rahe hain...' });
      
      setTimeout(() => {
        navigate('/booking');
      }, 2000);

    } catch (err) {
      console.error("Error creating booking:", err.response ? err.response.data : err.message);
      
      const errorMessage = err.response && err.response.data && err.response.data.message 
                            ? err.response.data.message 
                            : 'Booking fail ho gayi. Server/API mein samasya hai.';
                            
      setBookingStatus({ type: 'error', message: errorMessage });
    }
  };

  if (loading) return <h2 className="text-center text-white mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  if (!car) return <h2 className="text-center text-red-500 mt-10">Car data is missing.</h2>;

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="flex flex-col lg:flex-row text-white gap-10 px-10 mt-10">

        <div className="max-w-4xl mx-auto lg:mx-0 p-6 bg-gray-900 rounded-2xl">
          <img
            className="w-full h-60 object-cover rounded-2xl"
            src={`${API_URL}/uploads/${car.image}`}
            alt={car.make}
          />
          <h1 className="text-3xl font-bold mt-6">{car.make}</h1>
          <p className="text-orange-400 font-bold text-xl mt-2">
            ₹ {car.dailyRate}/day
          </p>
          <p className="text-gray-400 mt-1 font-bold">{car.category}</p>

          <div className="flex justify-evenly gap-6 text-center mt-6">
            <div>
              <p className="text-xl font-bold">{car.seats}</p>
              <p className="text-gray-400">Seats</p>
            </div>
            <div>
              <p className="text-xl font-bold">{car.fuelType}</p>
              <p className="text-gray-400">Fuel</p>
            </div>
            <div>
              <p className="text-xl font-bold">{car.mileage}</p>
              <p className="text-gray-400">Mileage</p>
            </div>
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">
            This car is designed to give you a smooth and reliable driving experience. 
            With comfortable seating, great mileage, and modern features, it’s perfect 
            for city rides as well as long journeys. Book now for a safe, stylish, 
            and hassle-free drive.
          </p>
        </div>

        <div className="w-full lg:w-96 bg-gray-700 rounded-lg p-6">
          <h1 className="text-xl font-bold">Reserve <span className="text-orange-400">Your Drive</span></h1>
          <p className="mt-2 text-gray-400">Fast · Secure · Easy</p>

          <div className="flex gap-4 mt-6">
            <div className="flex flex-col">
              <label>Pickup Date</label>
              <input
                type="date"
                className="bg-gray-600 p-2 rounded mt-2 text-white"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Return Date</label>
              <input
                type="date"
                className="bg-gray-600 p-2 rounded mt-2 text-white"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Pickup Location (City)" 
              className="bg-gray-600 p-2 rounded text-white" 
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="bg-gray-600 p-2 rounded text-white" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-gray-600 p-2 rounded text-white" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="bg-gray-600 p-2 rounded text-white" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {bookingStatus && (
            <p className={`mt-3 text-center font-semibold ${
              bookingStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {bookingStatus.message}
            </p>
          )}

          <div className="mt-5 border-t border-gray-600 pt-4">
            <h2 className="text-lg font-bold text-white text-center mb-4">Booking Summary</h2>
            <div className="flex justify-between py-2 border-b border-gray-600">
              <span className="text-gray-300">Price per Day</span>
              <span className="text-orange-400 font-bold">₹ {car.dailyRate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-600">
              <span className="text-gray-300">Total Days</span>
              <span className="text-orange-400 font-bold">{totalDays > 0 ? totalDays : "-"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-600">
              <span className="text-white font-bold">Total Rent</span>
              <span className="text-2xl font-bold text-green-400">
                {totalDays > 0 ? `₹ ${totalRent}` : "--"}
              </span>
            </div>
          </div>

          <button 
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition duration-300"
            onClick={handleBooking}
            disabled={totalDays <= 0 || loading}
          >
            CONFIRM BOOKING
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetails;
