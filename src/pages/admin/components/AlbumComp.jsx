import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAllData } from "../../../setFuncs";
import _ImageComp from "./_ImageComp";
import _FileInput from "./_FileInput";
import { deleteSingleData, storage, updateData } from "../../../firebase";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";

export default function AlbumComp() {
  const [docId, setDocId] = useState();
  const [collection, setCollection] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docImages, setDocImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [counter, setCounter] = useState(0);
  const location = useLocation();
  const { projects, services } = useSelector((state) => state.collections);
  let dataIsSet = false;

  useEffect(() => {
    const id = location.pathname.split("/")[3];
    const coll = location.pathname.split("/")[2];
    setDocId(id);
    if (coll == "projects") setCollection("project_albums");
    if (coll == "services") setCollection("service_albums");
  }, []);

  useEffect(() => {
    setCounter((c) => c + 1);
    getData();
  }, [docId]);

  const coverHandler = (url) => {
    const index = docImages.indexOf(url);
    const arr = [...docImages];
    arr.splice(index, 1);
    arr.unshift(url);
    setDocImages(arr);
  };
  const getData = async () => {
    if (collection == "project_albums") {
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == docId) {
          setData(projects[i]);
          dataIsSet = true;
          break;
        }
      }
    } else if (collection == "service_albums") {
      for (let i = 0; i < services.length; i++) {
        if (services[i].id == docId) {
          setData(services[i]);
          dataIsSet = true;
          break;
        }
      }
    }
    if (!dataIsSet && counter) {
      const allData = await setAllData(collection);
      for (let i = 0; i < allData.length; i++) {
        if (allData[i].id == docId) {
          setData(allData[i]);
          dataIsSet = true;
          break;
        }
      }
    }
  };
  const setData = (document, reload) => {
    if (docImages.length == 0 || reload) {
      setDocImages(document.data);
    }
    setTitle(document.title);
    setContent(document?.content);
  };
  const deleteHandle = (url, index) => {
    const imageName = url.split("%2F")[1].split("?")[0];
    const decodeName = decodeURI(imageName);
    const imageRef = ref(storage, `images/${decodeName}`);

    deleteSingleData(collection, docId, index)
      .then(() => {
        setDocImages((prev) => [...prev].filter((e, i) => i != index));
        deleteObject(imageRef)
          .then(() => {
            toast.success("Silindi.");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const uploadedDeleteHandle = (obj) => {
    const ref = Object.values(obj)[0];
    const url = Object.keys(obj)[0];

    deleteObject(ref)
      .then(() => {
        setUploadedImages((prev) => [...prev].filter((item) => item != obj));
        toast.success("Dosya silindi.");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleAlbumUpload = () => {
    const upData = [];

    docImages.forEach((e) => {
      upData.push(e);
    });
    uploadedImages.forEach((e) => {
      upData.push(Object.keys(e)[0]);
    });
    updateData(collection, docId, upData, title, content)
      .then(() => {
        setAllData(collection)
          .then((allData) => {
            for (let i = 0; i < allData.length; i++) {
              if (allData[i].id == docId) {
                setData(allData[i], true);
                break;
              }
            }
            setUploadedImages([]);
            toast.success("Albüm Kaydedildi");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };
  /*--------------------------*/

  return (
    <div className="flex flex-col items-center gap-5 w-[90%]">
      <div className="flex flex-col max-w-[500px] w-full gap-5">
        <div>
          <label htmlFor="title" className="font-semibold text-gray-700 ml-2">
            Albüm Başlığı
          </label>
          <input
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="border mt-1 border-slate-400 bg-slate-50 p-2 w-full rounded-lg shadow-md focus:outline-slate-500 text-neutral-800"
          />
        </div>
        {collection == "service_albums" && (
          <div>
            <label htmlFor="title" className="font-semibold text-gray-700 ml-2">
              Albüm İçeriği
            </label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              rows={"6"}
              className="border mt-1 border-slate-400 max-h-[250px] transition-all duration-300 bg-slate-50 p-2 w-full rounded-lg shadow-md focus:outline-slate-500 text-neutral-800"
            />
          </div>
        )}
        <_FileInput setUploadedImages={setUploadedImages} />
      </div>

      <button
        className=" bg-lime-600 px-4 py-2 rounded-md text-neutral-50 border border-lime-600 shadow-md
              hover:bg-lime-500/90 hover:text-white transition-colors"
        onClick={handleAlbumUpload}>
        Albümü Kaydet
      </button>

      <div className="flex gap-4 flex-wrap justify-center">
        {docImages.map((url, index) => (
          <div key={url + index} className="text-center">
            <_ImageComp
              url={url}
              deleteHandle={() => deleteHandle(url, index)}
              coverHandle={() => coverHandler(url)}
              coverImage={docImages[0]}
            />
          </div>
        ))}
      </div>
      {uploadedImages.length > 0 && (
        <>
          <div>
            <h1 className="font-semibold text-lg text-gray-800 mt-3 mb-1">
              Yeni Eklenen Fotoğraflar
            </h1>
            <div className="w-48 h-px bg-slate-400" />
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {uploadedImages.map((item) => (
              <div key={Object.keys(item)[0]} className="text-center">
                <_ImageComp
                  url={Object.keys(item)[0]}
                  deleteHandle={() => uploadedDeleteHandle(item)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
