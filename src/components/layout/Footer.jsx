import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="theme-card mt-20 border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-xl font-bold theme-text tracking-wide">DriveFleet</p>
          <p className="mt-3 max-w-xs text-sm theme-text-muted leading-relaxed">
            A full-stack car rental platform connecting drivers with trusted local car owners.
          </p>
          <div className="mt-5 flex gap-3">
            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="theme-card flex h-9 w-9 items-center justify-center rounded-full border transition hover:bg-cyan-500 hover:border-cyan-500 hover:text-white"
                aria-label="Social Link"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-wider uppercase theme-text">Explore</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="theme-text-muted hover:text-cyan-500 transition">Home</Link></li>
            <li><Link href="/cars" className="theme-text-muted hover:text-cyan-500 transition">Explore cars</Link></li>
            <li><Link href="/add-car" className="theme-text-muted hover:text-cyan-500 transition">Add a car</Link></li>
            <li><Link href="/my-bookings" className="theme-text-muted hover:text-cyan-500 transition">My bookings</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-wider uppercase theme-text">Company</p>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="theme-text-muted hover:text-cyan-500 transition">About us</a></li>
            <li><a href="#" className="theme-text-muted hover:text-cyan-500 transition">How it works</a></li>
            <li><a href="#" className="theme-text-muted hover:text-cyan-500 transition">Terms of service</a></li>
            <li><a href="#" className="theme-text-muted hover:text-cyan-500 transition">Privacy policy</a></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-wider uppercase theme-text">Contact</p>
          <ul className="space-y-3 text-sm theme-text-muted">
            <li>Cumilla, Chattogram, Bangladesh</li>
            <li>tawhidrafe2040@gmail.com</li>
            <li>+880 1XXX-XXXXXX</li>
          </ul>
        </div>
      </div>

      <div className="border-t theme-border px-4 py-5 text-center text-xs theme-text-muted md:px-8">
        © {new Date().getFullYear()} DriveFleet. All rights reserved by Tawhid Rafe
      </div>
    </footer>
  );
}
