
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCarSide,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaArrowRight,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaGasPump,
  FaUsers,
} from "react-icons/fa";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const API_URL = "https://carr-backend.onrender.com";
const BOOKINGS_URL = `${API_URL}/api/bookings/bybooking`;

const calculateDays = (start, end) => {
  if (!start || !end) return 0;

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return 0;
  }

  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= 1 ? diffDays : 0;
};

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatPrice = (amount) => {
  return Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_URL}/uploads/${image.replace(/^\/+/, "")}`;
};

const getStatusStyle = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "active":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";

    case "upcoming":
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";

    case "pending":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300";

    case "completed":
      return "border-white/15 bg-white/[0.06] text-white/60";

    case "cancelled":
      return "border-red-500/30 bg-red-500/10 text-red-300";

    default:
      return "border-[#c9a96e]/30 bg-[#c9a96e]/10 text-[#e0c18b]";
  }
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your bookings.");
          return;
        }

        const response = await axios.get(BOOKINGS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        if (!Array.isArray(responseData)) {
          throw new Error("Invalid bookings data received from server.");
        }

        setBookings(responseData);
      } catch (err) {
        console.error("Failed to fetch my bookings:", err);

        const message =
          err.response?.data?.message ||
          "Unable to load your bookings. Please try again.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  const getBookingAmount = (booking, days) => {
    const amount = Number(booking.amount);
    const dailyRate = Number(booking.car?.dailyRate);

    if (Number.isFinite(amount) && amount > 0) {
      return amount;
    }

    if (Number.isFinite(dailyRate) && dailyRate > 0 && days > 0) {
      return dailyRate * days;
    }

    return 0;
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main>
        {/* Page heading */}
        <section className="relative overflow-hidden border-b border-white/[0.07] bg-[#0d0d0d] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a96e]/[0.07] blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d7b77d] sm:text-xs">
              <span className="h-px w-8 bg-[#c9a96e]" />
              Your Journey
            </p>

            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              My <span className="text-[#d7b77d]">Bookings.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Keep track of your reservations, travel dates and rental details
              all in one place.
            </p>

            {!loading && !error && (
              <div className="mt-7 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-3">
                <FaCarSide className="text-[#d7b77d]" />
                <span className="text-sm text-white/65">
                  Total bookings:
                </span>
                <span className="font-semibold text-[#e0c18b]">
                  {bookings.length}
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-7xl">
            {/* Loading state */}
            {loading && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse border border-white/[0.08] bg-[#111111] p-5 sm:p-6"
                  >
                    <div className="flex gap-4">
                      <div className="h-24 w-28 shrink-0 bg-white/[0.06] sm:h-32 sm:w-40" />
                      <div className="flex-1 space-y-4 py-2">
                        <div className="h-4 w-2/3 bg-white/[0.07]" />
                        <div className="h-4 w-1/2 bg-white/[0.07]" />
                        <div className="h-4 w-1/3 bg-white/[0.07]" />
                      </div>
                    </div>
                    <div className="mt-6 h-12 bg-white/[0.05]" />
                  </div>
                ))}
              </div>
            )}

            {/* Login or API error */}
            {!loading && error && (
              <div className="border border-white/10 bg-[#111111] px-5 py-14 text-center sm:px-8">
                <FaExclamationCircle className="mx-auto mb-5 text-3xl text-[#d7b77d]" />

                <h2 className="font-serif text-xl font-semibold sm:text-2xl">
                  Unable to Show Bookings
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/50">
                  {error}
                </p>

                {!localStorage.getItem("token") ? (
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a96e] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0c18b]"
                  >
                    Login to Continue
                    <FaArrowRight />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-7 border border-[#c9a96e]/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#e0c18b] transition hover:bg-[#c9a96e] hover:text-black"
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && bookings.length === 0 && (
              <div className="border border-white/10 bg-[#111111] px-5 py-16 text-center sm:px-8 sm:py-20">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#c9a96e]/25 bg-[#c9a96e]/[0.07]">
                  <FaCarSide className="text-2xl text-[#d7b77d]" />
                </div>

                <h2 className="mt-6 font-serif text-2xl font-semibold">
                  No Bookings Yet
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
                  You haven't reserved a car yet. Explore our collection and
                  find the right car for your next journey.
                </p>

                <Link
                  to="/car"
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 bg-[#c9a96e] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0c18b]"
                >
                  Explore Cars
                  <FaArrowRight />
                </Link>
              </div>
            )}

            {/* Booking cards */}
            {!loading && !error && bookings.length > 0 && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {bookings.map((booking) => {
                  const car = booking.car || {};
                  const days = calculateDays(
                    booking.pickupDate,
                    booking.returnDate
                  );

                  const displayAmount = getBookingAmount(booking, days);
                  const carName =
                    [car.make, car.model].filter(Boolean).join(" ") ||
                    car.name ||
                    "Reserved Car";

                  const imageUrl = getImageUrl(car.image);
                  const status = String(booking.status || "pending");

                  return (
                    <article
                      key={booking._id}
                      className="group overflow-hidden border border-white/[0.09] bg-[#111111] transition duration-300 hover:border-[#c9a96e]/40"
                    >
                      {/* Car details */}
                      <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-6">
                        <div className="relative h-48 shrink-0 overflow-hidden bg-[#191919] sm:h-32 sm:w-44">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={carName}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <FaCarSide className="text-4xl text-white/15" />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d7b77d]">
                              CarArea Reservation
                            </span>

                            <span
                              className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${getStatusStyle(
                                status
                              )}`}
                            >
                              {status}
                            </span>
                          </div>

                          <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                            {carName}
                          </h2>

                          <p className="mt-2 text-xs text-white/40">
                            {[
                              car.year,
                              car.transmission,
                              car.category,
                            ]
                              .filter(Boolean)
                              .join(" • ") || "Rental vehicle"}
                          </p>

                          {car.seats != null && (
                            <p className="mt-3 flex items-center gap-2 text-xs text-white/50">
                              <FaUsers className="text-[#c9a96e]" />
                              {car.seats} seats
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Booking dates */}
                      <div className="grid grid-cols-1 gap-4 border-t border-white/[0.08] px-4 py-5 sm:grid-cols-2 sm:px-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9a96e]/20 bg-[#c9a96e]/[0.07]">
                            <FaCalendarAlt className="text-sm text-[#d7b77d]" />
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                              Pickup Date
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-white/90">
                              {formatDate(booking.pickupDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9a96e]/20 bg-[#c9a96e]/[0.07]">
                            <FaMapMarkerAlt className="text-sm text-[#d7b77d]" />
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                              Return Date
                            </p>
                            <p className="mt-1.5 text-sm font-medium text-white/90">
                              {formatDate(booking.returnDate)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Amount and duration */}
                      <div className="flex flex-col gap-4 border-t border-white/[0.08] bg-white/[0.02] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div className="flex items-center gap-3">
                          <FaClock className="text-[#d7b77d]" />

                          <div>
                            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                              Rental Duration
                            </p>
                            <p className="mt-1 text-sm font-medium text-white/85">
                              {days > 0
                                ? `${days} ${days === 1 ? "day" : "days"}`
                                : "Dates unavailable"}
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:justify-end">
                            <FaMoneyBillWave className="text-[#c9a96e]" />
                            Total Rent
                          </p>

                          <p className="mt-1 text-xl font-semibold text-[#e0c18b]">
                            ₹{formatPrice(displayAmount)}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading && !error && bookings.length > 0 && (
              <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-white/[0.08] bg-[#111111] p-5 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Looking for your next ride?
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    Browse the collection to find your next car.
                  </p>
                </div>

                <Link
                  to="/car"
                  className="inline-flex min-h-11 items-center justify-center gap-3 border border-[#c9a96e]/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#e0c18b] transition hover:bg-[#c9a96e] hover:text-black"
                >
                  Browse Cars
                  <FaArrowRight />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
