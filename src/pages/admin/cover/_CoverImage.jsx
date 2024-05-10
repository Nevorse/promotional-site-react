import { useEffect, useState } from "react";
import _ImageComp from "../components/_ImageComp";
import _FileInput from "../components/_FileInput";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";
import {
  addData,
  deleteDocument,
  storage,
  updateAllDataAlignment,
} from "../../../firebase";
import { setAllData } from "../../../setFuncs";
import { useSelector } from "react-redux";
import { useBeforeUnload } from "react-router-dom";
import useCheckUnsavedDataAndRedirect from "../../../hooks/useCheckUnsavedDataAndRedirect";

export default function CoverImage_() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [collData, setCollData] = useState([]);
  const { coverImages } = useSelector((state) => state.collections);

  useBeforeUnload(uploadedImages.length > 0 ? (e) => e.preventDefault() : null);
  const checkFunction = useCheckUnsavedDataAndRedirect(uploadedImages.length);

  useEffect(() => {
    setCollData(coverImages);
  }, [coverImages]);
  useEffect(() => {
    if (collData.length < 1) {
      setAllData("cover_images").then((allData) => setCollData(allData));
    }
  }, []);

  const deleteHandle = (item) => {
    const imageName = item.data.split("%2F")[1].split("?")[0];
    const decodeName = decodeURI(imageName);
    const imageRef = ref(storage, `images/${decodeName}`);

    deleteDocument("cover_images", item.id).then(() =>
      deleteObject(imageRef).then(() => setAllData("cover_images"))
    );
  };
  const uploadedDeleteHandle = (obj) => {
    const ref = Object.values(obj)[0];
    deleteObject(ref)
      .then(() => {
        setUploadedImages((prev) => [...prev].filter((item) => item != obj));
        toast.success("Dosya silindi.");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleUpload = async () => {
    const collection = "cover_images";
    let data = [];
    uploadedImages.forEach((obj) => {
      data.push(Object.keys(obj)[0]);
    });

    if (!data.length == 0) {
      for (let i = 0; i < data.length; i++) {
        const response = await addData(collection, data[i]);
        const id = response.id;
        if (id) {
          toast.success("Albüm Kaydedildi.");
        } else return toast.error("Hata");
      }
      setAllData(collection);
      /*---Clear all---*/
      setUploadedImages([]);
    } else if (data.length == 0) {
      return toast.error("Fotoğraf Yükleyiniz.");
    }
  };
  const handleDocAlignment = (project) => {
    const arr = collData.filter((e) => e != project);
    arr.unshift(project);
    setCollData(arr);
  };
  const handleSaveDocAlignment = () => {
    updateAllDataAlignment("cover_images", collData)
      .then((res) => {
        setAllData("cover_images").then((allData) => {
          setCollData(allData);
          toast.success(res);
        });
      })
      .catch((err) => toast.error(err.message));
  };
  const handleSave = async () => {
    if (uploadedImages.length > 0) {
      handleUpload().then(() => {
        handleSaveDocAlignment();
      });
    } else {
      handleSaveDocAlignment();
    }
  };

  return (
    <div className="flex flex-col items-center gap-16 w-[100vw] relative">
      <button
        onClick={checkFunction}
        className="absolute left-[5vw] top-[-34px] bg-indigo-500 text-white border border-indigo-500 rounded-lg px-4 py-1.5 text-[15px] leading-5">
        Geri git
      </button>

      <div className="mt-10 flex flex-col items-center gap-10 w-[90%] max-w-[500px]">
        <_FileInput setUploadedImages={setUploadedImages} />
        <button
          className="bg-lime-600 px-4 py-2 rounded-md text-neutral-50 border border-lime-600 shadow-md
              hover:bg-lime-500/90 hover:text-white transition-colors"
          onClick={handleSave}>
          Kaydet
        </button>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {collData.map((item) => (
          <div key={item.id} className="text-center">
            <_ImageComp
              url={item.data}
              deleteHandle={() => deleteHandle(item)}
              coverHandle={() => handleDocAlignment(item)}
              coverImage={collData[0].data}
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
