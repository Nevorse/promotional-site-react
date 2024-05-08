import CardSlider from "./CardSlider";

export default function HomeServices() {
  return (
    <div className="w-full pt-16 pb-10 bg-black/5">
      <div className="flex flex-col items-center">
        <div className="text-gray-800 text-center text-3xl font-bold tracking-wider mb-4">
          Hizmetlerimiz
        </div>
        <div className=" w-36 h-px bg-slate-500"></div>
      </div>
      <CardSlider />
    </div>
  );
}
