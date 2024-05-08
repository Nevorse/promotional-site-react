export default function _Card({ album }) {

  return (
    <div
      className={
        "flex flex-col shadow-md w-[300px] bg-slate-100 rounded-md overflow-hidden"
      }>
      <div
        style={{ backgroundImage: `url(${album?.data[0]})` }}
        className={"w-full bg-no-repeat bg-center bg-cover bg-slate-300 h-[200px]"}
      />
      <h5 className="font-bold text-lg text-center text-neutral-800 py-3">
        {album?.title}
      </h5>

    </div>
  );
}
