import React from 'react';
import banner from "../assets/hero.png"

const Homebanner = () => {
  return (
    <div className='relative group overflow-hidden h-[550px]'>
      <img className='object-cover transition-transform duration-500 group-hover:scale-105' src={banner} alt="" />

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome to CarArea</h1>
        <p className="text-lg">Find your dream car today</p>
      </div>
    </div>
  );
}

export default Homebanner;
