
import React from "react";
import {
  FaCar,
  FaStar,
  FaRegStar,
  FaArrowRight,
} from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { GiSteeringWheel } from "react-icons/gi";
import { Link } from "react-router-dom";

const testimonials = [
  {
    car: "BMW 5 Series",
    rating: 5,
    review:
      "The BMW 5 Series was impeccable! Smooth ride, excellent service and plenty of space. Would definitely rent again.",
    initials: "RK",
  },
  {
    car: "Toyota Highlander",
    rating: 4,
    review:
      "Perfect family SUV with ample space. Clean, well-maintained and great value for money.",
    initials: "AM",
  },
  {
    car: "Ford Mustang",
    rating: 5,
    review:
      "The convertible Ford Mustang made our coastal drive unforgettable. The support made the whole experience even better.",
    initials: "PS",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "250+", label: "Luxury Vehicles" },
  { value: "24/7", label: "Customer Support" },
  { value: "50+", label: "Locations" },
];

const Experiences = () => {
  return (
    <section className="relative overflow-hidden bg-[#090909] px-4 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#c9a96e]/[0.05] blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c9a96e]" />
            <FaCar className="text-sm text-[#d7b77d]" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d7b77d] sm:text-xs sm:tracking-[0.4em]">
              Customer Experiences
            </p>
            <span className="h-px w-8 bg-[#c9a96e]" />
          </div>

          <h2 className="font-serif text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
            Every Journey
            <span className="block italic text-[#d7b77d]">
              Leaves a Story.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Great cars make a difference. Exceptional service makes
            the experience unforgettable.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.car}
              className="flex min-w-0 flex-col border border-white/10 bg-[#111111] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9a96e]/40 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <ImQuotesLeft className="text-2xl text-[#c9a96e]/70" />

                <div
                  className="flex shrink-0 gap-1"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) =>
                    index < item.rating ? (
                      <FaStar
                        key={index}
                        className="text-sm text-[#d7b77d]"
                      />
                    ) : (
                      <FaRegStar
                        key={index}
                        className="text-sm text-[#d7b77d]/60"
                      />
                    )
                  )}
                </div>
              </div>

              <p className="my-7 flex-1 font-serif text-lg italic leading-8 text-white/80 sm:text-xl">
                "{item.review}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a96e]/40 bg-[#c9a96e]/10 text-xs font-semibold tracking-wider text-[#e0c18b]">
                  {item.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    CarArea Customer
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-[#d7b77d]">
                    <GiSteeringWheel size={15} />
                    {item.car}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 border-y border-white/10 bg-[#101010] px-4 py-8 sm:mt-20 sm:px-8 sm:py-10">
          <div className="grid grid-cols-2 gap-y-9 md:grid-cols-4 md:gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center ${
                  index > 0 ? "md:border-l md:border-white/10" : ""
                }`}
              >
                <p className="font-serif text-3xl text-[#d7b77d] sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/45 sm:text-xs sm:tracking-[0.16em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final call to action */}
        <div className="relative mt-16 overflow-hidden border border-[#c9a96e]/25 bg-gradient-to-br from-[#17140f] via-[#111111] to-[#0b0b0b] px-5 py-12 text-center sm:mt-20 sm:px-10 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#c9a96e]/10 blur-[80px]" />

          <div className="relative mx-auto max-w-2xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#d7b77d] sm:text-xs">
              Your next adventure awaits
            </p>

            <h3 className="font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready for Something
              <span className="block mt-2 italic text-[#d7b77d]">
                Extraordinary?
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Explore our collection and find a car that makes every
              mile worth remembering.
            </p>

            <Link
              to="/car"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-4 bg-[#c9a96e] px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0c18b] sm:px-9"
            >
              Book Your Luxury Ride
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
