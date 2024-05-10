export default function _ImageComp({ url, deleteHandle, coverHandle, coverImage }) {
  return (
    <div className="relative group">
      <div className="border flex flex-col w-[350px] gap-5 bg-slate-100 rounded-md overflow-hidden shadow-lg">
        <div
          style={{ backgroundImage: `url(${url})` }}
          className={"w-full bg-no-repeat bg-center bg-cover h-[220px]"}
        />
        {/* <img
        src={url}
        className={"w-full bg-no-repeat bg-center h-[220px] object-cover"}
      /> */}
      </div>
      <div
        className="flex flex-col items-center justify-center 
      absolute inset-0 rounded-md overflow-hidden transition-all group-hover:bg-black/50">
        {(coverImage || coverHandle) && (
          <button
            onClick={coverHandle}
            disabled={url === coverImage}
            className=" bg-emerald-400 hover:bg-emerald-400/80 disabled:bg-emerald-500 disabled:cursor-not-allowed px-3 py-1 rounded-lg text-[15px] mt-2 hidden group-hover:block transition-all">
            Fotoğrafı başa al
          </button>
        )}

        <button
          onClick={deleteHandle}
          className="bg-red-300 hover:bg-red-300/80 px-3 py-1 rounded-lg text-[15px] mt-2 hidden group-hover:block transition-all">
          Fotoğrafı Sil
        </button>
      </div>
    </div>
  );
}
