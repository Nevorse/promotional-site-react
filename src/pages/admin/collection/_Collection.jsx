import _Card from "../components/_Card";
import { useEffect, useState } from "react";
import { setAllData } from "../../../setFuncs";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteDocument, updateAllDataAlignment } from "../../../firebase";
import toast from "react-hot-toast";

export default function _Collection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projects, services } = useSelector((state) => state.collections);
  const [collection, setCollection] = useState(() => {
    const coll = location.pathname.split("/")[2];
    if (coll == "projects") return "project_albums";
    if (coll == "services") return "service_albums";
    else return "";
  });
  const [collData, setCollData] = useState([]);

  useEffect(() => {
    if (collection == "project_albums") setCollData(projects);
    if (collection == "service_albums") setCollData(services);
  }, [projects, services]);

  const deleteHandle = (id) => {
    const conf = confirm("albümü sil");
    if (conf) {
      deleteDocument(collection, id);
    }
  };
  const handleDocAlignment = (project) => {
    const arr = collData.filter((e) => e != project);
    arr.unshift(project);
    setCollData(arr);
  };
  const handleSaveDocAlignment = () => {
    updateAllDataAlignment(collection, collData)
      .then(() => {
        setAllData(collection).then((allData) => {
          setCollData(allData);
          toast.success("Kaydedildi.");
        });
      })
      .catch((err) => toast.error(err.message));
  };

  const prevPage = () => {
    const loc = location.pathname.split("/");
    loc.pop();
    const string = loc.toString().replace(/,/g, "/");
    navigate(string);
  };

  return (
    <div className="flex flex-col items-center w-[95vw] relative">
      <button
        onClick={prevPage}
        className="absolute left-[5vw] top-[-34px] bg-indigo-500 text-white border border-indigo-500 rounded-lg px-4 py-1.5 text-[15px] leading-5">
        Geri git
      </button>
      <h1 className="font-semibold text-lg mb-1">
        {collection == "project_albums" && "Projeler"}
        {collection == "service_albums" && "Servisler"}
      </h1>
      <h2 className="font-semibold mb-2">
        {collection == "project_albums" && "İlk altı albüm anasayfada görünür."}
      </h2>
      <button
        onClick={handleSaveDocAlignment}
        className="bg-cyan-400 px-3 py-1 rounded-lg text-[15px]">
        Kaydet
      </button>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-9 mt-10 mx-2">
        {collData?.map((document) => (
          <div key={document.id} className="flex flex-col gap-2 items-center">
            <Link to={document.id}>
              <_Card album={document} />
            </Link>
            <div>
              <button
                onClick={() => deleteHandle(document.id)}
                className="mr-2 bg-red-400 px-3 py-1 text-[14px] text-white border border-red-500 rounded-md">
                Albümü Sil
              </button>
              <button
                onClick={() => handleDocAlignment(document)}
                className="bg-emerald-400 px-3 py-1 rounded-lg text-[15px]">
                Albümü başa al
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
