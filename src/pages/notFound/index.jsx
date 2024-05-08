import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className=" text-4xl">Not Found</div>
        <button
        className="px-6 py-2 text-lg bg-transparent rounded-xl"
         onClick={() => navigate(-1)}>Geri git</button>
      </div>
    </motion.div>
  );
}
