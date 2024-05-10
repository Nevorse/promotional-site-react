import { useRef, useState } from "react";
import { getFileName } from "../../../utils/helpers";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import toast from "react-hot-toast";

export default function _FileInput({ setUploadedImages }) {
  const [imageFiles, setImageFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();

  const onChangeHandle = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      setImageFiles((prev) => [...prev, files[i]]);
    }
  };
  const handleImageUploads = () => {
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        uploadImage(file);
      });
    } else {
      toast.error("Dosya seçiniz.");
    }
  };
  const uploadImage = (file) => {
    const fileName = getFileName(file);
    const imageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let obj = {};
          obj[`${downloadURL}`] = uploadTask.snapshot.ref;
          setUploadedImages((prev) => [...prev, obj]);
          toast.success("Yükleme Tamamlandı.");
          setImageFiles([]);
          inputRef.current.value = null;
          setProgress(0);
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 
          border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 
          hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
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
            multiple={true}
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
        onClick={handleImageUploads}>
        Fotoğrafları Yükle
      </button>
    </div>
  );
}
