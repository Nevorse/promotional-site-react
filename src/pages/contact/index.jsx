import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerAnimation = {
    visible: {
      transition: {
        delayChildren: 0.2,
      },
    },
  };
  const itemAnimation = {
    hidden: {
      opacity: 0,
      translateY: 20,
    },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[85%] min-h-[90vh] mx-auto my-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
        className="mb-10">
        <motion.div
          variants={itemAnimation}
          className="max-w-[1300px] mx-auto shadow-lg">
          <iframe
            className="w-full h-[50vh]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.88850554352!2d28.847373148811315!3d41.00546324292603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1714985888415!5m2!1str!2str"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </motion.div>
      </motion.div>

      <div className="flex flex-col justify-center items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-[color:var(--color-primary)]">
            İletişim Adreslerimiz
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-16 my-12 text-[color:var(--color-primary)]">
          <div className="flex flex-col items-center gap-4">
            <FaPhoneAlt className="w-8 h-8" />
            <p className="text-2xl font-medium">0500 000 00 00</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <FaWhatsapp className="w-8 h-8" />
            <p className="text-2xl font-medium">0500 000 00 00</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <IoIosMail className="w-8 h-8" />
            <p className="text-2xl font-medium">mail@mail.com</p>
          </div>

          <a target="_blank" href="https://instagram.com/ozkartalmarangoz">
            <div className="flex flex-col items-center gap-4">
              <IoLogoInstagram className="w-8 h-8" />
              <p className="text-2xl font-medium">/ozkartalmarangoz</p>
            </div>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-wider mb-2.5 text-center text-[color:var(--color-primary)]">
            Bize Yazın
          </h1>
          <div className=" w-36 h-px bg-[color:var(--color-primary)] mb-8" />
        </div>

        <ContactForm />
      </div>
    </motion.div>
  );
}
