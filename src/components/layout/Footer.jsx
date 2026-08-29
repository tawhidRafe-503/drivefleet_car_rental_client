import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#071427] border-t border-white/10 text-white/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-xl font-bold text-white tracking-wide">DriveFleet</p>
          <p className="mt-3 max-w-xs text-sm text-white/55 leading-relaxed">
            A full-stack car rental platform connecting drivers with trusted local car owners.
          </p>
          <div className="mt-5 flex gap-3">
            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:bg-cyan-500 hover:border-cyan-500 hover:text-black"
                aria-label="Social Link"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-wider text-white uppercase">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link href="/cars" className="hover:text-cyan-400 transition">Explore cars</Link></li>
            <li><Link href="/add-car" className="hover:text-cyan-400 transition">Add a car</Link></li>
            <li><Link href="/my-bookings" className="hover:text-cyan-400 transition">My bookings</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-wider text-white uppercase">Company</p>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">About us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">How it works</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Terms of service</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Privacy policy</a></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-wider text-white uppercase">Contact</p>
          <ul className="space-y-3 text-sm text-white/60">
            <li>Cumilla, Chattogram, Bangladesh</li>
            <li>tawhidrafe2040@gmail.com</li>
            <li>+880 1XXX-XXXXXX</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40 md:px-8">
        © {new Date().getFullYear()} DriveFleet. All rights reserved by Tawhid Rafe
      </div>
    </footer>
  );
}
