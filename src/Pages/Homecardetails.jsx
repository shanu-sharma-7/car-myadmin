import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import cardata from "../assets/HcarsData";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Homecardetails = () => {
  const { id } = useParams()
  const car = cardata.find((c) => c.id === parseInt(id)); 

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  if (!car) {
    return <h2 className="text-center text-red-500 mt-10">Car not found!</h2>;
  }

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffTime = endDate - startDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays : 0;
  };

  const totalRent = totalDays * car.price;


  return (
    <div className="bg-black text-white ">
      


      <div className="flex gap-20 ">
      <div className="max-w-4xl mx-auto p-6 mt-15 ml-40">
        <img className="w-150 h-60 object-cover rounded-2xl "
          src={car.image}
          alt={car.name}
          
        />

        <h1 className="text-3xl font-bold mt-6">{car.name}</h1>
        <p className="text-orange-400 font-bold text-xl mt-2">
          ₹ {car.price}/day
        </p>
        <p className="text-gray-400 mt-1 font-bold">{car.type}</p>

        <div className="flex justify-evenly gap-6 text-center mt-6">
          <div>
            <p className="text-xl font-bold">{car.seats}</p>
            <p className="text-gray-400">Seats</p>
          </div>
          <div>
            <p className="text-xl font-bold">{car.fuel}</p>
            <p className="text-gray-400">Fuel</p>
          </div>
          <div>
            <p className="text-xl font-bold">{car.mileage}</p>
            <p className="text-gray-400">Mileage</p>
          </div>
        </div>

        <p className="mt-6 text-gray-300 leading-relaxed">



          <p>This car is designed to give you a smooth and reliable driving experience. 
With comfortable seating, great mileage, and modern features, it’s perfect 
for city rides as well as long journeys. Book now for a safe, stylish, 
and hassle-free drive.
</p>
        </p>
      </div>



       <div>

     <div className="w-100 bg-gray-700 mr-40 mt-22 rounded-lg pl-10 ">
   
<h1 className="text-xl font-bold pt-3 ">Reserve <span className="text-orange-400 font-bold">Your Drive</span></h1>
<p className="mt-2 text-gray-400">Fast . Secure . Easy</p>

<div className="flex gap-6">
<div className="mt-6">
    <h1>Pickup Date</h1>
   <input  type="date" className="bg-gray-600 p-1 mt-2" value={pickupDate} onChange={(e) => { setPickupDate(e.target.value); setTotalDays(calculateDays(e.target.value, returnDate));
                  }}
                />
</div>

<div className="mt-6">
    <h1>Return Date</h1>
 <input type="date" className="bg-gray-600 p-1 mt-2" value={returnDate}  onChange={(e) => { setReturnDate(e.target.value); setTotalDays(calculateDays(pickupDate, e.target.value));
                  }}
                />
</div>


</div>

<div className="mt-4">
    <h1>Pickup Location </h1>
    <input className="bg-gray-600 p-1 rounded-lg w-80 pl-10 mt-2" type="text" placeholder="Enter Pickup Location " />
</div>

<div className="mt-4">
    <h1>Full Name </h1>
    <input className="bg-gray-600 p-1 rounded-lg w-80 pl-10 mt-2" type="text" placeholder="Your Full Name " />
</div>


<div className="mt-4">
    <h1>Email Address </h1>
    <input className="bg-gray-600 p-1 rounded-lg w-80 pl-10 mt-2" type="text" placeholder="Your Email " />
</div>


<div className="mt-4">
    <h1>Phone Number </h1>
    <input className="bg-gray-600 p-1 rounded-lg w-80 pl-10 mt-2" type="text" placeholder="Your Phone Number " />
</div>

<div className="mt-5">
  <h2 className="text-lg font-bold text-white text-center mb-4">
    Booking Summary
  </h2>

  <div className="flex gap-40 py-2 border-b border-gray-600">
    <span className="text-gray-300">Price per Day</span>
    <span className="text-orange-400 font-bold">₹ {car.price}</span>
  </div>

  <div className="flex gap-50 py-2 border-b border-gray-600">
    <span className="text-gray-300">Total Days</span>
    <span className="text-orange-400 font-bold">{totalDays > 0 ? totalDays : "-"}</span>
  </div>

  <div className="flex gap-40 py-2 border-b border-gray-600">
    <span className="text-white font-bold">Total Rent</span>
    <span className="text-2xl font-bold text-green-400">
      {totalDays > 0 ? `₹ ${totalRent}` : "--"}
    </span>
  </div>
</div>


 <button
          className="mt-2 w-80 bg-orange-500 hover:bg-orange-600 
                     text-white font-bold p-2 rounded-xl 
                     transition duration-300 mb-5"
        >
          CONFIRM BOOKING
        </button>


     </div>

       </div>




      </div>
      <Footer />
      
    </div>
  );
};

export default Homecardetails;
