import React from 'react';
import { FaCar } from "react-icons/fa"
import { ImQuotesLeft} from "react-icons/im"
import { FaStar, FaRegStar} from "react-icons/fa"
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from 'react-router-dom';





const Experiences = () => {
  return (
    <div>
      <div className=' mt-20 gap-2 flex justify-center items-center border-1 border-amber-300  ml-140 mr-130 p-1 rounded-2xl bg-gray-950'>
        < FaCar className='text-yellow-400'/>
        <h1 className='text-yellow-400'>Customer Experiences</h1>
      </div>
 
 <h1 className='text-orange-500 flex justify-center mt-5 text-5xl italic'>Premium Drive Experiences</h1>
 <p className='text-white text-xl flex justify-center mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, iure?</p>

<div className='flex mt-10 justify-evenly'>

<div className='w-80 border-2 border-gray-600 rounded-2xl p-4 transition-transform duration-300 
                hover:-translate-y-4'>
<div className='flex gap-40 '>
<ImQuotesLeft className='text-orange-500 text-xl'/>
<div className='flex'>
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
</div>

</div>

<p className='text-white italic mt-10'>"The BMW 5 Series was impeccable!
    Smooth ride and excellent service with 
    ample space. Will definately rent again"</p>

    <div className='mt-5 flex gap-2 ml-10 border-1 border-gray-400 bg-gray-950 w-40 justify-center rounded-lg'>
<GiSteeringWheel className='text-orange-500 mt-1'/>
<p className='text-orange-500'> BMW 5 Series</p>

    </div>

</div>


<div className='w-80 border-2 border-gray-600 rounded-2xl p-4 transition-transform duration-300 
                hover:-translate-y-4 '>
<div className='flex gap-40 '>
<ImQuotesLeft className='text-orange-500 text-xl'/>
<div className='flex'>
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaRegStar className='text-orange-500 text-xl' />
</div>

</div>

<p className='text-white italic mt-10'>"Perfect family Toyoto Highlender with
    ample space. clean, well maintained, and 
    great value of money."</p>

    <div className='mt-5 flex gap-2 ml-10 border-1 border-gray-400 bg-gray-950 w-40 justify-center rounded-lg'>
<GiSteeringWheel className='text-orange-500 mt-1'/>
<p className='text-orange-500'> Toyoto Highlender</p>

    </div>

</div>



<div className='w-80 border-2 border-gray-600 rounded-2xl p-4 transition-transform duration-300 
                hover:-translate-y-4 '>
<div className='flex gap-40 '>
<ImQuotesLeft className='text-orange-500 text-xl'/>
<div className='flex'>
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
<FaStar className='text-orange-500 text-xl' />
</div>

</div>

<p className='text-white italic mt-10'>"Convertiable Ford Mustang made our 
    coastasl drive unforgettable 24/7 support 
    was a lifesaver and value of money."</p>

    <div className='mt-5 flex gap-2 ml-10 border-1 border-gray-400 bg-gray-950 w-40 justify-center rounded-lg'>
<GiSteeringWheel className='text-orange-500 mt-1'/>
<p className='text-orange-500'> Ford Mustang</p>

    </div>

</div>


</div>

<div className='flex justify-evenly mt-20 border-1 border-gray-500 bg-gray-950 w-250 p-5 ml-40 rounded-3xl'>
<div className='text-blue-400 font-bold'>
  <h1 className='text-4xl'>10K +</h1>
  <p>Happy Customer</p>
</div>

<div className='text-yellow-300 font-bold'>
  <h1 className='text-4xl'>250 +</h1>
  <p>Luxury Vehicles</p>
</div>

<div className='text-sky-400 font-bold'>
  <h1 className='text-4xl'>24/7</h1>
  <p>Support</p>
</div>

<div className='text-green-400 font-bold'>
  <h1 className='text-4xl'>50 +</h1>
  <p>Location</p>
</div>

</div>


<div className='text-white w-200 flex flex-col items-center ml-60 mt-15'>

<h1 className='text-2xl font-bold italic mb-5'>Ready for your premium Experiences?</h1>
<p className='font-bold'>join thousand of satisfied customer who have experience our premium fleet and expectional services</p>
<Link to={'/car'} className='mt-10 border-1 border-gray-500 p-3 bg-orange-600 font-bold rounded-4xl hover:cursor-pointer'>Book your luxury ride</Link>
</div>

    </div>
  );
}

export default Experiences;
