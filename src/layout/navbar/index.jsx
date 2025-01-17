import { Link } from "react-router-dom";
import logo from "../../assets/images/Woodwork_250.png";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { navItems } from "../../utils/consts";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({ hidden, display, fixedNav = false, innerWidth }) {
  const [openNavbar, setOpenNavbar] = useState(false);
  const outsiteRef = useRef();

  useEffect(() => {
    if (innerWidth > 948 && openNavbar) {
      setOpenNavbar(false);
    }
  }, [innerWidth]);

  // bg-[color:var(--theme-tertiary)]

  return (
    <header
      className={
        fixedNav
          ? classNames(
              "fixed shadow-md top-0 left-0 right-0 z-20 max-h-0 p-0 transition-all overflow-hidden bg-black/50 backdrop-blur-md",
              {
                "!max-h-[105px]": !hidden,
                "!max-h-0 !shadow-none": !display,
              }
            )
          : undefined
      }
    >
      <div className="w-[92%] max-w-[1500px] mx-auto flex items-center justify-between">
        <div
          className={classNames(
            "flex items-center justify-center gap-7 h-[105px] shrink-0 p-[4px] text-2xl text-center content-center",
            {
              "text-[color:var(--color-secondary)]": fixedNav,
              "text-[color:var(--color-primary)]": !fixedNav,
            }
          )}
        >
          <Link to={"/"}>
            <img src={logo} className="object-cover object-center h-[90px] lg" />
          </Link>
          <Link to={"/"}>
            {/* <img src={logo} className="object-cover object-center" /> */}
            Özgür Ahşap
          </Link>
        </div>

        {innerWidth <= 948 ? (
          <div>
            <button
              onClick={() => setOpenNavbar((p) => !p)}
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <HiOutlineMenuAlt3 className="w-7 h-7" />
            </button>

            <AnimatePresence>
              {openNavbar && (
                <div
                  className="fixed inset-0 z-40"
                  aria-label="outside"
                  ref={outsiteRef}
                  onClick={(e) => {
                    if (e.target.ariaLabel == "outside") {
                      setOpenNavbar(false);
                    }
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, translateX: 20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: 20 }}
                    className="fixed top-0 right-0 max-w-[370px] pr-5 -mr-5 w-full h-full flex flex-col bg-black/30 backdrop-blur-lg"
                  >
                    <div className="mr-[10%]">
                      <div className="h-24 flex items-center justify-end">
                        <button
                          onClick={() => setOpenNavbar((p) => !p)}
                          className="p-2 rounded-full hover:bg-black/20 transition-colors"
                        >
                          <CgClose className="w-7 h-7 text-white" />
                        </button>
                      </div>
                      <div className="flex flex-col font-medium text-white items-end">
                        {navItems.map((item, index) => (
                          <Link
                            onClick={() => setOpenNavbar(false)}
                            key={index}
                            to={item.link}
                            className="hover:bg-black/20 px-4 py-2 rounded-xl transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex gap-2 mr-2 font-medium shrink">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={classNames("px-4 py-2 rounded-xl transition-colors", {
                  "text-[color:var(--color-secondary)]": fixedNav,
                  "text-[color:var(--color-primary)]": !fixedNav,
                })}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
