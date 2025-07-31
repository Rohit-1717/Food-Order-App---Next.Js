import CountdownTimer from "./CountdownTimer";
import Image from "next/image";

export default function OfferBanner() {
  return (
    <div className="sticky top-0 z-20 overflow-hidden rounded-xl w-full h-[200px] sm:h-[240px]  shadow-md mb-6 ">
      <Image
        src="/Black White Simple Opening Banner.png"
        alt="Offer Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow">
          Mega Deal of the Day!
        </h1>
        <CountdownTimer />
      </div>
    </div>
  );
}
