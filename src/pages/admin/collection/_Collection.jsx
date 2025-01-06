import _Card from "../components/_Card";
import { useEffect, useState } from "react";
import { setAllData } from "../../../setFuncs";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addData, deleteDocument, updateAllDataAlignment } from "../../../firebase";
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

  const createAlbum = async () => {
    const response = await addData(
      collection,
      undefined,
      `Albüm ${collData?.length + 1}`,
      ""
    );
    const id = response.id;
    if (id) toast.success("Albüm Eklendi.");
    setAllData(collection);
  };
  const deleteHandle = (id) => {
    const conf = confirm("Albümü sil ?");
    if (conf) deleteDocument(collection, id);
  };
  const handleDocAlignment = (doc) => {
    const arr = collData.filter((e) => e != doc);
    arr.unshift(doc);
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
        className="absolute left-[5vw] top-[-34px] bg-indigo-500 text-white border border-indigo-500 rounded-lg px-4 py-1.5 text-[15px] leading-5"
      >
        Geri git
      </button>
      <h1 className="font-semibold text-lg mb-1">
        {collection == "project_albums" && "Proje Klasörleri"}
        {collection == "service_albums" && "Hizmetler"}
      </h1>
      <h2 className="font-semibold mb-2">
        {collection == "project_albums" && "İlk 8 albüm anasayfada görünür."}
      </h2>
      <div className="flex gap-5">
        <button
          onClick={createAlbum}
          className="bg-slate-300 px-3 py-1 rounded-lg text-[15px]"
        >
          Yeni{" "}
          {collection == "project_albums" && "Klasör"}
          {collection == "service_albums" && "Albüm"}
        </button>
        <button
          onClick={handleSaveDocAlignment}
          className="bg-cyan-400 px-3 py-1 rounded-lg text-[15px]"
        >
          Kaydet
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-9 mt-10 mx-2">
        {collData?.map((document) => (
          <div key={document.id} className="flex flex-col gap-2 items-center">
            <Link to={document.id}>
              <_Card album={document} />
            </Link>
            <div>
              {collection == "service_albums" && (<button
                onClick={() => deleteHandle(document.id)}
                className="mr-2 bg-red-400 px-3 py-1 text-[14px] text-white border border-red-500 rounded-md"
              >
                {collection == "service_albums" && "Albümü"}
                {/* {collection == "service_albums" && "Klasörü"} */}
                {" "}Sil
              </button>)}
              <button
                onClick={() => handleDocAlignment(document)}
                className="bg-emerald-400 px-3 py-1 rounded-lg text-[15px]"
              >
                {collection == "project_albums" && "Klasörü"}
                {collection == "service_albums" && "Albümü"}
                {" "}başa al
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
