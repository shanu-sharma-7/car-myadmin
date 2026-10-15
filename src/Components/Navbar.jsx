
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logocar from "../assets/logocar.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Cars", to: "/car" },
    { label: "My Bookings", to: "/booking" },
    { label: "Contact", to: "/Contact" },
  ];

  return (
    <header className="relative z-50 bg-[#090909] px-4 pt-3 sm:px-6 lg:px-10">
      <nav className="mx-auto max-w-[1400px] border border-white/10 bg-[#111111]">
        <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-3"
            aria-label="CarArea home"
          >
            <img
              src={logocar}
              alt="CarArea logo"
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            />

            <div>
              <p className="font-serif text-xl font-semibold tracking-[0.12em] text-white sm:text-2xl">
                CAR<span className="text-[#d7b77d]">AREA</span>
              </p>
              <p className="mt-0.5 text-[8px] uppercase tracking-[0.25em] text-white/40 sm:text-[9px]">
                The Art of Driving
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/65 transition hover:text-[#e0c18b] xl:text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#d7b77d] transition hover:border-[#c9a96e] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#111111] px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="border-b border-white/[0.07] py-4 text-xs font-medium uppercase tracking-[0.16em] text-white/70 transition hover:pl-2 hover:text-[#e0c18b]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
