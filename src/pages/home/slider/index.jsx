import bgImage_1 from "../../../assets/images/background-image-1.webp";
import bgImage_2 from "../../../assets/images/background-image-2.webp";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAllData } from "../../../setFuncs";
import { AnimatePresence, motion } from "framer-motion";
import SlideComp from "./SlideComp";

export default function HomeSlider() {
  const { coverImages } = useSelector((state) => state.collections);

  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderTexts, setSliderTexts] = useState([
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet consectetur adipisicing.",
  ]);

  useEffect(() => {
    if (coverImages.length < 1) setAllData();
  }, []);

  const goToNext = () => {
    const isLastSlide = slideIndex >= 1;
    const newIndex = isLastSlide ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [slideIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="2xl:h-[80vh] xl:h-[70vh] lg:h-[60vh] md:h-[55vh] sm:h-[50vh] h-[45vh] w-full relative flex rounded-t-md overflow-hidden">
      {coverImages.map((doc, index) => (
        <SlideComp key={index} index={index} doc={doc} slideIndex={slideIndex} />
      ))}
      <div className="absolute inset-0 top-[40%] w-11/12 mx-auto text-white text-4xl font-semibold transition-all">
        {"sliderTexts"}
      </div>

      {/* <div>
        <div
          style={{
            backgroundImage: `url(${""})`,
          }}
          className="w-full h-full bg-center bg-cover transition-all duration-500">
          <div className="bg-black/30 absolute w-full h-full" />
        </div>
        <div className="absolute inset-0 top-[40%] w-11/12 mx-auto text-white text-4xl font-semibold transition-all">
          {sliderTexts[slideIndex]}
        </div>
      </div> */}
    </motion.div>
  );
}
