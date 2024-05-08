import { useState } from "react";
import _ImageComp from "../components/_ImageComp";
import _FileInput from "../components/_FileInput";
import { deleteObject } from "firebase/storage";
import toast from "react-hot-toast";
import { addData } from "../../../firebase";
import { ConfigProvider, Switch } from "antd";
import classNames from "classnames";
import { setAllData } from "../../../setFuncs";

export default function Upload_() {
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumContent, setAlbumContent] = useState("");
  const [serviceType, setServiceType] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const coverHandler = (item) => {
    const index = uploadedImages.indexOf(item);
    const arr = [...uploadedImages];
    arr.splice(index, 1);
    arr.unshift(item);
    setUploadedImages(arr);
  };
  const deleteHandle = (obj) => {
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
  const handleAlbumUpload = async () => {
    const collection = serviceType ? "service_albums" : "project_albums";
    let data = [];
    uploadedImages.forEach((element) => {
      const img = Object.keys(element)[0];
      data.push(img);
    });
    const response = await addData(collection, data, albumTitle, albumContent);
    const id = response.id;
    if (id) {
      toast.success("Albüm Kaydedildi");
      setAllData(collection);
      /*---Clear all---*/
      setUploadedImages([]);
      setAlbumTitle("");
      setAlbumContent("");
    } else toast.error("Hata");
  };

  return (
    <div className="flex flex-col items-center gap-16 w-[100vw]">
      <ConfigProvider
        theme={{
          components: {
            Switch: { handleSize: 26, trackHeight: 30 },
          },
        }}>
        <div className="mt-10 flex flex-col items-center gap-10 w-[90%] max-w-[500px]">
          <_FileInput setUploadedImages={setUploadedImages} />

          <div className="flex flex-col items-center gap-7 w-full">
            <input
              type="text"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              placeholder="Albüm Başlığı"
              className="border border-slate-400 bg-slate-50 p-2 w-full rounded-lg shadow-md focus:outline-slate-500 text-neutral-800"
            />
            <Switch
              className="w-28 !bg-blue-400"
              checkedChildren="Servisler"
              unCheckedChildren="Projeler"
              onChange={(value) => setServiceType(value)}
            />

            <textarea
              value={albumContent}
              onChange={(e) => setAlbumContent(e.target.value)}
              rows={"6"}
              placeholder="Albüm İçeriği"
              className={classNames(
                "border border-slate-400 max-h-[250px] transition-all duration-300 bg-slate-50 p-2 w-full rounded-lg shadow-md focus:outline-slate-500 text-neutral-800",
                {
                  "!max-h-0 !py-0 !border-0": !serviceType,
                }
              )}
            />
            <button
              className=" bg-lime-600 px-4 py-2 rounded-md text-neutral-50 border border-lime-600 shadow-md
              hover:bg-lime-500/90 hover:text-white transition-colors"
              onClick={handleAlbumUpload}>
              Albümü Kaydet
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          {uploadedImages.map((item) => (
            <div key={Object.keys(item)[0]} className="text-center">
              <_ImageComp
                url={Object.keys(item)[0]}
                deleteHandle={() => deleteHandle(item)}
                coverHandle={() => coverHandler(item)}
                coverImage={uploadedImages[0]}
              />
            </div>
          ))}
        </div>
      </ConfigProvider>
    </div>
  );
}
