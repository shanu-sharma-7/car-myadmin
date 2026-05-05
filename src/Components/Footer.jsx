import React from 'react';
import logocar from "../assets/logocar.png"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

    <div>
    <div className='mt-20 flex justify-evenly shadow-2xl shadow-orange- bg-black pb-5'>

        <div className='w-60 flex flex-col gap-5'>
<div>
      <img className='w-30 h-5' src={logocar} alt="" />
      <h1 className='font-bold text-white pl-3 text-xl'>CARAREA</h1>
      </div>
      <p className=' text-gray-400'> Premium car rental service with the
        latest models and exceptional
        customer service. drive your dream 
        car today!
      </p>

      <div className='flex text-gray-400 gap-5'>
<FaFacebook/>
<FaInstagram/>
<FaLinkedin/>
<FaTwitter/>

      </div>

        </div>


        <div className='text-white flex flex-col gap-5 '>

            <h1 className='font-bold text-xl'>Quick Links</h1>

            <div className='flex flex-col gap-3 text-gray-400'>
            <Link to={"/"}> Home </Link>
            <Link to={'/car'}> Cars  </Link>
            <Link to={"/Contact"}> Contacts </Link>
</div>
        </div>


        <div className='text-white flex flex-col gap-10'>
            <div className='gap-3 flex flex-col'>
            <h1 className='font-bold text-xl'>Contact Us</h1>
            <p><span className='text-gray-400'>123 Drive Avenue ,Auto City,CA 90201</span></p>
            <p><span className='text-gray-400'>+918299431275</span></p>
            <p><span className='text-gray-400'>info@hexagonservice.com</span></p>

            </div>

<div >
            <p className='font-bold mb-3'>Bussiness hours</p>
            <p className='text-gray-400'>Monday-Friday. 8:00 AM - 8:00 PM</p>
            <p className='text-gray-400'>Saturday: 9:00 AM - 6:00 PM</p>
            <p className='text-gray-400'>Sunday: 10:00 AM - 4:00 PM</p>
</div>


        </div>
      


      <div className='text-white w-60 flex flex-col gap-5'>

        <h1 className='font-bold text-xl'>Newsletter</h1>
        <p>Subscribe for special offers and updates</p>
        <input className=' border-2 border-gray-400 text-center rounded-lg w-50 bg-gray-900' type="text" placeholder='Your Email Address' />
        <button className='border-1 border-orange-400 bg-orange-700 p-1 w-50 rounded-lg font-bold hover:cursor-pointer'>Subscribe Now</button>
      </div>
    </div>
    </div>
  );
}

export default Footer;
