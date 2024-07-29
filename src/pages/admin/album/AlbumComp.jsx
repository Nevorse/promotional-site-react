import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAllData } from "../../../setFuncs";
import _FileInput from "../components/_FileInput";
import _ImageComp from "../components/_ImageComp";
import { storage, updateData } from "../../../firebase";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";

export default function AlbumComp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projects, services, coverImages } = useSelector(
    (state) => state.collections
  );
  const [collection, setCollection] = useState(() => {
    const coll = location.pathname.split("/")[2];
    if (coll == "projects") return "project_albums";
    if (coll == "services") return "service_albums";
    if (coll == "cover") return "cover_images";
    else return "";
  });
  const [docId, setDocId] = useState(() =>
    collection != "cover_images" ? location.pathname.split("/")[3] : "cover_doc_id"
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docImages, setDocImages] = useState([]);
  const [prevDocImagesCount, setPrevDocImagesCount] = useState(0);

  useEffect(() => {
    getData();
  }, [docId]);

  const getData = async () => {
    let documentId = false;
    if (collection == "project_albums") {
      documentId = findAndSetAlbum(projects);
    } else if (collection == "service_albums") {
      documentId = findAndSetAlbum(services);
    } else if (collection == "cover_images") {
      documentId = findAndSetAlbum(coverImages);
    }
    if (!documentId) {
      const allData = await setAllData(collection);
      findAndSetAlbum(allData);
    }
  };
  const findAndSetAlbum = (allData) => {
    let documentId = false;
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].id == docId) {
        setData(allData[i]);
        documentId = allData[i].id;
        break;
      }
    }
    return documentId;
  };
  const setData = (document) => {
    if (document?.title) setTitle(document.title);
    if (document?.content) setContent(document.content);
    if (document?.data) {
      setPrevDocImagesCount(document.data.length);
      setDocImages(document.data);
    }
  };
  const handleSaveAlbum = async (upData) => {
    updateData(
      collection,
      docId,
      upData || docImages,
      title,
      content,
      prevDocImagesCount
    )
      .then(() => {
        setAllData(collection)
          .then((allData) => {
            const documentId = findAndSetAlbum(allData);
            if (documentId) toast.success("Albüm Kaydedildi.");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };
  const deleteHandler = (url) => {
    const imageName = decodeURI(url.split("%2F")[3].split("?")[0]);
    const imageRef = ref(storage, `images/${collection}/${docId}/${imageName}`);
    let upData = docImages.filter((e) => e != url);

    deleteObject(imageRef)
      .then(() => {
        toast.success("Silindi.");
        handleSaveAlbum(upData);
      })
      .catch((err) => {
        toast.error(err.code);
        if (err.code == "storage/object-not-found") {
          handleSaveAlbum(upData);
        }
      });
  };
  const coverHandler = (url) => {
    const index = docImages.indexOf(url);
    const arr = [...docImages];
    arr.splice(index, 1);
    arr.unshift(url);
    setDocImages(arr);
  };

  const prevPage = () => {
    const loc = location.pathname.split("/");
    loc.pop();
    const string = loc.toString().replace(/,/g, "/");
    navigate(string);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-[95vw] relative">
      <button
        onClick={prevPage}
        className="absolute left-[5vw] top-[-34px] bg-indigo-500 text-white border border-indigo-500 rounded-lg px-4 py-1.5 text-[15px] leading-5">
        Geri git
      </button>
      <div className="flex flex-col max-w-[500px] w-full gap-5">
        {collection != "cover_images" && (
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
        )}
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
        <_FileInput
          collection={collection}
          docId={docId}
          setDocImages={setDocImages}
          handleSaveAlbum={handleSaveAlbum}
        />
      </div>

      <button
        className=" bg-lime-600 px-4 py-2 rounded-md text-neutral-50 border border-lime-600 shadow-md
              hover:bg-lime-500/90 hover:text-white transition-colors"
        onClick={() => handleSaveAlbum()}>
        Kaydet
      </button>

      <div className="flex gap-4 flex-wrap justify-center">
        {docImages?.map((url, index) => (
          <div key={url + index} className="text-center">
            <_ImageComp
              url={url}
              deleteHandler={() => deleteHandler(url)}
              coverHandler={() => coverHandler(url)}
              coverImage={docImages[0]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
