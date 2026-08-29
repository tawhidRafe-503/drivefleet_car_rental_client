import Banner from "@/components/home/Banner";
import AvailableCars from "@/components/home/AvailableCars";
import PlatformFeatures from "@/components/home/PlatformFeatures";
import RentalSteps from "@/components/home/RentalSteps";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <AvailableCars />
      <PlatformFeatures />
      <RentalSteps />
    </div>
  );
}
