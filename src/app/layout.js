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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('drivefleet_theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                  document.documentElement.classList.remove('dark', 'light');
                  document.documentElement.classList.add(t);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
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
