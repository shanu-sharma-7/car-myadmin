import React, { useState , useEffect } from 'react';
import logocar from "../assets/logocar.png"
import { Link , useNavigate} from 'react-router-dom';
import { FaUser, FaSignOutAlt } from "react-icons/fa";



const Navbar = () => {

    const [loggin , setloggin] = useState(false)

    const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token"); 
    setloggin(!!token); 
  }, []);


    const handlebutton = () =>{
    localStorage.removeItem("token"); 
    setloggin(false);
    navigate("/login");
}

  return (
    <div className='flex justify-around border-1 border-gray-300 shadow-lg rounded-4xl ml-60 mr-60 mt-2 p-2 bg-gray-50'>
        <div>
      <img className='w-30 h-5' src={logocar} alt="" />
      <h1 className='font-bold pl-3 text-xl'>CARAREA</h1>
      </div>

      <div className='flex gap-10 pl-20 pr-20 underline mt-5 font-bold '>
        <Link to={"/"} className='hover:text-orange-700'>HOME</Link>
        <Link to={"/car"} className='hover:text-orange-700'>CARS</Link>
        <Link to={"/Contact"} className='hover:text-orange-700'>CONTACTS</Link>
        <Link to={"/booking"} className='hover:text-orange-700'> My-Booking</Link>
      </div>

      <div>

        <button className='mt-5 font-bold  pl-4 pr-4' onClick={handlebutton}>{loggin ? (
            <div className='flex gap-1'> <FaSignOutAlt className='mt-1' /> Logout </div>
          ) : (
            <Link to={"/login"} className='flex gap-1'> <FaUser className='mt-1' /> Login</Link>)}</button>
      </div>
    </div>
  );
}

export default Navbar;