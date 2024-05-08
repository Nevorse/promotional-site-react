import { useState } from "react";
import bgImage_1 from "../../../assets/images/background-image-1.jpg";
import bgImage_2 from "../../../assets/images/background-image-2.jpg";
import { useEffect } from "react";

export default function HomeSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const sliders = [bgImage_1, bgImage_2];
  const sliderText = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet consectetur adipisicing.",
  ];

  const goToNext = () => {
    const isLastSlide = slideIndex === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => goToNext(), 10000);
    return () => clearTimeout(timer);
    // const timer = setInterval(() => goToNext(), 5000);
    // return () => clearInterval(timer);
  }, [slideIndex]);

  return (
    <div className="h-[82.5vh] w-full relative flex rounded-t-md overflow-hidden">
      <div
        style={{ backgroundImage: `url(${sliders[slideIndex]})` }}
        className="w-full h-full duration-500 bg-center bg-cover relative overflow-hidden">
        <div className="bg-black/35 absolute w-full h-full" />
      </div>
      <div className="absolute inset-0 top-[40%] w-11/12 mx-auto text-white text-4xl font-semibold">
        {sliderText[slideIndex]}
        </div>
    </div>
  );
}
