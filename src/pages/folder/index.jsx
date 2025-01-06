import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setAllData } from "../../setFuncs";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CardComp from "../../components/CardComp";

export default function Folder() {
  const location = useLocation();
  const { projectFolders, projects } = useSelector((state) => state.collections);
  const [collection, setCollection] = useState(() => {
    const coll = location.pathname.split("/")[1];
    if (coll == "projects") return "project_albums";
    else return "";
  });
  const [folderId, setFolderId] = useState(() => location.pathname.split("/")[2]);
  const [folderTitle, setFolderTitle] = useState(projects.find(o => o.id == folderId)?.title || "");
  const [folderImage, setFolderImage] = useState(projects.find((o) => o.id == folderId)?.data);
  const [collData, setCollData] = useState(projectFolders.find((o) => o.id == folderId)?.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!collData) setAllData(collection, folderId);
  }, [folderId]);

  useEffect(() => {
    if (collection == "project_albums")
      setCollData(projectFolders.find((o) => o.id == folderId)?.data);
  }, [projectFolders]);

  useEffect(() => {
    const obj = projects.find(o => o.id == folderId);
    if (obj?.title) setFolderTitle(obj?.title);
    if (obj?.data.length) setFolderImage(obj?.data);
  }, [projects]);

  const containerAnimation = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemAnimation = {
    hidden: {
      opacity: 0,
      translateY: 20,
    },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[85%] min-h-[90vh] mx-auto mt-12"
    >
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-[color:var(--color-primary)]">
            {folderTitle}
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          className="flex flex-wrap justify-center gap-8 my-12"
        >
          {collData?.map((doc) => (
            <motion.div variants={itemAnimation} key={doc?.id}>
              <Link to={`${doc?.index + "_" + doc?.title}`}>
                <CardComp key={doc?.id} doc={doc} type={2} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
