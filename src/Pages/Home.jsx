
import React from "react";
import Navbar from "../Components/Navbar";
import Homebanner from "../Components/Homebanner";
import Homecars from "../Components/Homecars";
import Experiences from "../Components/Experiences";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#090909] text-white">
      <Navbar />

      <Homebanner />

      <Homecars />

      <div id="experiences">
        <Experiences />
      </div>

      <Footer />
    </main>
  );
};

export default Home;
