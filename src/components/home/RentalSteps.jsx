"use client";

import { HiOutlineSearch, HiOutlineClipboardCheck, HiOutlineKey } from "react-icons/hi";

const steps = [
  {
    step: "01",
    icon: HiOutlineSearch,
    title: "Browse & Select",
    description: "Search from our wide range of cars by location, model, price, and category.",
  },
  {
    step: "02",
    icon: HiOutlineClipboardCheck,
    title: "Book & Pay Securely",
    description: "Choose your dates, enter details, and confirm your reservation with safe payment.",
  },
  {
    step: "03",
    icon: HiOutlineKey,
    title: "Pick Up & Enjoy",
    description: "Meet the owner or pick up at designated point and start your journey with ease.",
  },
];

export default function RentalSteps() {
  return (
    <section className="py-20 bg-[#071427]">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">How It Works</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Rent a Car in 3 Easy Steps
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Quick, hassle-free booking experience crafted for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center rounded-2xl border border-white/10 bg-[#040d1a] p-8 shadow-lg"
              >
                <span className="absolute top-4 right-6 font-display text-3xl font-black text-white/10">
                  {item.step}
                </span>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/40 bg-linear-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 max-w-xs">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
