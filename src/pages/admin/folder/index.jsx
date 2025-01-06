import _Card from "../components/_Card";
import _FileInput from "../components/_FileInput";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAllData } from "../../../setFuncs";
import { useSelector } from "react-redux";
import {
  addData,
  deleteDocument,
  updateAllDataAlignment,
  updateData,
} from "../../../firebase";
import toast from "react-hot-toast";

export default function _Folders() {
  const navigate = useNavigate();
  const { projectFolders, projects } = useSelector((state) => state.collections);
  const [collection, setCollection] = useState(() => {
    const coll = location.pathname.split("/")[2];
    if (coll == "projects") return "project_albums";
    else return "";
  });
  const [folderId, setFolderId] = useState(() => location.pathname.split("/")[3]);
  const [folderTitle, setFolderTitle] = useState("");
  const [folderImage, setFolderImage] = useState(projects.find((o) => o.id == folderId)?.data);
  const [collData, setCollData] = useState(projectFolders.find((o) => o.id == folderId)?.data);

  console.log(projectFolders);

  useEffect(() => {
    if (!collData) setAllData(collection, folderId);
  }, [folderId]);

  useEffect(() => {
    if (collection == "project_albums")
      setCollData(projectFolders.find((o) => o.id == folderId)?.data);
  }, [projectFolders]);
  
  useEffect(() => {
    const obj = projects.find(o => o.id == folderId)
    if (obj?.title) setFolderTitle(obj?.title);
    if (obj?.data.length) setFolderImage(obj?.data);
  }, [projects]);

  const createAlbum = async () => {
    const response = await addData(
      collection,
      undefined,
      `inFolder ${(collData?.length || 0 ) + 1}`,
      "",
      folderId
    );
    const id = response.id;
    if (id) toast.success("Albüm Eklendi.");
    setAllData(collection, folderId);
  };
  const handleSave = async () => {
    updateData(collection, folderId, folderImage, folderTitle).then(() => {
      updateAllDataAlignment(collection, collData, folderId).then(() => {
        setAllData(collection).then(() => {
          handleSaveDocAlignment();
        });
      });
    });
  };
  const deleteHandle = (id) => {
    const conf = confirm("Albümü sil ?");
    if (conf) deleteDocument(collection, [folderId, "folder", id]);
  };
  const handleDocAlignment = (doc) => {
    const arr = collData.filter((e) => e != doc);
    arr.unshift(doc);
    setCollData(arr);
  };
  const handleSaveDocAlignment = () => {
    updateAllDataAlignment(collection, collData, folderId)
      .then(() => {
        setAllData(collection, folderId).then((allData) => {
          // setCollData(allData);
          toast.success("Klasör Kaydedildi.");
        });
      })
      .catch((err) => toast.error(err.message));
  };
  const deleteFolder = () => {
    const conf = confirm("Klasörü Sil ?");
    if (conf) {
      deleteDocument(collection, folderId);
      prevPage();
    }
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
      <div className="max-w-[500px] w-full mb-3">
        <label htmlFor="title" className="font-semibold text-gray-700 ml-2">
          Albüm Başlığı
        </label>
        <input
          id="title"
          onChange={(e) => setFolderTitle(e.target.value)}
          value={folderTitle}
          type="text"
          className="border mt-1 border-slate-400 bg-slate-50 p-2 w-full rounded-lg shadow-md focus:outline-slate-500 text-neutral-800"
        />
      </div>
      <div className="flex flex-col max-w-[500px] w-full gap-5 mb-6 relative">
        <div
          style={{ backgroundImage: `url(${folderImage})` }}
          className="w-full h-40 opacity-60 blur-[2px] bg-center bg-cover bg-no-repeat pointer-events-none z-10 absolute"
        />

        <_FileInput
          collection={collection}
          docId={folderId}
          setDocImages={setFolderImage}
          handleSaveAlbum={handleSave}
          folder={true}
        />
      </div>

      <div className="flex gap-5">
        <button
          onClick={createAlbum}
          className="bg-slate-300 px-3 py-1 rounded-lg text-[15px]"
        >
          Yeni Albüm
        </button>
        <button
          onClick={handleSave}
          className="bg-cyan-400 px-3 py-1 rounded-lg text-[15px]"
        >
          Kaydet
        </button>
      </div>

      {collData?.length < 1 && (
        <button
          onClick={() => deleteFolder()}
          className="mt-10 bg-red-400 px-4 py-3 text-[16px] text-white border border-red-500 rounded-md"
        >
          Klasörü Sil
        </button>
      )}

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-9 mt-10 mx-2">
        {collData?.map((document) => (
          <div key={document.id} className="flex flex-col gap-2 items-center">
            <Link to={document.id}>
              <_Card album={document} />
            </Link>
            <div>
              <button
                onClick={() => deleteHandle(document.id)}
                className="mr-2 bg-red-400 px-3 py-1 text-[14px] text-white border border-red-500 rounded-md"
              >
                Albümü Sil
              </button>
              <button
                onClick={() => handleDocAlignment(document)}
                className="bg-emerald-400 px-3 py-1 rounded-lg text-[15px]"
              >
                Albümü başa al
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
