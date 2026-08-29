import AvailableCars from "@/components/home/AvailableCars";

export default function CarsPage() {
  return (
    <div className="py-12 theme-bg min-h-screen transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 md:px-8 mb-6">
        <h1 className="font-display text-3xl font-bold theme-text">Explore Available Cars</h1>
        <p className="theme-text-muted text-sm mt-1">
          Browse our complete vehicle fleet across all categories and locations.
        </p>
      </div>
      <AvailableCars />
    </div>
  );
}
