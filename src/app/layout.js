import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/shared/Toast";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata = {
  title: "DriveFleet — Rent your perfect journey",
  description:
    "A full-stack car rental platform. Explore cars, manage bookings, and rent with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="drivefleet">
      <body className="flex min-h-screen flex-col bg-[#040d1a] text-slate-100 antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
