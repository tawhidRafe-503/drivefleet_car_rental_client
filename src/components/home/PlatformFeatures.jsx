"use client";

import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineSupport } from "react-icons/hi";

const features = [
  {
    icon: HiOutlineShieldCheck,
    title: "100% Verified Owners & Fleet",
    description: "Every car listed undergoes a strict multi-point safety and documentation check.",
  },
  {
    icon: HiOutlineClock,
    title: "Instant Booking Confirmation",
    description: "Book your vehicle online within seconds with instant digital confirmation.",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Transparent & Best Pricing",
    description: "Enjoy competitive daily rates with zero hidden charges or surprise insurance fees.",
  },
  {
    icon: HiOutlineSupport,
    title: "24/7 Roadside Assistance",
    description: "Our dedicated support team and roadside assistance are always one call away.",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="py-20 theme-bg border-y theme-border">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest">Why DriveFleet</p>
          <h2 className="mt-3 font-display text-3xl font-bold theme-text sm:text-4xl">
            Designed for Seamless Travel
          </h2>
          <p className="mt-3 theme-text-muted text-sm">
            We simplify car rental so you can focus entirely on enjoying your trip with complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="theme-card group rounded-2xl border p-6 backdrop-blur-sm transition duration-300 hover:border-cyan-500/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 transition group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 font-display text-base font-bold theme-text">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed theme-text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
