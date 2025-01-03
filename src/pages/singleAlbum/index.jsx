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
  const { projects, services } = useSelector((state) => state.collections);
  const { modal } = useSelector((state) => state.modal);
  const location = useLocation();
  const [coll, setColl] = useState(location.pathname.split("/")[1]);
  const [collection, setCollection] = useState(() => {
    const path = location.pathname.split("/")[1];
    if (path == "projects") return "project_albums";
    if (path == "services") return "service_albums";
    else return "";
  });
  const [allDocuments, setAllDocuments] = useState([]);
  const [document, setDocument] = useState();
  const [content, setContent] = useState("");
  const [modalImage, setModalImage] = useState();
  const [modalImageIndex, setModalImageIndex] = useState();
  const textBoxRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setColl(location.pathname.split("/")[1]);
    getData();
  }, [location]);

  useEffect(() => {
    let newContent = content.replace(/##(.*?)##/g, "<b>$1</b>");
    textBoxRef.current.innerHTML = newContent;
  }, [content]);

  const getData = async () => {
    let documentId = false;
    if (collection == "project_albums") {
      documentId = findAndSetAlbum(projects);
    } else if (collection == "service_albums") {
      documentId = findAndSetAlbum(services);
    }
    if (!documentId) {
      const allData = await setAllData(collection);
      const docCheck = findAndSetAlbum(allData);
      if (!docCheck) toast.error("Doküman bulunamadı!");
    }
  };
  const findAndSetAlbum = (allData) => {
    const docIndex = location.pathname.split("/")[2].split("_")[0];
    let documentId = false;
    setAllDocuments(allData);
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].index == docIndex) {
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

  return (
    <>
      <AnimatePresence>
        {modal?.coll && <Modal img={modalImage} index={modalImageIndex} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="max-w-[90%] min-h-[90vh] mx-auto lg:my-8 my-6"
      >
        <div className="flex flex-col xl:flex-row gap-y-8 gap-x-6">
          <div className="flex flex-col gap-4 xl:w-[80%]">
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
                className="2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full bg-no-repeat bg-cover bg-center rounded-2xl transition-all shadow-md cursor-pointer"
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

          <div className="grow my-6">
            <div className="w-full mb-5">
              <h1 className="text-xl tracking-wide mb-2">
                {coll == "services" ? "Hizmetlerimiz" : "Projelerimiz"}
              </h1>
              <span className="text-lg tracking-wide">
                {coll == "services"
                  ? "Verdiğimiz hizmetlere aşağıdan ulaşabilirsiniz"
                  : "Projelerimize aşağıdan ulaşabilirsiniz"}
              </span>
            </div>

            <div className="w-full flex flex-col gap-y-1">
              {allDocuments?.map((doc) => (
                <Link key={doc?.id} to={`/${coll}/${doc?.index + "_" + doc?.title}`}>
                  <div
                    className={classNames(
                      "px-4 py-3 transition-all bg-neutral-100 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200",
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
