import React from 'react';
import { 
  FaInfoCircle, FaWhatsapp, FaEnvelope, FaClock, FaCalendarAlt, 
  FaPaperPlane, FaUser, FaCar, FaPhone, FaCommentDots 
} from "react-icons/fa"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const Contact = () => {
  return (

    
    <div className='bg-black '>
        <Navbar/>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-orange-400 text-4xl font-bold italic mt-15 underline'>Contact Our Team</h1>

<p className='text-white font-bold mt-4 w-120'>Have question about our premium fleet? our team is ready to </p>
<p className='text-white font-bold '>assist with your car rental needs.</p>

<div className='flex justify-evenly'>

<div className=' flex flex-col gap-3 border-2 border-gray-500 w-100 p-5 rounded-xl bg-gray-800 mt-10'>
    <div className='flex gap-3 '>
        <FaInfoCircle className='text-orange-500 mt-2'/>
<h1 className='text-white font-bold text-xl'>Our Information</h1>
</div>


<div className='border-1 border-gray-500 p-2 w-80 rounded-xl bg-gray-600'>
<div className='flex gap-3'>
        <FaWhatsapp className='text-orange-500 mt-2 '/>
<h1 className='text-white font-bold text-lg'>Whatsapp</h1>
</div>

<p className='text-white ml-7'>+910000000000</p>
</div>





<div className='border-1 border-gray-500 p-2 w-80 rounded-xl bg-gray-600'>
<div className='flex gap-3'>
        <FaEnvelope className='text-orange-500 mt-2 '/>
<h1 className='text-white font-bold text-lg'>Email</h1>
</div>

<p className='text-white ml-7'>Contact@carapna.com</p>
</div>

<div className='border-1 border-gray-500 p-2 w-80 rounded-xl bg-gray-600'>
<div className='flex gap-3'>
        <FaClock className='text-orange-500 mt-2 '/>
<h1 className='text-white font-bold text-lg'>Hours</h1>
</div>

<p className='text-white ml-7'>Mon-sat: 8AM-8PM</p>
<p className='text-white ml-7'>sunday: 10AM-6PM</p>
</div>

<div className='border-1 border-gray-500 p-2 w-80 rounded-xl bg-gray-600'>
<div className='flex gap-3'>
        <FaCalendarAlt className='text-orange-500 mt-2 '/>
<h1 className='text-white font-bold text-lg'>Special Offer!</h1>
</div>

<p className='text-white ml-3'>Book for 3+ days and get 10% discount</p>
</div>

</div>


<div className='mt-10 border-2 border-gray-500 rounded-xl ml-15 bg-gray-800 p-4'>

<div className='flex gap-3 '>
<FaPaperPlane className='text-orange-500 mt-2'/>
<h1 className='text-white font-bold text-xl'>Send your query</h1>
</div>

<p className='text-white italic mt-2'>Fill out the form and we'll get back to your promptly</p>

<div className='flex gap-3 mt-5'>
<div className='border-1 border-gray-500 w-60 pl-4 rounded-xl bg-gray-500'>
    <div className='flex gap-3 p-1 '>
        <FaUser className='text-orange-500 mt-1 '/>
        <input className='text-white outline-none' type="text" placeholder='Full Name' />
    </div>
</div>

<div className='border-1 border-gray-500 w-60 pl-4 rounded-xl bg-gray-500'>
    <div className='flex gap-3 p-1 '>
        <FaEnvelope className='text-orange-500 mt-1 '/>
        <input className='text-white outline-none' type="text" placeholder='Email Address' />
    </div>
</div>
</div>

<div className='flex gap-3 mt-5'>
<div className='border-1 border-gray-500 w-60 pl-4 rounded-xl bg-gray-500'>
    <div className='flex gap-3 p-1 '>
        <FaPhone className='text-orange-500 mt-1 '/>
        <input className='text-white outline-none' type="text" placeholder='Phone Number' />
    </div>
</div>

<div className='border-1 border-gray-500 w-60 pl-4 rounded-xl bg-gray-500'>
    <div className='flex gap-3 p-1 '>
        <FaCar className='text-orange-500 mt-1 '/>
        <input className='text-white outline-none' type="text" placeholder='Car Name' />
    </div>
</div>
</div>
 

<div className='border-1 border-gray-500 w-123 pl-4 rounded-xl mt-5 bg-gray-500'>
    <div className='flex gap-3 p-1 pb-20 '>
        <FaCommentDots className='text-orange-500 mt-1 '/>
        <input className='text-white w-full h-full outline-none' type="text" placeholder='Tell us about ur rental need....' />
    </div>
</div>


<button className='w-122 mt-10 border-1  border-gray-500 bg-orange-500 p-3 hover:cursor-pointer hover:bg-orange-600  text-white font-bold text-lg rounded-xl '>Send Message  <FaWhatsapp className='text-white ml-75 relative -mt-5'/></button>


</div>

</div>
      </div>

    
    <Footer/>
</div>    
  );
}

export default Contact;
