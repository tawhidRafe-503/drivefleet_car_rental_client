import Link from "next/link";
import Image from "next/image";

export default async function CarDetailsPage({ params }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/cars" className="text-xs font-semibold text-cyan-400 hover:underline mb-6 inline-block">
        ← Back to all cars
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-7 relative aspect-16/10 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80"
            alt="Car Details"
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-5 rounded-2xl border border-white/10 bg-[#071427] p-6 shadow-xl">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
            Vehicle #{id}
          </span>
          <h1 className="font-display text-2xl font-bold text-white mt-3">Tesla Model S Plaid</h1>
          <p className="text-xs text-slate-400 mt-1">Location: Dhaka, Bangladesh</p>

          <div className="my-6 border-y border-white/10 py-4">
            <span className="font-display text-3xl font-extrabold text-white">$150</span>
            <span className="text-xs text-slate-400"> / day</span>
          </div>

          <button className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
