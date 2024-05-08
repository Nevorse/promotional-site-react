import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./footer";
import { Toaster } from "react-hot-toast";
import useWindowSize from "../hooks/useWindowSize";

function App() {
  const [hidden, setHidden] = useState(true);
  const [display, setDisplay] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 96) {
        setHidden(false);
      }
      if (window.scrollY === 0) {
        setHidden(true);
        setDisplay(false);
      } else setDisplay(true);
    });
  }, []);

  return (
    <>
      <Navbar innerWidth={windowSize[0]}/>
      {windowSize[0] > 768 && (
        <Navbar hidden={hidden} display={display} fixedNav={true}/>
      )}
      <Toaster position="top-right" />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
