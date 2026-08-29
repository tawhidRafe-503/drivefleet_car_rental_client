import AvailableCars from "@/components/home/AvailableCars";

export default function CarsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8 mb-6">
        <h1 className="font-display text-3xl font-bold text-white">Explore Available Cars</h1>
        <p className="text-slate-400 text-sm mt-1">Browse our complete vehicle fleet across all categories and locations.</p>
      </div>
      <AvailableCars />
    </div>
  );
}
