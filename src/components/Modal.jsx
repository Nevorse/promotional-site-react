import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import store from "../store";
import { destroyModal } from "../store/modal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { CgClose } from "react-icons/cg";
import classNames from "classnames";
import { motion } from "framer-motion";

export default function Modal({ img, index = 0 }) {
  const { modal } = useSelector((state) => state.modal);
  const [currentImg, setCurrentImg] = useState(img);
  const [currentIndex, setCurrentIndex] = useState(index);
  const outsideRef = useRef();

  const handleOutsideClick = (e) => {
    if (e.target === outsideRef.current) {
      store.dispatch(destroyModal());
    }
  };
  const handleChangeImageToIndex = (index) => {
    setCurrentImg(modal?.data[index]);
    setCurrentIndex(index);
  };
  const handleChangeImage = (i) => {
    let index = currentIndex + i;
    if (index < 0) index = modal?.data.length - 1;
    else if (index == modal?.data.length) index = 0;
    setCurrentImg(modal?.data[index]);
    setCurrentIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOutsideClick}
      ref={outsideRef}
      className="flex fixed inset-0 items-center justify-center z-30 bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col gap-5 mx-10 items-center transition-all">
        <IoIosArrowBack
          onClick={() => {
            handleChangeImage(-1);
          }}
          className="absolute w-10 h-10 top-[48%] left-0 ml-[5%] text-white/85 z-10 cursor-pointer transition-all hover:scale-110"
        />
        <IoIosArrowForward
          onClick={() => {
            handleChangeImage(1);
          }}
          className="absolute w-10 h-10 top-[48%] right-0 mr-[5%] text-white/85 z-10 cursor-pointer transition-all hover:scale-110"
        />
        <CgClose
          onClick={() => {
            store.dispatch(destroyModal());
          }}
          className="absolute w-10 h-10 top-0 right-0 mr-[3%] mt-[3%] text-white/85 z-10 cursor-pointer transition-all hover:scale-110"
        />

        <div
          style={{ backgroundImage: `url(${currentImg})` }}
          className="bg-no-repeat bg-cover bg-center transition-all duration-300">
          <img
            src={currentImg}
            className="max-h-[80vh] min-h-[200px] object-cover object-center transition-all opacity-0"
          />
        </div>

        <div className="flex text-white gap-x-3 h-5 xl:h-6">
          {modal?.data?.map((e, i) => (
            <button
              key={i}
              onClick={() => handleChangeImageToIndex(i)}
              className={classNames(
                "hover:scale-125 transition-all relative before:rounded-full before:absolute before:inset-0 before:-z-10 before:hover:blur-sm before:hover:bg-white",
                {
                  "scale-110 before:blur-sm before:bg-white/75": i == currentIndex,
                }
              )}>
              <GoDotFill className="rounded-full w-5 h-5 xl:w-6 xl:h-6 shadow-2xl shadow-black" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
