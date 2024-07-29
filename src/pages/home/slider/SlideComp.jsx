import classNames from "classnames";

export default function SlideComp({ index, imgUrl, slideIndex }) {
  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
      className={classNames(
        "w-full h-full bg-center bg-cover absolute opacity-0 transition-all duration-500",
        {
          "opacity-100": slideIndex === index,
        }
      )}>
      <div className="bg-black/20 w-full h-full absolute" />
    </div>
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   className="w-full h-full object-center object-cover absolute">
    //   <img
    //     src={doc?.data}
    //     className="w-full h-full object-cover object-center"
    //   />
    // </motion.div>
  );
}
