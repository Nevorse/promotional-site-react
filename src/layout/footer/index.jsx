import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

export default function Footer() {
  const windowSize = useWindowSize();
  return (
    <div className="bg-[color:var(--theme-quaternary)] w-full text-[color:var(--color-secondary)] flex flex-wrap justify-center gap-x-40 gap-y-20 py-20">
      <div className="flex flex-col gap-3 mx-5">
        <h2 className="text-2xl tracking-wide font-sans">İletişim Adreslerimiz</h2>
        <div className="flex flex-col gap-5">

          {windowSize[0] > 768 ? (
            <div className="flex gap-3 items-center">
              <FaPhoneAlt className="w-5 h-5" />
              <p className="text-lg font-medium font-sans">+90 542 134 5623</p>
            </div>
          ) : (
            <a target="_blank" href="tel:+905421345623">
              <div className="flex gap-3 items-center text-[color:var(--color-tertiary)] md:text-[color:var(--color-secondary)]">
                <FaPhoneAlt className="w-5 h-5" />
                <p className="text-lg font-medium font-sans">+90 542 134 5623</p>
              </div>
            </a>
          )}

          <a
            target="_blank"
            href="https://wa.me/905421345623"
            className="hover:text-[color:var(--color-tertiary)] text-[color:var(--color-tertiary)] md:text-[color:var(--color-secondary)] "
          >
            <div className="flex gap-3 items-center">
              <FaWhatsapp className="w-5 h-5" />
              <p className="text-lg font-medium font-sans">+90 542 134 5623</p>
            </div>
          </a>

          <div className="flex gap-3 items-center">
            <IoIosMail className="w-5 h-5" />
            <p className="text-lg font-medium font-sans">info@ozgurahsap.com</p>
          </div>

          <a
            target="_blank"
            href="https://instagram.com/ozgurahsapdekorasyon"
            className="hover:text-[color:var(--color-tertiary)] text-[color:var(--color-tertiary)] md:text-[color:var(--color-secondary)]"
          >
            <div className="flex gap-3 items-center">
              <IoLogoInstagram className="w-5 h-5" />
              <p className="text-lg font-medium font-sans">
                /ozgurahsapdekorasyon
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-5 mx-5">
        <h2 className="text-2xl tracking-wide">Bağlantılar</h2>
        <div className="flex flex-col gap-3">
          <div className="flex hover:text-[color:var(--color-tertiary)] gap-3 items-center">
            <Link to={"/projects"}>Projelerimiz</Link>
          </div>
          <div className="flex hover:text-[color:var(--color-tertiary)] gap-3 items-center">
            <Link to={"/services"}>Hizmetlerimiz</Link>
          </div>
          <div className="flex hover:text-[color:var(--color-tertiary)] gap-3 items-center">
            <Link to={"/aboutus"}>Hakkımızda</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
