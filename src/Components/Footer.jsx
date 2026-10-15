
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import logocar from "../assets/logocar.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070707] px-5 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Footer columns */}
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-10 lg:pb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logocar}
                alt="CarArea logo"
                className="h-11 w-11 object-contain"
              />

              <div>
                <h2 className="font-serif text-2xl tracking-[0.12em] text-white">
                  CAR<span className="text-[#d7b77d]">AREA</span>
                </h2>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-white/40">
                  The Art of Driving
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              Discover a better way to travel with a carefully selected
              collection of vehicles and a commitment to exceptional service.
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { Icon: FaFacebook, label: "Facebook" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaLinkedin, label: "LinkedIn" },
                { Icon: FaTwitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  onClick={(event) => event.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/60 transition hover:border-[#c9a96e]/50 hover:text-[#d7b77d]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>

            <div className="flex flex-col items-start gap-4">
              {[
                { label: "Home", to: "/" },
                { label: "Our Cars", to: "/car" },
                { label: "My Bookings", to: "/booking" },
                { label: "Contact Us", to: "/Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-white/50 transition hover:translate-x-1 hover:text-[#d7b77d]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Get in Touch
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#c9a96e]" />
                <p className="text-sm leading-6 text-white/50">
                  123 Drive Avenue, Auto City, CA 90201
                </p>
              </div>

              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm text-white/50 transition hover:text-[#d7b77d]"
              >
                <FaPhoneAlt className="shrink-0 text-[#c9a96e]" />
                +91 9999999999
              </a>

              <a
                href="mailto:info@hexagonservice.com"
                className="flex items-start gap-3 break-all text-sm text-white/50 transition hover:text-[#d7b77d]"
              >
                <FaEnvelope className="mt-1 shrink-0 text-[#c9a96e]" />
                info@hexagonservice.com
              </a>
            </div>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-white/80">
                <FaClock className="text-[#c9a96e]" />
                Business Hours
              </p>

              <p className="text-xs leading-6 text-white/45">
                Monday – Friday: 8 AM – 8 PM
                <br />
                Saturday: 9 AM – 6 PM
                <br />
                Sunday: 10 AM – 4 PM
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Stay in the Know
            </h3>

            <p className="text-sm leading-7 text-white/50">
              Be the first to hear about special offers, new arrivals
              and exclusive driving experiences.
            </p>

            <form
              className="mt-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <label
                htmlFor="newsletter-email"
                className="mb-2 block text-xs text-white/60"
              >
                Your email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="min-h-12 w-full border border-white/15 bg-[#111111] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#c9a96e]"
              />

              <button
                type="submit"
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-3 bg-[#c9a96e] px-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0c18b]"
              >
                Subscribe
                <FaArrowRight size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-white/40 sm:text-left">
            © {currentYear} CarArea. All rights reserved.
          </p>

          <Link
            to="/"
            className="text-center text-[10px] uppercase tracking-[0.2em] text-white/40 transition hover:text-[#d7b77d]"
          >
            Driven by Excellence
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
