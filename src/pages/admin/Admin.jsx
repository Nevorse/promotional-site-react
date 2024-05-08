import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineUploadFile } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <div className="mt-10">
        <Link to={"uploads"}>
          <div className="flex flex-col items-center justify-center">
            <MdOutlineUploadFile size={80} />
            <span>Upload</span>
          </div>
        </Link>
      </div>
      <div className="flex justify-center gap-20 mt-20">
        <Link to={"projects"}>
          <div className="flex flex-col items-center justify-center">
            <AiOutlineFolderOpen size={80} />
            <span>{"Projeler"}</span>
          </div>
        </Link>
        <Link to={"services"}>
          <div className="flex flex-col items-center justify-center">
            <AiOutlineFolderOpen size={80} />
            <span>{"Servisler"}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
