import HomeSlider from "./slider";
import HomeServices from "./homeServices";
import HomeProjects from "./homeProjects";
import FAQ from "./FAQ";
import { useEffect } from "react";
import { setAllData } from "../../setFuncs";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Home() {
  const { projects, services } = useSelector((state) => state.collections);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (projects.length == 0 || services.length == 0) {
      setAllData("service_albums");
      setAllData("project_albums");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[90%] min-h-[90vh] mx-auto mt-8">
      <HomeSlider />
      <HomeServices />
      <HomeProjects />
      <FAQ />
    </motion.div>
  );
}
