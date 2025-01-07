import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { setAllData } from "../../setFuncs";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../components/Modal";
import { setModal } from "../../store/modal";
import store from "../../store";
import toast from "react-hot-toast";

export default function SingleAlbum() {
  const { services, projectFolders } = useSelector((state) => state.collections);
  const { modal } = useSelector((state) => state.modal);
  const location = useLocation();
  const [coll, setColl] = useState(location.pathname.split("/")[1]);
  const [collection, setCollection] = useState(() => {
    const path = location.pathname.split("/")[1];
    if (path == "projects") return "project_albums";
    if (path == "services") return "service_albums";
    else return "";
  });
  const [folderId, setFolderId] = useState(() => {
    const paths = location.pathname.split("/");
    if (paths[1] == "projects") return paths[2];
    else return undefined;
  });
  const [docIndex, setDocIndex] = useState(
    folderId
      ? Number(location.pathname.split("/")[3].split("_")[0])
      : Number(location.pathname.split("/")[2].split("_")[0])
  );
  const [allDocuments, setAllDocuments] = useState([]);
  const [document, setDocument] = useState();
  const [content, setContent] = useState("");
  const [modalImage, setModalImage] = useState();
  const [modalImageIndex, setModalImageIndex] = useState();
  const textBoxRef = useRef();
  const sliderRef = useRef();

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    if (allDocuments.length > 0) {
      scrollInto();
    }
  }, [allDocuments]);
  useEffect(() => {
    setColl(location.pathname.split("/")[1]);
    getData();
  }, [location]);
  useEffect(() => {
    let newContent = "";
    if (content) newContent = content?.replace(/##(.*?)##/g, "<b>$1</b>");
    textBoxRef.current.innerHTML = newContent;
  }, [content]);

  const getData = async () => {
    let documentId = false;
    if (collection == "service_albums") {
      documentId = findAndSetAlbum(services);
    } else if (collection == "project_albums") {
      documentId = findAndSetAlbum(
        projectFolders.find((o) => o.id == folderId)?.data
      );
    }
    if (!documentId) {
      const allData = await setAllData(collection, folderId);
      const docCheck = findAndSetAlbum(allData);
      if (!docCheck) toast.error("Doküman bulunamadı!");
    }
  };
  const findAndSetAlbum = (allData) => {
    const index = folderId
      ? location.pathname.split("/")[3].split("_")[0]
      : location.pathname.split("/")[2].split("_")[0];
    let documentId = false;
    // let revArr = [...allData];
    // revArr = revArr.reverse();
    setAllDocuments(allData);
    for (let i = 0; i < allData?.length; i++) {
      if (allData[i].index == index) {
        setDocument(allData[i]);
        setContent(allData[i]?.content);
        documentId = allData[i].id;
        break;
      }
    }
    return documentId;
  };
  const openModalHandler = (img, index) => {
    setModalImage(img);
    setModalImageIndex(index);
    store.dispatch(setModal({ coll: coll, data: document?.data }));
  };
  const scrollInto = (e) => {
    let index;
    let id = e?.target.parentElement.id || docIndex;
    allDocuments.find((o, i) => {
      if (o.index == id) {
        index = i;
        return o;
      }
    });
    if (sliderRef?.current?.children[index]) {
      sliderRef?.current?.children[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {modal?.coll && <Modal img={modalImage} index={modalImageIndex} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="max-w-[92%] min-h-[90vh] mx-auto lg:my-8 my-6"
      >
        <div className="flex flex-col xl:flex-row gap-y-8 gap-x-6">
          <div className="flex flex-1 flex-col gap-4 xl:w-[80%]">
            <div className="text-[28px] font-semibold tracking-wider">
              <h1>{document?.title}</h1>
            </div>
            <div className="mb-8 transition-all">
              <motion.div
                onClick={() => openModalHandler(document?.data && document?.data[0])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  backgroundImage: `url(${document?.data && document.data[0]})`,
                }}
                className="2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full bg-no-repeat bg-cover bg-center rounded-lg transition-all shadow-md cursor-pointer"
              >
                <img
                  src={document?.data && document?.data[0]}
                  className="w-full object-cover invisible"
                />
              </motion.div>
            </div>

            <div className="text-[18px]">
              <p ref={textBoxRef} className="whitespace-pre-wrap text">
                {/* {document?.content} */}
              </p>
            </div>
          </div>

          <div className="mb-6 flex-1 mt-[58px] max-w-[320px]">
            {/* <div className="w-full mb-5">
              <h1 className="text-xl tracking-wide mb-2">
                {coll == "services" ? "Hizmetlerimiz" : "Projelerimiz"}
              </h1>
              <span className="text-lg tracking-wide">
                {coll == "services"
                  ? "Verdiğimiz hizmetlere aşağıdan ulaşabilirsiniz"
                  : "Projelerimize aşağıdan ulaşabilirsiniz"}
              </span>
            </div> */}

            <div
              ref={sliderRef}
              // style={{ scrollbarWidth: "none" }}
              className="w-full flex flex-col gap-y-1 overflow-y-scroll rounded-md
              2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh]
              scrollbar scrollbar-thumb-[color:var(--theme-tertiary)]
              "
            >
              {allDocuments?.map((doc, index) => (
                <Link
                  onClick={scrollInto}
                  className={classNames({ selected: document?.id == doc?.id })}
                  id={doc?.index}
                  key={index + "-" + doc?.id}
                  to={
                    folderId
                      ? `/${coll}/${folderId}/${doc?.index + "_" + doc?.title}`
                      : `/${coll}/${doc?.index + "_" + doc?.title}`
                  }
                >
                  <div
                    className={classNames(
                      "px-4 py-3 max-h-12 truncate transition-all bg-neutral-100 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200",
                      {
                        "bg-neutral-800/90 !text-neutral-200":
                          document?.id == doc?.id,
                      }
                    )}
                  >
                    {doc?.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {document?.data?.length > 1 && (
          <div className="flex flex-wrap justify-center mt-10 gap-3">
            {document?.data?.map((e, index) => {
              if (index == 0) return;
              else
                return (
                  <div
                    key={index}
                    onClick={() => openModalHandler(e, index)}
                    className="cursor-pointer max-w-[500px] max-h-[350px] hover:scale-105 transition-transform"
                  >
                    <img
                      src={e}
                      className="w-full h-full object-cover object-center rounded-sm shadow-lg hover:shadow-2xl transition-shadow"
                    />
                  </div>
                );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}
