import { useEffect, useRef, useState } from "react";
import { getFileName } from "../../../utils/helpers";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import toast from "react-hot-toast";
import classNames from "classnames";

export default function _FileInput({
  collection,
  docId,
  setDocImages,
  handleSaveAlbum,
  folder,
}) {
  const [imageFiles, setImageFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [singleProgress, setSingleProgress] = useState({});
  const [counter, setCounter] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    const len = imageFiles.length;
    if (len > 0 && trigger > 0) {
      let sum = 0;
      for (let i = 0; i < len; i++) {
        const singleProg = singleProgress[i] || 0;
        sum = sum + singleProg;
      }
      setProgress(sum / len);
    }
    if (counter == len && counter > 0) {
      handleSaveAlbum();
      setImageFiles([]);
      setCounter(0);
      setTrigger(0);
      inputRef.current.value = null;
      toast.success("Yükleme Tamamlandı. ✔️", { duration: 4000 });
    }
  }, [counter, trigger]);

  const onChangeHandle = (e) => {
    const acceptedTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "image/gif",
    ];
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      if (acceptedTypes.includes(files[i].type)) {
        if (!folder) setImageFiles((prev) => [...prev, files[i]]);
        else if (folder) setImageFiles([files[i]])
      } else {
        toast.error(files[i].type + " " + "dosya formatı desteklenmiyor");
      }
    }
  };
  const handleImageUploads = () => {
    setSingleProgress({});
    setProgress(0);
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        uploadImages(imageFiles[i], i);
      }
    } else {
      toast.error("Dosya seçiniz.");
    }
  };
  const uploadImages = (file, index) => {
    const fileName = getFileName(file);
    const location = docId
      ? `images/${collection}/${Array.isArray(docId) ? docId.join("/") : docId}/${fileName}`
      : `images/${collection}/${fileName}`;
      
    const imageRef = ref(storage, location);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // Create separate state. **************************
        let obj = singleProgress;
        obj[index] = Math.floor(prog);
        setSingleProgress(obj);
        setTrigger((p) => p + 1);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (!folder) setDocImages((prev) => [...prev, downloadURL]);
          else if (folder) setDocImages([downloadURL]);
          setCounter((c) => c + 1);
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={classNames(
            `relative flex flex-col w-full h-40 items-center justify-center border-2 border-gray-300 
          border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 
          hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`,
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-3">
            {!folder && (
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Yüklemek için tıkla </span>
              veya sürükle ve bırak
            </p>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
              {`"${imageFiles?.length}" dosya`}
            </p>
          </div>
          <input
            className="bg-red-500 absolute inset-0 bg-transparent file:hidden text-transparent"
            onChange={onChangeHandle}
            ref={inputRef}
            id="dropzone-file"
            type="file"
            multiple={folder ? false : true}
            accept="image/png, image/jpg, image/jpeg, image/webp, image/gif"
          />
        </label>
      </div>

      <div className="w-full h-3 border border-slate-500 rounded-full">
        <div
          style={{
            maxWidth: progress * 5 + "px",
          }}
          className={"bg-slate-500/80 h-full rounded-full transition-all"}
        />
      </div>

      <button
        className="bg-slate-400 px-4 py-2 rounded-md text-neutral-50 border border-slate-500 shadow-md
            hover:bg-slate-500/90 hover:text-white transition-colors"
        onClick={handleImageUploads}
      >
        {folder ? "Fotoğrafı" : "Fotoğrafları"} Yükle
      </button>
    </div>
  );
}
