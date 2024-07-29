import { useEffect, useState } from "react";
import { ConfigProvider, Switch } from "antd";
import classNames from "classnames";
import { addData } from "../../../firebase";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { setAllData } from "../../../setFuncs";

export default function _Upload() {
  const location = useLocation();
  const navigate = useNavigate();
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumContent, setAlbumContent] = useState("");
  const [collection, setCollection] = useState("");
  const [typeCheck, setTypeCheck] = useState(false);

  useEffect(() => {
    const coll = typeCheck ? "service_albums" : "project_albums";
    setCollection(coll);
  }, [typeCheck]);

  const createAlbum = async () => {
    if (albumTitle.trim()) {
      const response = await addData(
        collection,
        undefined,
        albumTitle,
        albumContent
      );
      const id = response.id;
      if (id) {
        toast.success("Albüm Kaydedildi.");
        setAllData(collection);
        /*---Clear all---*/
        setAlbumTitle("");
        setAlbumContent("");
      } else toast.error("Hata");
    } else if (!albumTitle.trim()) {
      toast.error("Başlık Giriniz.");
    }
  };

  const prevPage = () => {
    const loc = location.pathname.split("/");
    loc.pop();
    const string = loc.toString().replace(/,/g, "/");
    navigate(string);
  };

  return (
    <div className="flex flex-col items-center gap-16 w-[100vw] relative">
      <ConfigProvider
        theme={{
          components: {
            Switch: { handleSize: 26, trackHeight: 30 },
          },
        }}>
        <div className="mt-10 flex flex-col items-center gap-10 w-[90%] max-w-[500px]">
          <button
            onClick={prevPage}
            className="absolute left-[5vw] top-[-34px] bg-indigo-500 text-white border border-indigo-500 rounded-lg px-4 py-1.5 text-[15px] leading-5">
            Geri git
          </button>
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
              onChange={(value) => setTypeCheck(value)}
            />

            <textarea
              value={albumContent}
              onChange={(e) => setAlbumContent(e.target.value)}
              rows={"6"}
              placeholder="Albüm İçeriği"
              className={classNames(
                "max-h-[250px] p-2 border border-slate-400 transition-all duration-300 bg-slate-50 w-full rounded-lg shadow-md focus:outline-slate-500 text-neutral-800",
                {
                  "!max-h-0 !py-0 !border-0": !typeCheck,
                }
              )}
            />
            <button
              className=" bg-lime-600 px-4 py-2 rounded-md text-neutral-50 border border-lime-600 shadow-md
              hover:bg-lime-500/90 hover:text-white transition-colors"
              onClick={createAlbum}>
              Albüm Oluştur
            </button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}
