import _Card from "../components/_Card";
import { useEffect, useState } from "react";
import { setAllData, setDeleteData } from "../../../setFuncs";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { storage, updateAllDataAlignment } from "../../../firebase";
import toast from "react-hot-toast";

export default function _Collection() {
  const { projects, services } = useSelector((state) => state.collections);
  const [collData, setCollData] = useState([]);
  const [collection, setCollection] = useState({});
  const location = useLocation();

  useEffect(() => {
    const coll = location.pathname.split("/")[2];
    if (coll == "projects") {
      setCollData(projects);
      setCollection("project_albums");
    }
    if (coll == "services") {
      setCollData(services);
      setCollection("service_albums");
    }
  }, [projects, services]);

  useEffect(() => {
    if (collData.length < 1) {
      setAllData(collection).then((allData) => setCollData(allData));
    }
  }, [collection]);

  const deleteHandle = (id) => {
    const conf = confirm("albümü sil");
    if (conf) {
      let delData = {};
      for (let i = 0; i < collData.length; i++) {
        if (collData[i].id == id) {
          delData = collData[i];
        }
      }
      setDeleteData(collection, id, collData).then(() => {
        const data = delData.data;
        for (let i = 0; i < data.length; i++) {
          const imageName = data[i].split("%2F")[1].split("?")[0];
          const decodeName = decodeURI(imageName);
          const imageRef = ref(storage, `images/${decodeName}`);
          deleteObject(imageRef).catch((err) => toast.error(err.message));
        }
      });
    }
  };

  const handleProjectAlignment = (project) => {
    const arr = collData.filter((e) => e != project);
    arr.unshift(project);
    setCollData(arr);
  };
  const handleSaveCollData = () => {
    updateAllDataAlignment(collection, collData)
      .then((res) => {
        setAllData(collection).then((allData) => {
          setCollData(allData);
          toast.success(res);
        });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <h1 className="font-semibold text-lg mb-1">
        {collection == "project_albums" && "Projeler"}
        {collection == "service_albums" && "Servisler"}
      </h1>
      <h2 className="font-semibold mb-2">
        {collection == "project_albums" && "İlk altı albüm anasayfada görünür."}
      </h2>
      <button
        onClick={handleSaveCollData}
        className="bg-cyan-400 px-3 py-1 rounded-lg text-[15px]">
        Kaydet
      </button>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-9 mt-10">
        {collData?.map((project) => (
          <div key={project.id} className="flex flex-col gap-2 items-center">
            <Link to={project.id}>
              <_Card album={project} />
            </Link>
            <div>
              <button
                onClick={() => deleteHandle(project.id)}
                className="mr-2 bg-red-400 px-3 py-1 text-[14px] text-white border border-red-500 rounded-md">
                Albümü Sil
              </button>
              <button
                onClick={() => handleProjectAlignment(project)}
                className="bg-emerald-400 px-3 py-1 rounded-lg text-[15px]">
                Albümü başa al
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
