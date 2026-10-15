
import React, { useState } from "react";
import {
  FaInfoCircle,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaCalendarAlt,
  FaPaperPlane,
  FaUser,
  FaCar,
  FaPhone,
  FaCommentDots,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carName: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, phone, carName, message } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setFormMessage("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFormMessage("Please enter a valid email address.");
      return;
    }

    const whatsappNumber = "+919999999999";

    const whatsappMessage = [
      "Hello CarArea!",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Car of Interest: ${carName.trim() || "Not specified"}`,
      "",
      `Rental Query: ${message.trim()}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setFormMessage("Your query is ready to send on WhatsApp.");
  };

  const contactItems = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      description: "+91 99999 99999",
      detail: "Chat with our team",
    },
    {
      icon: FaEnvelope,
      title: "Email Address",
      description: "Contact@carapna.com",
      detail: "Send us your questions",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      description: "Monday – Saturday: 8 AM – 8 PM",
      secondLine: "Sunday: 10 AM – 6 PM",
    },
    {
      icon: FaCalendarAlt,
      title: "Special Offer",
      description: "Book for 3+ days",
      detail: "Get 10% discount",
    },
  ];

  const inputClass =
    "w-full min-w-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35";

  const fieldClass =
    "flex min-w-0 items-center gap-3 border border-white/10 bg-[#0b0b0b] px-4 transition focus-within:border-[#c9a96e]/70";

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main>
        {/* Hero section */}
        <section className="relative overflow-hidden border-b border-white/[0.07] bg-[#0d0d0d] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#c9a96e]/[0.07] blur-3xl" />

          <div className="relative mx-auto max-w-7xl text-center">
            <p className="mb-4 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d7b77d] sm:text-xs">
              <span className="h-px w-8 bg-[#c9a96e]" />
              We're Here to Help
              <span className="h-px w-8 bg-[#c9a96e]" />
            </p>

            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Contact Our
              <span className="block text-[#d7b77d]">Team.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              Have questions about our cars or your next journey? Get in touch
              with our team. We're here to help make your rental experience
              simple and convenient.
            </p>
          </div>
        </section>

        {/* Contact content */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            {/* Contact information */}
            <div>
              <div className="mb-7">
                <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a96e]">
                  <span className="h-px w-7 bg-[#c9a96e]" />
                  Get in Touch
                </p>

                <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                  Our Information
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Choose the most convenient way to contact us. We look forward
                  to helping you find your next ride.
                </p>
              </div>

              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group flex gap-4 border border-white/[0.08] bg-[#111111] p-4 transition duration-300 hover:border-[#c9a96e]/40 sm:p-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#c9a96e]/25 bg-[#c9a96e]/[0.07] transition group-hover:bg-[#c9a96e]/15">
                        <Icon className="text-lg text-[#d7b77d]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 break-words text-sm text-white/75">
                          {item.description}
                        </p>

                        {item.secondLine && (
                          <p className="mt-1 text-xs text-white/45">
                            {item.secondLine}
                          </p>
                        )}

                        {item.detail && (
                          <p className="mt-1 text-xs text-white/40">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp call to action */}
              <div className="mt-5 border border-[#c9a96e]/20 bg-gradient-to-br from-[#c9a96e]/[0.10] to-transparent p-5 sm:p-6">
                <FaInfoCircle className="mb-3 text-xl text-[#d7b77d]" />

                <h3 className="font-serif text-lg font-semibold">
                  Need help choosing a car?
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  Tell us about your trip, and we'll help you explore the
                  available options.
                </p>

                <a
                  href={`https://wa.me/910000000000?text=${encodeURIComponent(
                    "Hello CarArea! I need help choosing a rental car."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-3 border border-[#c9a96e]/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#e0c18b] transition hover:bg-[#c9a96e] hover:text-black"
                >
                  <FaWhatsapp className="text-base" />
                  Chat on WhatsApp
                  <FaArrowRight />
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="border border-white/[0.09] bg-[#111111] p-5 sm:p-8 lg:p-9">
              <div className="mb-7 border-b border-white/[0.08] pb-6">
                <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a96e]">
                  <span className="h-px w-7 bg-[#c9a96e]" />
                  Let's Talk
                </p>

                <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                  Send Your Query
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Fill out the details below to prepare your rental enquiry.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and email */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-medium text-white/70"
                    >
                      Full Name <span className="text-[#d7b77d]">*</span>
                    </label>

                    <div className={fieldClass}>
                      <FaUser className="shrink-0 text-sm text-[#c9a96e]" />

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-medium text-white/70"
                    >
                      Email Address <span className="text-[#d7b77d]">*</span>
                    </label>

                    <div className={fieldClass}>
                      <FaEnvelope className="shrink-0 text-sm text-[#c9a96e]" />

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Phone and car */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-xs font-medium text-white/70"
                    >
                      Phone Number <span className="text-[#d7b77d]">*</span>
                    </label>

                    <div className={fieldClass}>
                      <FaPhone className="shrink-0 text-sm text-[#c9a96e]" />

                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-car"
                      className="mb-2 block text-xs font-medium text-white/70"
                    >
                      Car of Interest
                    </label>

                    <div className={fieldClass}>
                      <FaCar className="shrink-0 text-sm text-[#c9a96e]" />

                      <input
                        id="contact-car"
                        name="carName"
                        type="text"
                        placeholder="Preferred car (optional)"
                        value={formData.carName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium text-white/70"
                  >
                    Your Message <span className="text-[#d7b77d]">*</span>
                  </label>

                  <div className={`${fieldClass} items-start py-3`}>
                    <FaCommentDots className="mt-1 shrink-0 text-sm text-[#c9a96e]" />

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your rental requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-y bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/35"
                      required
                    />
                  </div>
                </div>

                {formMessage && (
                  <p
                    role="status"
                    className="border border-[#c9a96e]/20 bg-[#c9a96e]/[0.07] px-4 py-3 text-sm text-[#e0c18b]"
                  >
                    {formMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#c9a96e] px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#e0c18b] focus:outline-none focus:ring-2 focus:ring-[#c9a96e] focus:ring-offset-2 focus:ring-offset-[#111111]"
                >
                  <FaPaperPlane />
                  Prepare Enquiry on WhatsApp
                  <FaArrowRight />
                </button>

                <p className="text-center text-xs leading-5 text-white/35">
                  Your message will open in WhatsApp for you to review and
                  send.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
