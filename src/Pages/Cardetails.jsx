
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  Users,
  CarFront,
  LoaderCircle,
} from "lucide-react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [bookingStatus, setBookingStatus] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/cars/${id}`
        );

        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car:", err);

        setError(
          err.response?.data?.message ||
            "Car details load nahi ho paayi. Please dobara try karein."
        );
      } finally {
        setLoading(false);
      }
    };

    if (API_URL && id) {
      fetchCar();
    } else {
      setError("Backend URL configure nahi hai.");
      setLoading(false);
    }
  }, [API_URL, id]);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;

    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);

    const diffDays =
      (endDate - startDate) / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays(pickupDate, returnDate);
  const dailyRate = Number(car?.dailyRate) || 0;
  const totalRent = totalDays * dailyRate;

  const today = new Date();

  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handlePickupDate = (value) => {
    setPickupDate(value);

    if (returnDate && value >= returnDate) {
      setReturnDate("");
    }

    setBookingStatus(null);
  };

  // Guest booking: customer ko login karne ki zaroorat nahi hai.
  const handleBooking = async (event) => {
    event.preventDefault();
    setBookingStatus(null);

    if (isBooking) return;

    if (
      !pickupDate ||
      !returnDate ||
      !pickupLocation.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !phoneNumber.trim()
    ) {
      setBookingStatus({
        type: "error",
        message: "Please sabhi fields fill karein.",
      });
      return;
    }

    if (pickupDate < localToday) {
      setBookingStatus({
        type: "error",
        message: "Pickup date aaj ya future ki honi chahiye.",
      });
      return;
    }

    if (totalDays <= 0) {
      setBookingStatus({
        type: "error",
        message: "Return date pickup date ke baad ki select karein.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setBookingStatus({
        type: "error",
        message: "Please valid email address enter karein.",
      });
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(phoneNumber.trim())) {
      setBookingStatus({
        type: "error",
        message: "Please valid phone number enter karein.",
      });
      return;
    }

    if (!car?._id) {
      setBookingStatus({
        type: "error",
        message: "Car details abhi available nahi hain.",
      });
      return;
    }

    if (!API_URL) {
      setBookingStatus({
        type: "error",
        message: "Backend URL configure nahi hai.",
      });
      return;
    }

    const bookingData = {
      car: {
        id: car._id,
        make: car.make || "",
        dailyRate,
        model: car.model || "",
        image: car.image || "",
        category: car.category || "Sedan",
        seats: car.seats || 4,
        transmission: car.transmission || "",
        fuelType: car.fuelType || "",
        mileage: car.mileage || 0,
      },
      pickupDate,
      returnDate,
      totalDays,
      amount: totalRent,
      address: {
        city: pickupLocation.trim(),
        street: "N/A",
        state: "N/A",
        zipCode: "N/A",
      },
      customer: fullName.trim(),
      email: email.trim(),
      phone: phoneNumber.trim(),
      status: "pending",
    };

    try {
      setIsBooking(true);

      // Public booking API: Authorization token required nahi hai.
      const response = await axios.post(
        `${API_URL}/api/bookings`,
        bookingData
      );

      const bookingId =
        response.data?.booking?._id ||
        response.data?.booking?.id;

   
setBookingStatus({
  type: "success",
  message: "Booking successfully!",
});

// Booking successful hone ke baad form clear karo.
setPickupDate("");
setReturnDate("");
setPickupLocation("");
setFullName("");
setEmail("");
setPhoneNumber("");


      // Guest ko login-based My Bookings page par redirect nahi karna.
    } catch (err) {
      console.error(
        "Error creating booking:",
        err.response?.data || err.message
      );

      setBookingStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Booking complete nahi hui. Please dobara try karein.",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const imageUrl = car?.image
    ? car.image.startsWith("http")
      ? car.image
      : `${API_URL}/uploads/${car.image.replace(/^\/+/, "")}`
    : "";

  const specifications = [
    {
      label: "Seats",
      value: car?.seats || "N/A",
      icon: Users,
    },
    {
      label: "Fuel Type",
      value: car?.fuelType || "N/A",
      icon: Fuel,
    },
    {
      label: "Mileage",
      value: car?.mileage ? `${car.mileage}` : "N/A",
      icon: Gauge,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <Navbar />

        <div className="flex min-h-[65vh] flex-col items-center justify-center gap-4">
          <LoaderCircle className="h-10 w-10 animate-spin text-[#c9a96e]" />
          <p className="text-sm tracking-wide text-gray-400">
            Loading car details...
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <Navbar />

        <div className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
          <CarFront className="mb-4 h-14 w-14 text-[#c9a96e]" />

          <h2 className="text-2xl font-semibold">
            Car Not Available
          </h2>

          <p className="mt-3 max-w-md text-sm text-gray-400">
            {error || "Car details nahi mil paayi."}
          </p>

          <button
            onClick={() => navigate("/cars")}
            className="mt-7 rounded-lg bg-[#c9a96e] px-6 py-3 font-semibold text-black transition hover:bg-[#dfc18c]"
          >
            Explore Cars
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="mb-7 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#d7b77d]"
        >
          <ArrowLeft size={17} />
          Back to cars
        </button>

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a96e]">
              Find your next journey
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {car.make}
              {car.model ? ` ${car.model}` : ""}
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              {car.category || "Premium collection"} · Make every journey special.
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-gray-400">Starting from</p>

            <p className="mt-1 text-3xl font-bold text-[#d7b77d]">
              ₹{dailyRate.toLocaleString("en-IN")}
              <span className="ml-1 text-sm font-normal text-gray-400">
                / day
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">
          {/* Car information */}
          <section className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
              <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#171717] sm:h-[360px] lg:h-[430px]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`${car.make} ${car.model || ""}`}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <CarFront className="h-24 w-24 text-[#c9a96e]/50" />
                )}

                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#e0c18b] backdrop-blur-sm">
                  {car.category || "Premium Car"}
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      About this car
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      Comfort, style and performance for your next trip.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <ShieldCheck className="h-5 w-5 text-[#c9a96e]" />
                    Easy booking
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-3">
                  {specifications.map((spec) => {
                    const Icon = spec.icon;

                    return (
                      <div
                        key={spec.label}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#171717] p-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c9a96e]/10">
                          <Icon className="h-5 w-5 text-[#d7b77d]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">
                            {spec.label}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-gray-100">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-white/10 bg-[#141414] p-5">
                  <h3 className="font-semibold text-white">
                    Your journey, your way
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    Enjoy a comfortable driving experience with a vehicle
                    selected for your travel needs. Check your dates, enter
                    your details and submit a booking request to get started.
                  </p>
                </div>
              </div>
            </div>

            {/* Booking benefits */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  icon: CalendarDays,
                  title: "Flexible dates",
                  subtitle: "Choose your travel plan",
                },
                {
                  icon: ShieldCheck,
                  title: "Simple booking",
                  subtitle: "A clear booking summary",
                },
                {
                  icon: Clock3,
                  title: "Quick request",
                  subtitle: "Submit in a few steps",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111111] p-4"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-[#c9a96e]" />

                    <div>
                      <p className="text-sm font-medium">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Booking form */}
          <aside className="lg:sticky lg:top-6">
            <form
              onSubmit={handleBooking}
              className="overflow-hidden rounded-2xl border border-[#c9a96e]/30 bg-[#111111] shadow-2xl shadow-black/30"
            >
              <div className="border-b border-white/10 bg-gradient-to-r from-[#1b1812] to-[#111111] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a96e]">
                  Book your car
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Reserve Your Drive
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Select your dates and enter your details.
                  Login ki zaroorat nahi hai.
                </p>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {/* Dates */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pickupDate"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Pickup date
                    </label>

                    <input
                      id="pickupDate"
                      type="date"
                      min={localToday}
                      required
                      value={pickupDate}
                      onChange={(event) =>
                        handlePickupDate(event.target.value)
                      }
                      className="w-full min-w-0 rounded-lg border border-white/10 bg-[#1b1b1b] px-3 py-3 text-sm text-white outline-none transition focus:border-[#c9a96e] [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="returnDate"
                      className="mb-2 block text-sm font-medium text-gray-300"
                    >
                      Return date
                    </label>

                    <input
                      id="returnDate"
                      type="date"
                      min={pickupDate || localToday}
                      required
                      value={returnDate}
                      onChange={(event) => {
                        setReturnDate(event.target.value);
                        setBookingStatus(null);
                      }}
                      className="w-full min-w-0 rounded-lg border border-white/10 bg-[#1b1b1b] px-3 py-3 text-sm text-white outline-none transition focus:border-[#c9a96e] [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Pickup location */}
                <div>
                  <label
                    htmlFor="pickupLocation"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Pickup location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a96e]" />

                    <input
                      id="pickupLocation"
                      type="text"
                      placeholder="Enter city or location"
                      required
                      value={pickupLocation}
                      onChange={(event) => {
                        setPickupLocation(event.target.value);
                        setBookingStatus(null);
                      }}
                      className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] py-3 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#c9a96e]"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* Customer details */}
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#d7b77d]">
                    Your details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Full name
                      </label>

                      <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                        value={fullName}
                        onChange={(event) => {
                          setFullName(event.target.value);
                          setBookingStatus(null);
                        }}
                        className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setBookingStatus(null);
                        }}
                        className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#c9a96e]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Phone number
                      </label>

                      <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter phone number"
                        autoComplete="tel"
                        required
                        value={phoneNumber}
                        onChange={(event) => {
                          setPhoneNumber(event.target.value);
                          setBookingStatus(null);
                        }}
                        className="w-full rounded-lg border border-white/10 bg-[#1b1b1b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#c9a96e]"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking status */}
                {bookingStatus && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex gap-3 rounded-lg border p-3 text-sm ${
                      bookingStatus.type === "success"
                        ? "border-green-500/20 bg-green-500/10 text-green-300"
                        : "border-red-500/20 bg-red-500/10 text-red-300"
                    }`}
                  >
                    {bookingStatus.type === "success" && (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    )}

                    <p>{bookingStatus.message}</p>
                  </div>
                )}

                {/* Price summary */}
                <div className="rounded-xl border border-white/10 bg-[#171717] p-4">
                  <h3 className="mb-4 font-semibold">
                    Booking summary
                  </h3>

                  <div className="flex justify-between gap-3 py-2 text-sm">
                    <span className="text-gray-400">
                      Price per day
                    </span>

                    <span className="font-medium">
                      ₹{dailyRate.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 py-2 text-sm">
                    <span className="text-gray-400">
                      Duration
                    </span>

                    <span className="font-medium">
                      {totalDays > 0
                        ? `${totalDays} ${
                            totalDays === 1 ? "day" : "days"
                          }`
                        : "Select dates"}
                    </span>
                  </div>

                  <div className="my-2 border-t border-white/10" />

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <span className="font-medium text-gray-300">
                      Total rent
                    </span>

                    <span className="text-xl font-bold text-[#d7b77d] sm:text-2xl">
                      ₹{totalRent.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Final charges, availability and booking confirmation
                    are subject to the rental provider's terms.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isBooking || loading || totalDays <= 0}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c9a96e] px-5 py-4 text-sm font-bold tracking-wide text-black transition duration-200 hover:bg-[#dfc18c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isBooking ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    "CONFIRM BOOKING"
                  )}
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-[#c9a96e]" />
                  Your booking details are submitted securely.
                </p>
              </div>
            </form>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetails;
