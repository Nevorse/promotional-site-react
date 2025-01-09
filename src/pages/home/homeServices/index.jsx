import CardSlider from "./CardSlider";

export default function HomeServices() {
  return (
    <div className="w-full mt-36 pb-10 bg-[color:var(--theme-secondary)]">
      <div className="flex flex-col items-center mb-2">
        <div className="text-[color:var(--color-primary)] text-center text-4xl font-bold tracking-wider mb-4">
          Hizmetlerimiz
        </div>
        <div className="w-36 h-px bg-[color:var(--color-primary)]"></div>
      </div>
      <CardSlider />
    </div>
  );
}
