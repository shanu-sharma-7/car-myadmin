
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCarSide,
  FaUsers,
  FaGasPump,
  FaRoad,
  FaArrowRight,
  FaExclamationCircle,
} from "react-icons/fa";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const API_URL = "http://localhost:5000";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/cars`);

        const responseData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        if (!Array.isArray(responseData)) {
          throw new Error("Invalid car data received from server");
        }

        setCars(responseData);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("We couldn't load the cars right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBook = (id) => {
    navigate(`/car/${id}`);
  };

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${API_URL}/uploads/${image.replace(/^\/+/, "")}`;
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main>
        {/* Page heading */}
        <section className="relative overflow-hidden border-b border-white/[0.07] bg-[#0d0d0d] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a96e]/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#c9a96e]/[0.04] blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b77d]">
              <span className="h-px w-8 bg-[#c9a96e]" />
              The Car Collection
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Find Your Perfect
              <span className="block text-[#d7b77d]">Drive.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Explore our collection of cars and find the right ride for your
              next journey. Comfort, style and performance in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em] text-white/50">
              <span className="flex items-center gap-2">
                <FaCarSide className="text-[#d7b77d]" />
                Quality Cars
              </span>
              <span className="h-1 w-1 rounded-full bg-[#c9a96e]/60" />
              <span>Easy Booking</span>
              <span className="h-1 w-1 rounded-full bg-[#c9a96e]/60" />
              <span>Every Journey</span>
            </div>
          </div>
        </section>

        {/* Car listing */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a96e]">
                  Explore the collection
                </p>
                <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                  Available Cars
                </h2>
              </div>

              {!loading && !error && (
                <p className="text-sm text-white/40">
                  <span className="mr-1 text-[#d7b77d]">{cars.length}</span>
                  {cars.length === 1 ? "car available" : "cars available"}
                </p>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse overflow-hidden border border-white/[0.08] bg-[#111111]"
                  >
                    <div className="h-52 bg-white/[0.06] sm:h-56" />
                    <div className="space-y-4 p-5">
                      <div className="h-5 w-2/3 rounded bg-white/[0.07]" />
                      <div className="h-4 w-1/3 rounded bg-white/[0.07]" />
                      <div className="h-12 rounded bg-white/[0.05]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="border border-white/10 bg-[#111111] px-5 py-12 text-center sm:px-8">
                <FaExclamationCircle className="mx-auto mb-4 text-3xl text-[#d7b77d]" />
                <p className="text-base font-medium text-white">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-6 border border-[#c9a96e]/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#e0c18b] transition hover:bg-[#c9a96e] hover:text-black"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && cars.length === 0 && (
              <div className="border border-white/10 bg-[#111111] px-5 py-16 text-center">
                <FaCarSide className="mx-auto mb-5 text-4xl text-[#c9a96e]" />
                <h3 className="font-serif text-xl font-semibold">
                  No Cars Available
                </h3>
                <p className="mt-3 text-sm text-white/45">
                  There are no cars listed right now. Please check again later.
                </p>
              </div>
            )}

            {/* Car cards */}
            {!loading && !error && cars.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {cars.map((car) => {
                  const carName = car.make || car.name || "Premium Car";
                  const imageUrl = getImageUrl(car.image);
                  const price = car.dailyRate ?? car.pricePerDay ?? car.price;
                  const category = car.category || "Standard";
                  const seats = car.seats ?? car.capacity ?? "N/A";
                  const fuel = car.fuelType || car.fuel || "N/A";
                  const mileage = car.mileage || "N/A";

                  return (
                    <article
                      key={car._id}
                      className="group flex h-full flex-col overflow-hidden border border-white/[0.09] bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/40 hover:shadow-[0_16px_45px_rgba(0,0,0,0.35)]"
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden bg-[#181818] sm:h-60">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={carName}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <FaCarSide className="text-5xl text-white/15" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

                        <span className="absolute left-4 top-4 border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
                          {category}
                        </span>

                        <div className="absolute bottom-4 left-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                            Starting from
                          </p>
                          <p className="mt-1 text-xl font-semibold text-white">
                            {price != null ? (
                              <>
                                ₹{Number(price).toLocaleString("en-IN")}
                                <span className="ml-1 text-xs font-normal text-white/60">
                                  / day
                                </span>
                              </>
                            ) : (
                              <span className="text-base">Price on request</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e]">
                              CarArea Collection
                            </p>
                            <h3 className="font-serif text-xl font-semibold text-white transition group-hover:text-[#e0c18b] sm:text-2xl">
                              {carName}
                            </h3>
                          </div>

                          <FaCarSide className="mt-1 shrink-0 text-lg text-[#c9a96e]" />
                        </div>

                        <div className="my-5 grid grid-cols-3 divide-x divide-white/10 border-y border-white/[0.08] py-4">
                          <div className="flex flex-col items-center gap-2 px-1 text-center">
                            <FaUsers className="text-sm text-[#d7b77d]" />
                            <span className="text-sm font-semibold text-white/90">
                              {seats}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-white/40">
                              Seats
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-2 px-1 text-center">
                            <FaGasPump className="text-sm text-[#d7b77d]" />
                            <span className="max-w-full truncate text-sm font-semibold text-white/90">
                              {fuel}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-white/40">
                              Fuel
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-2 px-1 text-center">
                            <FaRoad className="text-sm text-[#d7b77d]" />
                            <span className="max-w-full truncate text-sm font-semibold text-white/90">
                              {mileage}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-white/40">
                              Mileage
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleBook(car._id)}
                          className="mt-auto flex min-h-12 w-full items-center justify-center gap-3 bg-[#c9a96e] px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0c18b]"
                        >
                          View Details & Book
                          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Car;
