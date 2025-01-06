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
  const [allDocuments, setAllDocuments] = useState([]);
  const [document, setDocument] = useState();
  const [content, setContent] = useState("");
  const [modalImage, setModalImage] = useState();
  const [modalImageIndex, setModalImageIndex] = useState();
  const textBoxRef = useRef();
  const sliderRef = useRef();

  // const { scrollYProgress } = useScroll({
  //   target: sliderRef,
  // });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setColl(location.pathname.split("/")[1]);
    getData();
  }, [location]);
  useEffect(() => {
    let newContent = "";
    if (content) newContent = content?.replace(/##(.*?)##/g, "<b>$1</b>");
    textBoxRef.current.innerHTML = newContent;
  }, [content]);

  // console.log(serviceFolders.find((o) => o.id == folderId)?.data);

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
    const docIndex = folderId
      ? location.pathname.split("/")[3].split("_")[0]
      : location.pathname.split("/")[2].split("_")[0];
    let documentId = false;
    // let revArr = [...allData];
    // revArr = revArr.reverse();
    setAllDocuments(allData);
    for (let i = 0; i < allData?.length; i++) {
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
        className="max-w-[92%] min-h-[90vh] mx-auto lg:mb-8 lg:mt-10 my-6"
      >
        {/* Yeni Sayfa */}
        <section
          ref={sliderRef}
          className="overscroll-contain mb-6 rounded-sm overflow-hidden"
        >
          <div className="flex items-center overflow-hidden">
            <motion.div className="flex gap-x-0.5">
              {allDocuments?.map((doc) => (
                <Link
                  className="w-48"
                  key={doc?.id}
                  to={
                    folderId
                      ? `/${coll}/${folderId}/${doc?.index + "_" + doc?.title}`
                      : `/${coll}/${doc?.index + "_" + doc?.title}`
                  }
                >
                  <div
                    className={classNames(
                      "px-3 py-3 transition-all bg-neutral-100 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200",
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
            </motion.div>
          </div>
        </section>

        <div className="flex flex-col 2xl:flex-row gap-y-8 gap-x-6"
        >
          <div className="flex flex-col gap-4 2xl:w-[80%]
          2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh]">
            <div className="h-full mb-8 transition-all">
              <motion.div
                onClick={() => openModalHandler(document?.data && document?.data[0])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  backgroundImage: `url(${document?.data && document.data[0]})`,
                }}
                className="h-full w-full 
                bg-no-repeat bg-cover bg-center rounded-lg transition-all shadow-md cursor-pointer"
              >
                <img
                  src={document?.data && document?.data[0]}
                  className="w-full object-cover invisible"
                />
              </motion.div>
            </div>
          </div>

          {/* Yeni Sayfa */}
          <div className="2xl:max-w-[350px] px-4 py-2 rounded-md">
            <div className="text-[18px]">
              <p ref={textBoxRef} className="whitespace-pre-wrap text">
                {document?.content}
              </p>
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
                    className="cursor-pointer max-w-[500px] max-h-[350px] hover:scale-[1.03] transition-transform"
                  >
                    <img
                      src={e}
                      className="w-full h-full object-cover object-center rounded-sm shadow-lg hover:shadow-xl transition-shadow"
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

{
  /* <div className="text-[28px] font-semibold tracking-wider">
              <h1>{document?.title}</h1>
            </div> */
}

{
  /* <div className="w-full flex flex-col gap-y-1">
              {allDocuments?.map((doc) => (
                <Link key={doc?.id} to={ folderId
                  ? `/${coll}/${folderId}/${doc?.index + "_" + doc?.title}`
                  : `/${coll}/${doc?.index + "_" + doc?.title}`
                  }>
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
            </div> */
}
