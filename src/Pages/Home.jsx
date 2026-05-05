import React from 'react';
import Navbar from '../Components/Navbar';
import Homebanner from '../Components/Homebanner';
import Homecars from '../Components/Homecars';
import Experiences from '../Components/Experiences';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className='bg-black'>
      <Navbar/>
      <Homebanner/>
      <Homecars/>
      <Experiences/>
      <Footer/>
    </div>
  );
}

export default Home;
