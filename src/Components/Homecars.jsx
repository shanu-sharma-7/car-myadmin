
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiCarSeat } from "react-icons/gi";
import { MdSpeed } from "react-icons/md";
import { FaGasPump, FaCarSide, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://carr-backend.onrender.com";

const Homecars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cars`);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        if (!Array.isArray(data)) {
          throw new Error("Invalid cars response");
        }

        setCars(data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Unable to load our collection. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const specifications = (car) => [
    {
      label: "Seats",
      value: car.seats ?? "N/A",
      Icon: GiCarSeat,
    },
    {
      label: "Fuel",
      value: car.fuelType || "N/A",
      Icon: FaGasPump,
    },
    {
      label: "Mileage",
      value: car.mileage || "N/A",
      Icon: MdSpeed,
    },
    {
      label: "Transmission",
      value: car.transmission || "N/A",
      Icon: FaCarSide,
    },
  ];

  return (
    <section
      id="cars"
      className="relative overflow-hidden bg-[#090909] px-4 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Ambient background detail */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#c9a96e]/[0.06] blur-[110px]" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:mb-16 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#c9a96e]" />

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#d7b77d] sm:text-xs">
                A Collection of Distinction
              </p>
            </div>

            <h2 className="font-serif text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
              Find Your
              <span className="block italic text-[#d7b77d]">
                Perfect Drive.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Exceptional vehicles. Thoughtful details. An experience
              designed around the way you love to travel.
            </p>
          </div>

          <div className="flex items-center gap-4 md:pb-2">
            <span className="font-serif text-4xl text-[#c9a96e]">
              {String(cars.length).padStart(2, "0")}
            </span>

            <div className="h-10 w-px bg-white/15" />

            <p className="max-w-[120px] text-xs leading-5 text-white/50">
              Vehicles in our collection
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse border border-white/10 bg-[#111111]"
              >
                <div className="h-56 bg-white/5 sm:h-64" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 bg-white/10" />
                  <div className="h-4 w-1/3 bg-white/10" />
                  <div className="h-12 bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="border border-white/10 bg-[#111111] px-5 py-14 text-center">
            <p className="text-sm text-white/60">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 border border-[#c9a96e]/50 px-6 py-3 text-sm text-[#d7b77d] transition hover:bg-[#c9a96e] hover:text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && cars.length === 0 && (
          <div className="border border-white/10 px-5 py-16 text-center">
            <h3 className="font-serif text-2xl text-white">
              Something special is on its way.
            </h3>

            <p className="mt-3 text-sm text-white/50">
              Our collection will be available here soon.
            </p>
          </div>
        )}

        {/* Responsive car collection */}
        {!loading && !error && cars.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 lg:gap-7 xl:grid-cols-3 2xl:grid-cols-4">
            {cars.map((car, index) => (
              <article
                key={car._id}
                className="group min-w-0 overflow-hidden border border-white/[0.09] bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-[#c9a96e]/50"
              >
                {/* Vehicle image */}
                <div className="relative h-56 overflow-hidden bg-[#171717] sm:h-52 lg:h-60">
                  {car.image ? (
                    <img
                      src={`${API_URL}/uploads/${car.image}`}
                      alt={car.make || "Premium vehicle"}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/20">
                      <FaCarSide size={55} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />

                  <div className="absolute left-4 top-4">
                    <span className="border border-white/20 bg-black/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                      {car.category || "Premium"}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#d7b77d]">
                        CarArea Selection · {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="truncate font-serif text-2xl text-white sm:text-xl lg:text-2xl">
                        {car.make || "Premium Car"}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-lg font-medium text-[#e1c38d]">
                        ₹{car.dailyRate ?? "—"}
                      </p>
                      <p className="text-[10px] text-white/50">per day</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle specifications */}
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-y-5">
                    {specifications(car).map(({ label, value, Icon }) => (
                      <div key={label} className="flex min-w-0 items-center gap-3">
                        <Icon
                          className="shrink-0 text-[#c9a96e]"
                          size={19}
                        />

                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-[0.12em] text-white/40">
                            {label}
                          </p>

                          <p className="mt-1 truncate text-xs text-white/85 sm:text-sm">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-5 mt-6 h-px bg-white/[0.08]" />

                  <button
                    type="button"
                    onClick={() => navigate(`/car/${car._id}`)}
                    className="flex min-h-12 w-full items-center justify-between gap-3 border border-[#c9a96e]/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#e1c38d] transition duration-300 hover:bg-[#c9a96e] hover:text-black sm:px-5"
                  >
                    <span>Reserve This Car</span>

                    <FaArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom note */}
        {!loading && !error && cars.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
            <p className="text-center text-xs leading-6 text-white/40 sm:text-left">
              Your journey deserves something exceptional.
            </p>

            <a
              href="#experiences"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#d7b77d] transition hover:text-white"
            >
              Discover Our Experience
              <FaArrowRight size={12} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Homecars;
