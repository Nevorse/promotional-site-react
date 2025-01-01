import { useSelector } from "react-redux";
import CardComp from "../../components/CardComp";
import { useEffect } from "react";
import { setAllData } from "../../setFuncs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services() {
  const { services } = useSelector((state) => state.collections);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (services.length == 0) {
      setAllData("service_albums");
    }
  }, []);

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
            Tasarımlarımız
          </h1>
          <h5 className="text-center font-medium tracking-wide text-[color:var(--color-primary)]">
            Tasarımlarımıza buradan ulaşabilirsiniz
          </h5>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerAnimation}
          className="flex flex-wrap justify-center gap-8 my-12"
        >
          {services?.map((doc) => (
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
