import { Link } from "react-router-dom";
import logo from "../../assets/images/vector-logo.webp";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { navItems } from "../../utils/consts";
import { motion } from "framer-motion";

export default function Navbar({ hidden, display, fixedNav = false, innerWidth }) {
  const [openNavbar, setOpenNavbar] = useState(false);

  useEffect(() => {
    if (innerWidth > 768 && openNavbar) {
      setOpenNavbar(false);
    }
  }, [innerWidth]);

  return (
    <header
      className={
        fixedNav
          ? classNames(
              "fixed bg-white shadow-md top-0 left-0 right-0 z-20 max-h-0 p-0 transition-all overflow-hidden",
              {
                "!max-h-[96px]": !hidden,
                "!max-h-0 !shadow-none": !display,
              }
            )
          : undefined
      }>
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="h-24 w-24 shrink-0">
          <Link to={"/"}>
            <img src={logo} className="w-24 h-24 object-cover object-center" />
          </Link>
        </div>

        {innerWidth <= 768 ? (
          <div>
            <button
              onClick={() => setOpenNavbar((p) => !p)}
              className="p-2 rounded-full hover:bg-black/10 transition-colors">
              <HiOutlineMenuAlt3 className="w-7 h-7" />
            </button>

            {openNavbar && (
              <motion.div
                initial={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0 }}
                className="fixed top-0 right-0 max-w-[370px] pr-5 -mr-5 w-full h-full flex flex-col bg-black/30 backdrop-blur-lg z-40">
                <div className="mr-[10%]">
                  <header className="h-24 flex items-center justify-end">
                    <button
                      onClick={() => setOpenNavbar((p) => !p)}
                      className="p-2 rounded-full hover:bg-black/20 transition-colors">
                      <CgClose className="w-7 h-7 text-white" />
                    </button>
                  </header>
                  <div className="flex flex-col font-medium text-white items-end">
                    {navItems.map((item, index) => (
                      <Link
                        onClick={() => setOpenNavbar(false)}
                        key={index}
                        to={item.link}
                        className="hover:bg-black/20 px-4 py-2 rounded-xl transition-colors">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex gap-2 mr-2 font-medium shrink">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="hover:bg-slate-400/20 px-4 py-2 rounded-xl transition-colors">
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
