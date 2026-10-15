
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import banner from "../assets/hero.png";

const Homebanner = () => {
  return (
    <section className="relative isolate flex min-h-[580px] items-center overflow-hidden bg-[#090909] sm:min-h-[660px] lg:min-h-[760px]">
      <img
        src={banner}
        alt="Premium luxury cars at CarArea"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30" />

      {/* Hero content */}
      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-24 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#c9a96e]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#e0c18b] sm:text-xs sm:tracking-[0.42em]">
              The Art of Driving
            </p>
          </div>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[88px]">
            Drive Beyond
            <br />
            <span className="font-serif font-normal italic text-[#d7b77d]">
              Ordinary.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
            Discover a world of exceptional automobiles. From elegant city
            drives to unforgettable escapes, your next journey starts here.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/cars"
              className="inline-flex min-h-[54px] items-center justify-center gap-4 bg-[#c9a96e] px-7 text-sm font-semibold text-black transition duration-300 hover:bg-[#e0c18b] sm:px-9"
            >
              Explore Collection
              <FaArrowRight size={13} />
            </Link>

            <a
              href="#experiences"
              className="inline-flex min-h-[54px] items-center justify-center gap-3 border border-white/30 px-7 text-sm font-medium text-white transition hover:border-[#c9a96e] hover:text-[#e0c18b] sm:px-8"
            >
              <FaPlay size={10} />
              Discover the Experience
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4 sm:mt-16">
            <div className="h-px w-12 bg-[#c9a96e]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs">
              Elegance in Every Mile
            </span>
          </div>
        </div>
      </div>

      {/* Vertical label */}
      <div className="absolute bottom-12 right-6 hidden lg:block">
        <p className="rotate-90 origin-right text-[10px] uppercase tracking-[0.35em] text-white/50">
          CarArea · Premium Mobility
        </p>
      </div>
    </section>
  );
};

export default Homebanner;
