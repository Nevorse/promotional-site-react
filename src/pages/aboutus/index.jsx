import { useEffect } from "react";
import { _aboutUs } from "../../utils/consts";
import { motion } from "framer-motion";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[85%] min-h-[90vh] mx-auto flex justify-center mt-6 mb-14 md:mt-0">
      <div className="flex flex-col max-w-[800px] gap-8 justify-center">
        {_aboutUs?.map((data, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <div>
              <h1 className="text-[40px] font-semibold font-sans text-[color:var(--color-primary)] text-center">
                {data.title}
              </h1>
            </div>
            <div>
              <p className="text-[18px] font-semibold font-sans text-[color:var(--color-primary)] text-center">
                {data.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
