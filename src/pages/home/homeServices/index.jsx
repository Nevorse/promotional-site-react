import CardSlider from "./CardSlider";

export default function HomeServices() {
  return (
    <div className="w-full pt-16 pb-10 bg-[color:var(--theme-secondary)]">
      <div className="flex flex-col items-center">
        <div className="text-[color:var(--color-primary)] text-center text-3xl font-bold tracking-wider mb-4">
          Hizmetlerimiz
        </div>
        <div className=" w-36 h-px bg-[color:var(--color-primary)]"></div>
      </div>
      <CardSlider />
    </div>
  );
}
