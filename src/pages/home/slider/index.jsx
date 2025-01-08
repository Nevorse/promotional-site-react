import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAllData } from "../../../setFuncs";
import { motion } from "framer-motion";
import SlideComp from "./SlideComp";

export default function HomeSlider() {
  const { coverImages } = useSelector((state) => state.collections);
  const [slideImages, setSlideImages] = useState(coverImages[0]?.data);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderTexts, setSliderTexts] = useState(coverImages[0]?.cover_texts || []);
  const [slideCount, setSlideCount] = useState(coverImages[0]?.cover_count || 2);

  useEffect(() => {
    if (coverImages.length < 1) {
      setAllData("cover_images").then((allData) => {
        setSlideImages(allData[0]?.data);
        setSliderTexts(allData[0]?.cover_texts || []);
        setSlideCount(allData[0]?.cover_count || 2);
      });
    }
  }, [coverImages]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [slideIndex]);

  const goToNext = () => {
    const isLastSlide = slideIndex >= slideCount - 1;
    const newIndex = isLastSlide ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="2xl:h-[81vh] xl:h-[70vh] lg:h-[60vh] md:h-[55vh] sm:h-[50vh] h-[45vh] w-full relative flex"
    >
      {slideImages?.map((imgUrl, index) => (
        <SlideComp
          key={index}
          index={index}
          imgUrl={imgUrl}
          slideIndex={slideIndex}
        />
      ))}
      <div className="absolute inset-0 top-[40%] w-[90%] text-center mx-auto text-[color:var(--color-secondary)] xl:text-5xl md:text-4xl text-2xl font-semibold transition-all">
        {sliderTexts[slideIndex]}
      </div>

      {/* <div>
        <div
          style={{
            backgroundImage: `url(${""})`,
          }}
          className="w-full h-full bg-center bg-cover transition-all duration-500">
          <div className="bg-black/30 absolute w-full h-full" />
        </div>
        <div className="absolute inset-0 top-[40%] w-11/12 mx-auto text-[color:var(--color-secondary)] text-4xl font-semibold transition-all">
          {sliderTexts[slideIndex]}
        </div>
      </div> */}
    </motion.div>
  );
}
