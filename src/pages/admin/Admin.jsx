import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineUploadFile } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 sm:mt-10 gap-x-10 gap-y-6 sm:gap-y-10">

      <Link to={"uploads"}>
        <div className="flex flex-col items-center justify-center w-[120px] text-center">
          <MdOutlineUploadFile size={80} />
          <span>Album Yükleme</span>
        </div>
      </Link>
      <Link to={"cover"}>
        <div className="flex flex-col items-center justify-center w-[120px] text-center">
          <MdOutlineUploadFile size={80} />
          <span>Anasayfa Kapak Fotoğrafı</span>
        </div>
      </Link>
      <Link to={"projects"}>
        <div className="flex flex-col items-center justify-center w-[120px] text-center">
          <AiOutlineFolderOpen size={80} />
          <span>{"Projeler"}</span>
        </div>
      </Link>
      <Link to={"services"}>
        <div className="flex flex-col items-center justify-center w-[120px] text-center">
          <AiOutlineFolderOpen size={80} />
          <span>{"Servisler"}</span>
        </div>
      </Link>

    </div>
  );
}
