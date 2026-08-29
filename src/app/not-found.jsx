import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-6xl font-extrabold text-cyan-400">404</h1>
      <h2 className="mt-4 font-display text-2xl font-bold text-white">Page Not Found</h2>
      <p className="mt-2 text-sm text-slate-400 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
      >
        Back to Home
      </Link>
    </div>
  );
}
