import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { setAllData } from "../../setFuncs";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../components/Modal";
import { setModal } from "../../store/modal";
import store from "../../store";

export default function SingleAlbum() {
  const [document, setDocument] = useState();
  const [allDocuments, setAllDocuments] = useState([]);
  const [coll, setColl] = useState("");
  const location = useLocation();
  const { projects, services } = useSelector((state) => state.collections);
  const { modal } = useSelector((state) => state.modal);
  const [modalImage, setModalImage] = useState();
  const [modalImageIndex, setModalImageIndex] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const paths = checkCollandAlbum();
    if (paths[0] == "service_albums") {
      setColl("services");
    } else if (paths[0] == "project_albums") {
      setColl("projects");
    }

    if (paths[0] == "service_albums" && services.length == 0) {
      setAllData(paths[0]).then((allData) => {
        setAllDocuments(allData);
        setDataHandler(allData);
      });
    } else if (paths[0] == "project_albums" && projects.length == 0) {
      setAllData(paths[0]).then((allData) => {
        setAllDocuments(allData);
        setDataHandler(allData);
      });
    } else {
      if (paths[0] == "service_albums") {
        setAllDocuments(services);
        setDataHandler(services);
      } else if (paths[0] == "project_albums") {
        setAllDocuments(projects);
        setDataHandler(projects);
      }
    }
  }, [location]);

  const checkCollandAlbum = () => {
    const coll = location.pathname.split("/")[1];
    const alb = location.pathname.split("/")[2].split("_")[0];
    if (coll == "services") {
      return ["service_albums", alb];
    }
    if (coll == "projects") {
      return ["project_albums", alb];
    }
  };
  const setDataHandler = (allData) => {
    const paths = checkCollandAlbum();
    const doc = allData.filter((e) => e.album == paths[1]);
    setDocument(doc[0]);
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
        className="max-w-[85%] min-h-[90vh] mx-auto my-12">
        <div className="flex flex-col xl:flex-row gap-y-8 gap-x-6">
          <div className="flex flex-col gap-4 w-full xl:w-[80%]">
            <div className="text-[28px] font-semibold tracking-wider">
              <h1>{document?.title}</h1>
            </div>
            <div className="mb-8 transition-all">
              <motion.div
                onClick={() => openModalHandler(document?.data[0])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ backgroundImage: `url(${document?.data[0]})` }}
                className="w-full max-h-[750px] min-h-[500px] bg-no-repeat bg-cover bg-center rounded-2xl transition-all shadow-md cursor-pointer">
                <img
                  src={document?.data[0]}
                  className="w-full object-cover invisible"
                />
              </motion.div>
            </div>
            {coll == "services" && (
              <div className="text-lg">
                <p>{document?.content}</p>
              </div>
            )}
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
                <Link key={doc?.id} to={`/${coll}/${doc?.album + "_" + doc?.title}`}>
                  <div
                    className={classNames(
                      "px-4 py-3 transition-all bg-neutral-100 text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200",
                      {
                        "bg-neutral-800/90 !text-neutral-200":
                          document?.id == doc?.id,
                      }
                    )}>
                    {doc?.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {coll == "projects" && (
          <div className="flex flex-wrap justify-center mt-10 gap-6">
            {document?.data?.map((e, index) => {
              if (index == 0) return;
              return (
                <div
                  key={index}
                  onClick={() => openModalHandler(e, index)}
                  className="cursor-pointer max-w-[500px] max-h-[350px] hover:scale-105 transition-transform">
                  <img src={e} className="w-full h-full object-cover object-center rounded-md shadow-lg hover:shadow-2xl transition-shadow" />
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}
