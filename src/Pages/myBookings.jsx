import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar"; 
import Footer from "../Components/Footer"; 

const API_URL = 'http://localhost:5000/api/bookings/bybooking'; 

const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 1 ? Math.ceil(diffDays) : 0; 
};

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMyBookings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    setError("Login required to view your bookings.");
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(API_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                }); 
                

                setBookings(response.data || []); 
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch my bookings:", err);
                const errorMessage = err.response?.data?.message || "Failed to load bookings. Please log in again.";
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchMyBookings();
    }, []);


    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'upcoming': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    

    if (loading) return <div className="text-center text-white mt-20 bg-black min-h-screen"><h2 className="text-2xl text-orange-400 pt-20">Loading your bookings...</h2></div>;
    if (error) return <div className="text-center text-white mt-20 bg-black min-h-screen"><h2 className="text-2xl text-red-500 pt-20">{error}</h2></div>;

    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <div className="p-4 max-w-7xl mx-auto text-white">
                <h2 className="text-4xl font-bold mb-3 text-center text-orange-400 mt-10">My Bookings</h2>
                <p className="flex text-center justify-center text-gray-400 mb-8">Here is a list of all cars you have reserved or rented.</p>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 border border-gray-700 rounded-lg bg-gray-900">
                        <p className="text-gray-400 text-lg">You have no active or past bookings.</p>
                        <Link to="/" className="text-orange-400 hover:text-orange-500 mt-4 block font-semibold">
                            Start browsing cars
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-2xl rounded-lg border border-gray-700">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Car Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Dates</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-700">
                                {bookings.map((booking) => {
                                    const days = calculateDays(booking.pickupDate, booking.returnDate);

                                    const displayAmount = booking.amount > 0 
                                        ? booking.amount 
                                        : (booking.car?.dailyRate * days || 0);

                                    return (
                                        <tr key={booking._id} className="hover:bg-gray-800 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full object-cover" 
                                                             src={`http://localhost:5000/uploads/${booking.car.image}`} 
                                                             alt={booking.car.make} 
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{booking.car.make} {booking.car.model}</div>
                                                        <div className="text-sm text-gray-400">{booking.car.year} | {booking.car.transmission}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                <p>Pickup: {new Date(booking.pickupDate).toLocaleDateString()}</p>
                                                <p>Return: {new Date(booking.returnDate).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">
                                                ₹ {displayAmount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(booking.status)}`}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default MyBookings;